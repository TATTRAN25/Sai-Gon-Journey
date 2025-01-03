<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request) {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|confirmed|min:6',
        ]);

        $credentials = request(['email', 'password']);

        if(!Auth::attempt($credentials)) {
            return response()->json([
                "message" => "Invalid email or password",
            ], 401);
        }
            
        $user = $request->user();

        $token = $user->createToken('Access Token');

        $user->access_token = $token->accessTokken;

        return response()->json([
            'user' => $user,
        ], 200);
    }

    public function register(Request $request) {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|string|unique=users',
            'password' => 'required|min:6',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $user->save();

        return response()->json([
            "message" => "new user has created",
        ], 201);
    }

    public function logout(Request $request) {
        $request->user()->token()->revoke();

        return response()->json([
            "message" => "User logged out successfully",
        ], 200);
    }
}
