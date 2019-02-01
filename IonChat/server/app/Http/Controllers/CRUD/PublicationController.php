<?php

namespace App\Http\Controllers;

use App\Publication;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PublicationController extends Controller
{
    public function get(Request $data)
    {
        $id = $data['id'];
        if ($id == null) {
            $publication = DB::table('publications')
                ->orderBy('created_at', 'desc')
                ->get();
            return response()->json($publication, 200);
        } else {
            return response()->json(Publication::findOrFail($id), 200);
        }
    }

    public function paginate(Request $data)
    {
        $size = $data['size'];
        return response()->json(Publication::paginate($size), 200);
    }

    public function post(Request $data)
    {
        try {
            DB::beginTransaction();
            $result = $data->json()->all();
            $publication = Publication::create([
                'content' => $result['content'],
                'idUser' => $result['idUser'],
            ]);
            DB::commit();
        } catch (Exception $e) {
            return response()->json($e, 400);
        }
        return response()->json($publication, 200);
    }

    public function put(Request $data)
    {
        try {
            DB::beginTransaction();
            $result = $data->json()->all();
            $publication = Publication::where('id', $result['id'])->update([
                'content' => $result['content'],
                'date' => $result['date'],
            ]);
            DB::commit();
        } catch (Exception $e) {
            return response()->json($e, 400);
        }
        return response()->json($publication, 200);
    }

    public function delete(Request $data)
    {
        $result = $data->json()->all();
        $id = $result['id'];
        return Publication::destroy($id);
    }
}
