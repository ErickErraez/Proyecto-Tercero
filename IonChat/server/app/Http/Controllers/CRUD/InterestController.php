<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
Use Exception;
use App\Interest;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class InterestController extends Controller
{
    function get(Request $data)
    {
       $id = $data['id'];
       if ($id == null) {
          return response()->json(Interest::get(),200);
       } else {
          return response()->json(Interest::findOrFail($id),200);
       }
    }

    function paginate(Request $data)
    {
       $size = $data['size'];
       return response()->json(Interest::paginate($size),200);
    }

    function post(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $interest = Interest::create([
             'type'=>$result['type'],
             'content'=>$result['content'],
          ]);
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($interest,200);
    }

    function put(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $interest = Interest::where('id',$result['id'])->update([
             'type'=>$result['type'],
             'content'=>$result['content'],
          ]);
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($interest,200);
    }

    function delete(Request $data)
    {
       $result = $data->json()->all();
       $id = $result['id'];
       return Interest::destroy($id);
    }
}