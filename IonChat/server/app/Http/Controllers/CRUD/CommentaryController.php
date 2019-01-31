<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
Use Exception;
use App\Commentary;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class CommentaryController extends Controller
{
    function get(Request $data)
    {
       $id = $data['id'];
       if ($id == null) {
          return response()->json(Commentary::get(),200);
       } else {
          return response()->json(Commentary::findOrFail($id),200);
       }
    }

    function paginate(Request $data)
    {
       $size = $data['size'];
       return response()->json(Commentary::paginate($size),200);
    }

    function post(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $commentary = Commentary::create([
             'content'=>$result['content'],
             'date'=>$result['date'],
          ]);
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($commentary,200);
    }

    function put(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $commentary = Commentary::where('id',$result['id'])->update([
             'content'=>$result['content'],
             'date'=>$result['date'],
          ]);
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($commentary,200);
    }

    function delete(Request $data)
    {
       $result = $data->json()->all();
       $id = $result['id'];
       return Commentary::destroy($id);
    }
}