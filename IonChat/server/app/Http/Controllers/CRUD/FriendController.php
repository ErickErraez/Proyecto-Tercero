<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
Use Exception;
use App\Friend;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class FriendController extends Controller
{
    function get(Request $data)
    {
       $id = $data['id'];
       if ($id == null) {
          return response()->json(Friend::get(),200);
       } else {
          return response()->json(Friend::findOrFail($id),200);
       }
    }

    function paginate(Request $data)
    {
       $size = $data['size'];
       return response()->json(Friend::paginate($size),200);
    }

    function post(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $friend = Friend::create([
             'date'=>$result['date'],
          ]);
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($friend,200);
    }

    function put(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $friend = Friend::where('id',$result['id'])->update([
             'date'=>$result['date'],
          ]);
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($friend,200);
    }

    function delete(Request $data)
    {
       $result = $data->json()->all();
       $id = $result['id'];
       return Friend::destroy($id);
    }
}