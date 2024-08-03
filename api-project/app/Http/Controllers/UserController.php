<?php

namespace App\Http\Controllers;

use App\Helpers\ResponseHelpers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api'); // Захист всіх методів контролера
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $user = auth('api')->user();
      
        
        $validatedData = $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|string|email|max:255|unique:users,email,' . $user->id,
            'password' => 'sometimes|string|min:6',
        ]);

        if (!empty($validatedData['password'])) {
            $validatedData['password'] = Hash::make($validatedData['password']);
        }

        $user->update($validatedData);

       return ResponseHelpers::success($user,'User updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy()
    {
        $user = auth('api')->user();
        $user->delete();
        return ResponseHelpers::success(null,'User deleted successfully');
    }
}
