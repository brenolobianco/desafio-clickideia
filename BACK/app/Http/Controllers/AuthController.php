<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('login', 'senha');

        if ($credentials['login'] !== env('LOGIN') || $credentials['senha'] !== env('SENHA')) {
            return response()->json(['error' => 'Credenciais inválidas'], 401);
        }

        $user = User::where('email', $credentials['login'])->first();

        if (!$user) {
            return response()->json(['error' => 'Credenciais inválidas'], 401);
        }

        $token = JWTAuth::fromUser($user);

        return response()->json(['token' => $token]);
    }
}
