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



}
