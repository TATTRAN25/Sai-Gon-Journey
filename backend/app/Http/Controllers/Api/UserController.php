<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function list_user(Request $request) {
        // Get all users
        $user_list = User::all();

        // Return list of users
        return response()->json([
            "user_list" => $user_list,
        ], 200);
    }

    public function delete_user(Request $request) {
        // Get user id to delete
        $delete_id = $request->get('id');

        // Delete user
        User::destroy($delete_id);

        // Return delete success message
        return response()->json([
            "message" => "delete user successfully",
        ], 200);
    }

    public function update_user(Request $request) {
        // Validate update user info
        $request->validate([
            'name' => 'string',
            'email' => 'string|email',
        ]);

        // Get user to update
        $user = User::find($request->get('id'));

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
        ]);

        $user->save();

        // Return update success message
        return response()->json([
            "message" => "update user successfully",
        ], 200);
    }
}
