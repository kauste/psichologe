<?php

namespace App\Http\Controllers;
use DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\FirstPage;
use App\Models\Citation;
use App\Models\Education;
use App\Models\Work;
use App\Models\Service;

use Auth;

class FirstPageController extends Controller
{
    // first page
    public function index()
    {
        $data = FirstPage::with(['educations'=> function($query){
                                    $query->orderByRaw('priority IS NULL, priority');
                                },
                                'works' => function($query){
                                    $query->orderByRaw('priority IS NULL, priority');
                                },])->first();
        $citations = Citation::orderBy(DB::raw('RAND()'))
                                ->get();
        $services = Service::where('id', '>', '0')
                                ->select('service_title')
                                ->orderBy('priority')
                                ->get();
        return view('back.firstPage', ['pageName' => 'firstPage',
                                        'data' => $data,
                                        'citations' => $citations,
                                        'services' => $services,
                                        'area' => null ]);
    }
    // citations
    public function storeCitation(Request $request)
    {
        $data = $request->data;
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
        return response()->json(['message' => 'Pridėta nauja citata', 
                                 'modalHTML' => $modalHTML,
                                 'sectionHTML' => $sectionHTML,
                                 'itemId' => $citation->id,
                                ]);
    }
    public function updateCitation(Request $request)
    {
        $data = $request->data;
        $id = (int) $request->id;
        $validator = Validator::make($data, [
            'citation' => 'required|min:4|max:150',
            'author' => 'nullable|integer|min:1|max:30',
        ]);
        if($validator->fails()){
            return response()->json(['errors' => $validator->errors()->all()]);
        };
        $citation = Citation::find($id);
        $citation->update([
            'citation' => $data['citation'],
            'author' => $data['author'],
        ]);

        return response()->json(['message' => 'Citata yra pakeista.']);
    }

    public function deleteCitation(Request $request)
    {
        Citation::destroy((int) $request->id);
        return response()->json(['message' => 'Citata yra ištrinta.']);
    }
    // about
    public function updateAbout(Request $request)
    {
        // validacija, kad ne per daug raidziu butu
        $validator = Validator::make($request->all(), [
            'about' => 'required|max:5000|string',
        ]);
        if($validator->fails()){
            return response()->json(['errors' => $validator->errors()->all()]);
        };
        FirstPage::where('user_id', Auth::user()->id)->update(['about_me' => $request->about]);
        return response()->json(['message' =>'Informacija apie tave, mama, yra pakeista.']);
    }

    // education
    public function storeEducation(Request $request){
        $data = $request->data;
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
        return response()->json(['message' => 'Pridėti nauji kursai/mokymai.', 
                                 'modalHTML' => $modalHTML,
                                 'sectionHTML' => $sectionHTML,
                                 'itemId' => $education->id,
                                ]);

    }
    public function updateEducation(Request $request)
    {
        $data = $request->data;
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

        return response()->json(['message' => 'Kursų/mokymų informacija yra pakeista.']);
    }
    public function deleteEducation(Request $request)
    {
        Education::destroy((int) $request->id);
        return response()->json(['message' => 'Kursai/mokymai yra ištrinti.']);
    }

    // work
    public function storeWork(Request $request)
    {
        $data = $request->data;
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
        return response()->json(['message' => 'New work is created.', 
                                 'modalHTML' => $modalHTML,
                                 'sectionHTML' => $sectionHTML,
                                 'itemId' => $work->id,
                                ]);

    }
    public function updateWork(Request $request)
    {
        $data = $request->data;
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

        return response()->json(['message' => 'Informacija apie darbo patirtį yra pakeista.']);
    }
    public function deleteWork(Request $request){
        Education::destroy((int) $request->id);
        return response()->json(['message' => 'Darbo patirties punktas yra ištrintas.']);
    }


}
