<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Work;


class WorkController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->all();
        $data['priority'] = (int) $data['priority'] ? (int) $data['priority'] : null;

        $validator = Validator::make($data, [
            'date' => 'required|min:4|max:50',
            'about' => 'required|min:4|max:150',
            'priority' => 'nullable|integer|min:1|max:255',
        ]);
        if($validator->fails()){
            return response()->json(['errors' => $validator->errors()->all()]);
        };
        $work = Work::create([
            'date' => $data['date'],
            'about' => $data['about'],
            'priority' => $data['priority'],
        ]);

        $modalHTML = view('back.CRUDmodal.work.newWorkInModal', ['work' => $work])->render();
        $sectionHTML = view('back.CRUDmodal.work.newWorkInSec', ['work' => $work])->render();                                            
        return response()->json(['message' => ['New work is created.'], 
                                 'modalHTML' => $modalHTML,
                                 'sectionHTML' => $sectionHTML,
                                 'itemId' => $work->id,
                                ]);

    }
    public function update(Request $request)
    {
        $data = $request->all();
        $data['priority'] = (int) $data['priority'] ? (int) $data['priority'] : null;

        $id = (int) $request->id;
        $validator = Validator::make($data, [
            'date' => 'required|min:4|max:50',
            'about' => 'required|min:4|max:150',
            'priority' => 'nullable|integer|min:1|max:255',
        ]);
        if($validator->fails()){
            return response()->json(['errors' => $validator->errors()->all()]);
        };
        $work = Work::find($id);
        $work->update([
            'date' => $data['date'],
            'about' => $data['about'],
            'priority' => $data['priority'],
        ]);

        return response()->json(['message' => ['Informacija apie darbo patirtį yra pakeista.']]);
    }
    public function delete(Request $request){
        Work::destroy((int) $request->id);
        return response()->json(['message' => ['Darbo patirties punktas yra ištrintas.']]);
    }
}