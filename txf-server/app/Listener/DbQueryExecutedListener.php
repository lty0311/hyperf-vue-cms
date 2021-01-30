<?php

declare(strict_types=1);
/**
 * This file is part of Hyperf.
 *
 * @link     https://www.hyperf.io
 * @document https://doc.hyperf.io
 * @contact  group@hyperf.io
 * @license  https://github.com/hyperf-cloud/hyperf/blob/master/LICENSE
 */

namespace App\Listener;

use App\Com\Log;
use Hyperf\Database\Events\QueryExecuted;
use Hyperf\Event\Annotation\Listener;
use Hyperf\Event\Contract\ListenerInterface;
use Hyperf\Utils\Arr;
use Hyperf\Utils\Str;

/**
 * @Listener
 */
class DbQueryExecutedListener implements ListenerInterface
{

    public function listen(): array
    {
        return [
            QueryExecuted::class,
        ];
    }

    /**
     * @param QueryExecuted $event
     */
    public function process($event)
    {
        if ($event instanceof QueryExecuted) {

            $sql = $event->sql;
            if (!Arr::isAssoc($event->bindings)) {
                foreach ($event->bindings as $key => $value) {
                    $sql = Str::replaceFirst('?', "'{$value}'", $sql);
                }
            }

            // 毫秒转秒
            $useTime = $event->time ?? 0;
            $useTime = bcdiv((string)$useTime, '1000', 4) . "s";

            $data = [
                'use_time' => $useTime,
                'sql' => $sql
            ];

            $isAppend = Log::append("sql", $data);

            // 没有追加成功，说明没有请求ID，大部分情况是命令行运行
            if ($isAppend === false) {
                Log::commandLog($data);
            }


//            l($sql);

        }
    }
}
