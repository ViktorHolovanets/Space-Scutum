<?php

namespace App\Helpers;

class ResponseHelpers
{
    /**
     * 200 - OK.
     *
     * @param mixed $data
     * @param string|null $message
     * @return \Illuminate\Http\JsonResponse
     */
    public static function success($data = null, $message = 'Success')
    {
        return response()->json([
            'status' => 'success',
            'message' => $message,
            'data' => $data,
        ], 200);
    }

    /**
     *  201 - Created.
     *
     * @param mixed $data
     * @param string|null $message
     * @return \Illuminate\Http\JsonResponse
     */
    public static function created($data = null, $message = 'Resource created successfully')
    {
        return response()->json([
            'status' => 'success',
            'message' => $message,
            'data' => $data,
        ], 201);
    }

    /**
     *  400 - Bad Request.
     *
     * @param string|null $message
     * @return \Illuminate\Http\JsonResponse
     */
    public static function badRequest($message = 'Bad request')
    {
        return response()->json([
            'status' => 'error',
            'message' => $message,
        ], 400);
    }

    /**
     *  401 - Unauthorized.
     *
     * @param string|null $message
     * @return \Illuminate\Http\JsonResponse
     */
    public static function unauthorized($message = 'Unauthorized')
    {
        return response()->json([
            'status' => 'error',
            'message' => $message,
        ], 401);
    }

    /**
     * 403 - Forbidden.
     *
     * @param string|null $message
     * @return \Illuminate\Http\JsonResponse
     */
    public static function forbidden($message = 'Forbidden')
    {
        return response()->json([
            'status' => 'error',
            'message' => $message,
        ], 403);
    }

    /**
     *  404 - Not Found.
     *
     * @param string|null $message
     * @return \Illuminate\Http\JsonResponse
     */
    public static function notFound($message = 'Not found')
    {
        return response()->json([
            'status' => 'error',
            'message' => $message,
        ], 404);
    }

    /**
     * 419 - Validation Error.
     *
     * @param string|null $message
     * @return \Illuminate\Http\JsonResponse
     */
    public static function validationError($message = 'Validation error')
    {
        return response()->json([
            'status' => 'error',
            'message' => $message,
        ], 419);
    }

    /**
     * 405 - Method Not Allowed.
     *
     * @param string|null $message
     * @return \Illuminate\Http\JsonResponse
     */
    public static function methodNotAllowed($message = 'Method not allowed')
    {
        return response()->json([
            'status' => 'error',
            'message' => $message,
        ], 405);
    }

    /**
     * 422 - Unprocessable Entity.
     *
     * @param string|null $message
     * @return \Illuminate\Http\JsonResponse
     */
    public static function unprocessableEntity($message = 'Unprocessable entity')
    {
        return response()->json([
            'status' => 'error',
            'message' => $message,
        ], 422);
    }

    /**
     * 429 - Too Many Requests.
     *
     * @param string|null $message
     * @return \Illuminate\Http\JsonResponse
     */
    public static function tooManyRequests($message = 'Too many requests')
    {
        return response()->json([
            'status' => 'error',
            'message' => $message,
        ], 429);
    }

    /**
     * 500 - Internal Server Error.
     *
     * @param string|null $message
     * @return \Illuminate\Http\JsonResponse
     */
    public static function internalServerError($message = 'Internal server error')
    {
        return response()->json([
            'status' => 'error',
            'message' => $message,
        ], 500);
    }

    /**
     * 503 - Service Unavailable.
     *
     * @param string|null $message
     * @return \Illuminate\Http\JsonResponse
     */
    public static function serviceUnavailable($message = 'Service unavailable')
    {
        return response()->json([
            'status' => 'error',
            'message' => $message,
        ], 503);
    }
}
