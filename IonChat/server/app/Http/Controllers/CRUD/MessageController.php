<?php

namespace App\Http\Controllers;

use App\Message;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MessageController extends Controller
{
    public function get(Request $data)
    {
        $id = $data['id'];
        if ($id == null) {
            return response()->json(Message::get(), 200);
        } else {
            return response()->json(Message::findOrFail($id), 200);
        }
    }

    public function paginate(Request $data)
    {
        $size = $data['size'];
        return response()->json(Message::paginate($size), 200);
    }

    public function post(Request $data)
    {

        try {
            DB::beginTransaction();
            $result = $data->json()->all();
            $message = new Message();
            $message->type = $result['type'];
            $message->content = $result['content'];
            $message->idUser = $result['idUser'];
            $message->idFriend = $result['idFriend'];
            $message->save();
            DB::commit();
        } catch (Exception $e) {
            return response()->json($e, 400);
        }
        return response()->json($message, 200);

    }

    public function put(Request $data)
    {
        try {
            DB::beginTransaction();
            $result = $data->json()->all();
            $message = Message::where('id', $result['id'])->update([
                'type' => $result['type'],
                'content' => $result['content'],
            ]);
            DB::commit();
        } catch (Exception $e) {
            return response()->json($e, 400);
        }
        return response()->json($message, 200);
    }

    public function delete(Request $data)
    {
        $result = $data->json()->all();
        $id = $result['id'];
        return Message::destroy($id);
    }
}
