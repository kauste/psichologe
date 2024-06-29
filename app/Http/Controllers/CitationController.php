<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Citation;


class CitationController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->all();
        $validator = Validator::make($data, [
            'citation' => 'required|min:4|max:150',
            'author' => 'nullable|string|min:1|max:50',
        ]);
        if($validator->fails()){
            return response()->json(['errors' => $validator->errors()->all()]);
        };
        $citation = Citation::create([
            'citation' => $data['citation'],
            'author' => $data['author'],
        ]);

        $modalHTML = view('back.CRUDmodal.citation.newCitationInModal', ['citation' => $citation])->render();
        $sectionHTML = view('back.CRUDmodal.citation.newCitationInSec', ['citation' => $citation])->render();                                            
        return response()->json(['message' => ['Pridėta nauja citata'], 
                                 'modalHTML' => $modalHTML,
                                 'sectionHTML' => $sectionHTML,
                                 'itemId' => $citation->id,
                                ]);
    }
    public function update(Request $request)
    {
        $data = $request->all();
        $id = (int) $request->id;
        $validator = Validator::make($data, [
            'citation' => 'required|min:4|max:150',
            'author' => 'nullable|string|min:1|max:30',
        ]);
        if($validator->fails()){
            return response()->json(['errors' => $validator->errors()->all()]);
        };
        $citation = Citation::find($id);
        $citation->update([
            'citation' => $data['citation'],
            'author' => $data['author'],
        ]);

        return response()->json(['message' => ['Citata yra pakeista.']]);
    }

    public function delete(Request $request)
    {
        Citation::destroy((int) $request->id);
        return response()->json(['message' => ['Citata yra ištrinta.']]);
    }
}
