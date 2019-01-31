<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
Use Exception;
use App\Album;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class AlbumController extends Controller
{
    function get(Request $data)
    {
       $id = $data['id'];
       if ($id == null) {
          return response()->json(Album::get(),200);
       } else {
          return response()->json(Album::findOrFail($id),200);
       }
    }

    function paginate(Request $data)
    {
       $size = $data['size'];
       return response()->json(Album::paginate($size),200);
    }

    function post(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $album = Album::create([
             'name'=>$result['name'],
          ]);
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($album,200);
    }

    function put(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $album = Album::where('id',$result['id'])->update([
             'name'=>$result['name'],
          ]);
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($album,200);
    }

    function delete(Request $data)
    {
       $result = $data->json()->all();
       $id = $result['id'];
       return Album::destroy($id);
    }
}