<?php


namespace App\Com;


use App\Exception\BusinessException;


class Page
{
    /**
     * 根据数组参数处理分页（直接把前端传过来的数组扔进来）
     * @param $obj
     * @param array $params
     * @param array $map
     * @param array $columns
     * @param string $pageName
     * @return array
     */
    public static function pageByParams($obj, array $params, array $map = [], array $columns = ['*'], string $pageName = 'page')
    {
        return self::page($obj, $params['page'] ?? 1, $params['row'] ?? 10, $map, $columns, $pageName);
    }

    /**
     * 基本安全限制的分页
     * @param $obj
     * @param int $page
     * @param int $perPage
     * @param array $map
     * @param array $columns
     * @param string $pageName
     * @return array
     */
    public static function page($obj, int $page = 1, int $perPage = 10, array $map = [], array $columns = ['*'], string $pageName = 'page')
    {
        if ($page < 1) {
            $page = 1;
        }

        if ($perPage > 100) {
            $perPage = 100;
        }

        if ($perPage < 1) {
            $perPage = 10;
        }

        return self::pageUnlimited($obj, $page, $perPage, $map, $columns, $pageName);
    }

    /**
     * 无限制分页
     * @param $obj
     * @param int $page
     * @param int $perPage
     * @param array $map
     * @param array $columns
     * @param string $pageName
     * @return array|mixed
     */
    public static function pageUnlimited($obj, int $page = 1, int $perPage = 10, array $map = [], array $columns = ['*'], string $pageName = 'page')
    {
        if ($obj instanceof \Hyperf\Database\Model\Builder) {
            return self::modelPage($obj, $page, $perPage, $map, $columns, $pageName);
        } elseif ($obj instanceof \Hyperf\Database\Query\Builder) {
            return self::queryPage($obj, $page, $perPage, $map, $columns, $pageName);
        }

        throw new BusinessException(ResponseCode::PAGE_ERROR);
    }

    /**
     * 游标分页。数据量较大时，用 where id | 时间戳 等 过滤数据
     * @param $obj
     * @param array $cursor
     * @param int $perPage
     * @param array $columns
     * @return array
     */
    public static function pageCursor($obj, array $cursor = [], int $perPage = 10, array $columns = ["*"])
    {

        if (!$obj instanceof \Hyperf\Database\Model\Builder) {
            throw new BusinessException(ResponseCode::PAGE_ERROR);
        }

        if ($perPage > 100) {
            $perPage = 100;
        }

        if ($perPage < 1) {
            $perPage = 10;
        }


        if (!empty($cursor)) {
            foreach ($cursor as $k => $v) {
                if (!empty($v['order']) && strtolower($v['order']) == 'desc') {

                    if (isset($v['value'])) {
                        $obj->where($k, "<", $v['value']);
                    }

                    $obj->orderBy($k, "desc");
                } else {

                    if (isset($v['value'])) {
                        $obj->where($k, ">", $v['value']);
                    }

                    $obj->orderBy($k, "asc");
                }
            }
        }


        $data = $obj->limit($perPage)->get($columns)->toArray();

        if (!empty($data)) {
            $index = count($data) - 1;
            $lastData = $data[$index];

            foreach ($cursor as $k => $v) {
                $cursor[$k]["value"] = $lastData[$k];
            }
        } else {
            $cursor = [];
        }

        return [
            'cursor' => $cursor,
            'data' => $data
        ];


    }

    /**
     * 模型分页
     * @param \Hyperf\Database\Model\Builder $obj
     * @param int $page
     * @param int $perPage
     * @param array $map
     * @param array $columns
     * @param string $pageName
     * @return mixed
     */
    private static function modelPage(\Hyperf\Database\Model\Builder $obj, int $page, int $perPage, array $map = [], array $columns, string $pageName)
    {
        $res = $obj->paginate($perPage, $columns, $pageName, $page)->toArray();

        // 暂时用不掉的释放掉，需要的时候再放出来
        unset($res['first_page_url']);
        unset($res['from']);
        unset($res['last_page_url']);
        unset($res['next_page_url']);
        unset($res['path']);
        unset($res['prev_page_url']);
        unset($res['to']);

        if (!empty($map) && !empty($res['data'])) {
            $res['data'] = BusinessMap::processData($res['data'], $map);
        }

        return $res;
    }

    /**
     * query分页
     * @param \Hyperf\Database\Query\Builder $obj
     * @param int $page
     * @param int $perPage
     * @param array $map
     * @param array $columns
     * @param string $pageName
     * @return array
     */
    private static function queryPage(\Hyperf\Database\Query\Builder $obj, int $page, int $perPage, array $map = [], array $columns, string $pageName)
    {

        $total = $obj->getCountForPagination();

        $res = $obj->paginate($perPage, $columns, $pageName, $page)->toArray();

        $res['total'] = $total;
        $res['last_page'] = ceil($res['total'] / $res['per_page']);

        // 转成数组，跟 modelPage 返回数据格式保持一致
        foreach ($res['data'] as &$v) {
            $v = (array)$v;
        }

        // 暂时用不掉的释放掉，需要的时候再放出来
        unset($res['first_page_url']);
        unset($res['from']);
        unset($res['next_page_url']);
        unset($res['path']);
        unset($res['prev_page_url']);
        unset($res['to']);

        if (!empty($map) && !empty($res['data'])) {
            $res['data'] = BusinessMap::processData($res['data'], $map);
        }
        
        return $res;
    }
}
