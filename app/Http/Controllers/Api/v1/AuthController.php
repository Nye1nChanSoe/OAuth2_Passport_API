<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Models\User;
use Illuminate\Support\Facades\Log;
use Laravel\Passport\Passport;
use App\Http\Resources\UserResource;

/**
 * Password Grant Client
 * This controller is used to authenticate users using their username and password directly
 * The client <front-end> sends the user's credentials to the OAuth2 server
 * The server will return Access Token in response if credentials are valid
 *
 * In a more complex scenario, I should use "Personal Access Client" to issue person access tokens
 * where individual users generate tokens to access their own data on this server
 *
 * Front end app will consume this generated token to make requests on behalf of the user
 */
class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();

        if(!Auth::once($credentials)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        /** @var User $user */
        $user = Auth::user();

        // issue an access token (depending on the user role)
        $token = $this->generateAccessToken($user);

        return response()->json(['data' => ['user' => new UserResource($user), 'access_token' => $token]]);
    }


    public function register(RegisterRequest $request)
    {
        $userData = $request->validated();
        $userData['role'] = 'user';
        Log::info($userData);

        /** @var User $user */
        $user = User::create($userData);

        // issue an access token (depending on the user role)
        $token = $this->generateAccessToken($user);

        return response()->json(['data' => ['user' => new UserResource($user), 'access_token' => $token]], 201);
    }


    public function logout(Request $request)
    {
        /** @var User $user */
        $user = $request->user();

        // simply revoke all tokens on logout
        $user->tokens->each(function ($token, $key) {
            $token->revoke();
        });

        return response('', 204);
    }


    /**
     * @var User $user the user you want to grant access token
     * @return string access_token
     */
    private function generateAccessToken(User $user): string
    {
        $token = '';

        if(!$user->isEmployee()) {
            $token = $user->createToken(
                str_replace(' ', '_', strtolower($user->name)).'_token',
                (Passport::scopes()->pluck('id'))->toArray())
                ->accessToken;
        } else {
            $token = $user->createToken(
                str_replace(' ', '_', strtolower($user->name)).'_token',
                ['view-employees'])
                ->accessToken;
        }

        return $token;
    }
}
