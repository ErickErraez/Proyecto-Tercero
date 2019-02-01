<?php

namespace App\Http\Controllers;

use App\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    public function get(Request $data)
    {
        $id = $data['id'];
        $name = $data['name'];
        if ($id == null && $name == null) {
            return response()->json(User::get(), 200);
        } else if ($name !== null) {
            $users = DB::table('users')->Where('name', $name)->get();
            return response()->json($users, 200);
        } else {
            return response()->json(User::findOrFail($id), 200);
        }
    }

    public function paginate(Request $data)
    {
        $size = $data['size'];
        return response()->json(User::paginate($size), 200);
    }

    public function post(Request $data)
    {
        try {
            DB::beginTransaction();
            $result = $data->json()->all();
            $user = User::create([
                'name' => $result['name'],
                'lastName' => $result['lastName'],
                'birthday' => $result['birthday'],
                'gender' => $result['gender'],
                'email' => $result['email'],
                'password' => $result['password'],
                'api_token' => $result['api_token'],
            ]);
            DB::commit();
        } catch (Exception $e) {
            return response()->json($e, 400);
        }
        return response()->json($user, 200);
    }

    public function put(Request $data)
    {
        try {
            DB::beginTransaction();
            $result = $data->json()->all();
            $user = User::where('id', $result['id'])->update([
                'name' => $result['name'],
                'lastName' => $result['lastName'],
                'birthday' => $result['birthday'],
                'gender' => $result['gender'],
                'email' => $result['email'],
                'password' => $result['password'],
                'api_token' => $result['api_token'],
            ]);
            DB::commit();
        } catch (Exception $e) {
            return response()->json($e, 400);
        }
        return response()->json($user, 200);
    }

    public function delete(Request $data)
    {
        $result = $data->json()->all();
        $id = $result['id'];
        return User::destroy($id);
    }
}
