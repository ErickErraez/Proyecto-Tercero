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
            $profilepicture = new Image();
            $profilepicture->name = $result['name'];
            $profilepicture->type = $result['type'];
            $profilepicture->attached = $result['attached'];
            $profilepicture->description = $result['description'];
            $profilepicture->idUser = $data->auth->id;
            $profilepicture->idAlbum = $data->$result['idAlbum'];
            $profilepicture->save();
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
            $image = Image::create([
                'name' => $result['name'],
                'type' => $result['type'],
                'attached' => $result['attached'],
                'date' => $result['date'],
                'description' => $result['description'],
            ]);
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
                'date' => $result['date'],
                'description' => $result['description'],
                'idUser' => $result['idUser'],
                'idAlbum' => $result['idAlbum'],
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
