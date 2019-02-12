<?php

namespace App\Http\Controllers;

use App\Friend;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FriendController extends Controller
{
    public function get(Request $data)
    {
        $id = $data['id'];
        if ($id == null) {
            return response()->json(Friend::get(), 200);
        } else {
            return response()->json(Friend::findOrFail($id), 200);
        }
    }

    public function paginate(Request $data)
    {
        $size = $data['size'];
        return response()->json(Friend::paginate($size), 200);
    }

    public function post(Request $data)
    {
        try {
            DB::beginTransaction();
            $result = $data->json()->all();
            $friend = new Friend();
            $friend->idUser = $result['idUser'];
            $friend->idFriend = $result['idFriend'];
            $friend->idState = $result['idState'];
            $friend->save();
            DB::commit();
        } catch (Exception $e) {
            return response()->json($e, 400);
        }
        return response()->json($friend, 200);
    }

    public function put(Request $data)
    {
        try {
            DB::beginTransaction();
            $result = $data->json()->all();
            $friend = Friend::where('id', $result['id'])->update([
                'idState' => $result['idState'],
            ]);
            DB::commit();
        } catch (Exception $e) {
            return response()->json($e, 400);
        }
        return response()->json($friend, 200);
    }

    public function delete(Request $data)
    {
        $result = $data->json()->all();
        $id = $result['id'];
        $friend = Friend::find($id);
        $friend->delete();
        return 'Registro Eliminado';
    }
}
