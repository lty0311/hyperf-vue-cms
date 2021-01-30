<?php

declare(strict_types=1);

namespace App\Middleware;

use App\Com\Json;
use App\Com\Log;
use App\Com\ResponseCode;
use App\Exception\BusinessException;
use phpDocumentor\Reflection\Types\True_;
use Psr\Container\ContainerInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Server\MiddlewareInterface;
use Hyperf\Utils\Context;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;

class InitMiddleware implements MiddlewareInterface
{
    /**
     * @var ContainerInterface
     */
    protected $container;

    public function __construct(ContainerInterface $container)
    {
        $this->container = $container;
    }

    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface
    {

        $request = $this->initRequest($request);

        $response = $handler->handle($request);

        if ($response->getStatusCode() != 200) {
            throw new BusinessException(ResponseCode::API_NOT_EXISTS);
        }

        // 记录请求日志
        $this->requestLog($request, $response);

        return $response;
    }

    protected function initRequest(ServerRequestInterface $request): ServerRequestInterface
    {

        $uri = $request->getUri()->getPath();

        if (in_array_UpLow($uri, config("upload.upload_uri")) || in_array_UpLow($uri, config("upload.import_uri"))) {
            $body = $request->getParsedBody() ?? [];
            $token = $body['token'] ?? '';
            unset($body['token']);
        } else {

            // 开放 GET 请求
            $get = $request->getQueryParams();

            $body = $request->getBody()->getContents();

            if (empty($body)) {
                $body = [];
            } else {
                $body = (array)Json::decode($body);
            }

            $body = array_merge($get, $body);

            $token = !empty($body['token']) ? (string)$body['token'] : '';

            unset($body['token']);
        }

        $beginTime = microtime(true);
        $requestId = md5(mt_rand(0, 9999) . $token . $uri . $beginTime . mt_rand(0, 9999));

        // 日志信息
        Context::set('request_uuid', $requestId);
        Context::set($requestId, [
            'token' => $token,
            'request_data' => $body,
            'begin_time' => $beginTime,
            'request_time' => date_time_now(),
            'uri' => $request->getUri()->getPath(),
        ]);

        return $request->withAttribute('body', $body)
            ->withAttribute('token', $token);
    }


    protected function requestLog(ServerRequestInterface $request, ResponseInterface $response)
    {
        $requestId = (string)Context::get('request_uuid');

        // 是否记录请求日志开关
        if (!config('request_log') || empty($requestId)) {
            return;
        }

        $requestData = Context::get($requestId);

        $beginTime = $requestData['begin_time'];
        $endTime = microtime(true);

        $logResponse = config("request_log_response");

        if ($logResponse) {
            $body = $response->getBody()->getContents() ?? "";
        } else {
            if (stripos($requestData['uri'], "lists") !== false) {
                $body = '';
            } else {
                $body = $response->getBody()->getContents() ?? "";
                if (strlen($body) >= 2000) {
                    $body = '';
                }
            }
        }

        Log::info([
            'request_uuid' => $requestId,
            'request_uri' => $requestData['uri'],
            'token' => $requestData['token'],
            'request_time' => $requestData['request_time'],
            'request_data' => $requestData['request_data'],
            'response_data' => $body,
            'use_time' => number_format(($endTime - $beginTime), 5),
            'append_data' => Log::destroyAppend(),
        ], 'request_log');
    }
}