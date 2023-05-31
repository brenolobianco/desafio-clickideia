<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    /**
     * Login do usuário
     */
    public function login(Request $request)
    {
        $request->validate([
            'login' => 'required|string',
            'password' => 'required|string'
        ]);

        // Checa o login do usuário
        $user = User::where('login', $request->login)->first();

        // Valida o usuário e checa a senha
        if (!$user || $request->password !== $user->password) {
            return response([
                'message' => 'Senha inválida'
            ], 401);
        }

        $token = $user->createToken('primeirotoken')->plainTextToken;

        $response = [
            'user' => $user,
            'token' => $token
        ];

        return response($response, 201);
    }

 
}
