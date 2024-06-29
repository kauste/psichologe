<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Education;
use Illuminate\Support\Facades\Validator;


class EducationController extends Controller
{
    public function store(Request $request){
        $data = $request->all();
        dump( $data );
        $data['priority'] = (int) $data['priority'] ? (int) $data['priority'] : null;

        $validator = Validator::make($data, [
            'date' => 'required|min:4|max:50',
            'about' => 'required|min:4|max:150',
            'priority' => 'nullable|integer|min:1|max:255',
        ]);
        if($validator->fails()){
            return response()->json(['errors' => $validator->errors()->all()]);
        };
        $education = Education::create([
            'date' => $data['date'],
            'about' => $data['about'],
            'priority' => $data['priority'],
        ]);

        $modalHTML = view('back.CRUDmodal.education.newEduInModal', ['edu' => $education])->render();
        $sectionHTML = view('back.CRUDmodal.education.newEduInSec', ['edu' => $education])->render();                                            
        return response()->json(['message' => ['Pridėti nauji kursai/mokymai.'], 
                                 'modalHTML' => $modalHTML,
                                 'sectionHTML' => $sectionHTML,
                                 'itemId' => $education->id,
                                ]);

    }
    public function update(Request $request)
    {
        $data = $request->all();
        dump( $data );

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
        $education = Education::find($id);
        $education->update([
            'date' => $data['date'],
            'about' => $data['about'],
            'priority' => $data['priority'],
        ]);

        return response()->json(['message' => ['Kursų/mokymų informacija yra pakeista.']]);
    }
    public function delete(Request $request)
    {
        Education::destroy((int) $request->id);
        return response()->json(['message' => ['Kursai/mokymai yra ištrinti.']]);
    }
}