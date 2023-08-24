<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class Access
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, ...$scopes): Response
    {
        $allowedScopes = $request->user()->token()->scopes;

        foreach($scopes as $scope)
        {
            if(!in_array($scope, $allowedScopes)) {
                return response(['message' => 'Unauthorized'], 401);
            }
        }

        return $next($request);
    }
}