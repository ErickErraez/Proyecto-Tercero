<?php

namespace App\Http\Controllers;

use App\Image;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ImageController extends Controller
{
    public function get(Request $data)
    {
        $profilepicture = Image::where('idUser', $data->auth->id)->first();
        if ($profilepicture) {
            return response()->json($profilepicture, 200);
        } else {
            return response()->json(["error" => "Record not found."], 400);
        }
    }

    public function paginate(Request $data)
    {
        $size = $data['size'];
        return response()->json(Image::paginate($size), 200);
    }

    public function postProfile()
    {
        try {
            DB::beginTransaction();
            $result = $data->json()->all();
            $image = new Image();
            $image->type = $result['type'];
            $image->name = $result['name'];
            $image->attached = $result['attached'];
            $image->date = $result['date'];
            $image->description = $result['description'];
            $image->idAlbum = $result['idAlbum'];
            $image->idUser = $result['idUser'];
            $image->save();
            DB::commit();
        } catch (Exception $e) {
            return response()->json($e, 400);
        }
        return response()->json($profilepicture, 200);

    }

    public function post(Request $data)
    {
        try {
            DB::beginTransaction();
            $result = $data->json()->all();
            $image = new Image();
            $image->type = $result['type'];
            $image->name = $result['name'];
            $image->attached = $result['attached'];
            $image->date = $result['date'];
            $image->description = $result['description'];
            $image->idAlbum = $result['idAlbum'];
            $image->idUser = $result['idUser'];
            $image->save();
            DB::commit();
        } catch (Exception $e) {
            return response()->json($e, 400);
        }
        return response()->json($image, 200);
    }

    public function put(Request $data)
    {
        try {
            DB::beginTransaction();
            $result = $data->json()->all();
            $image = Image::where('id', $result['id'])->update([
                'name' => $result['name'],
                'type' => $result['type'],
                'attached' => $result['attached'],
            ]);
            DB::commit();
        } catch (Exception $e) {
            return response()->json($e, 400);
        }
        return response()->json($image, 200);
    }

    public function delete(Request $data)
    {
        $result = $data->json()->all();
        $id = $result['id'];
        return Image::destroy($id);
    }
}
