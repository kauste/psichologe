<?php

namespace App\Http\Controllers;

use App\Models\FirstPage;
use Illuminate\Http\Request;
use App\Models\Education;
use App\Models\Work;
use App\Models\FirstPgImages;

use Auth;

class FirstPageController extends Controller
{

    public function index()
    {
        $data = FirstPage::first();

        return view('back.firstPage', ['data' => $data, 'area' => null ]);
    }
    public function updateAbout(Request $request){
        // validacija, kad ne per daug raidziu butu
        FirstPage::where('user_id', Auth::user()->id)->update(['about_me' => $request->about]);
        return response()->json(['msg' =>'msg']);
    }
    public function storeEducation(Request $request){
        $data = $request->all();
        $education = new Education;
        $education->date = $data['education-date'];
        $education->about_education = $data['education-about'];
        $education->priority = (int) $data['education-priority'];
        $education->first_page_id = Auth::user()->id;
        $education->save();

        return response()->json(['msg' => 'data is edited']);

    }
    public function updateEducation(Request $request)
    {
        dump(Education::find((int) $request->eduId));

        $newData = $request->all();
        $education = Education::find((int) $request->eduId);
        $education->date = $newData['education-date'];
        $education->about_education = $newData['education-about'];
        $education->priority = (int) $newData['education-priority'];
        $education->first_page_id = Auth::user()->id;
        $education->save();
        return response()->json(['msg' => 'data is edited']);
    }
    public function deleteEducation(Request $request){
        Education::where('id', (int) $request->id)->delete();
        return response()->json(['msg' => 'deleted']);
    }
    public function storeWork(Request $request){

        $data = $request->all();
        $work = new Work;
        $work->date = $data['work-date'];
        $work->about_work = $data['work-about'];
        $work->priority = (int) $data['work-priority'];
        $work->first_page_id = Auth::user()->id;
        $work->save();

        return response()->json(['msg' => 'data is created']);

    }
    public function updateWork(Request $request)
    {
        $newData = $request->all();
        $work = Work::find((int) $request->workId);
        $work->date = $newData['work-date'];
        $work->about_work = $newData['work-about'];
        $work->priority = (int) $newData['work-priority'];
        $work->first_page_id = Auth::user()->id;
        $work->save();
        return response()->json(['msg' => 'data is edited']);
    }
    public function deleteWork(Request $request){
        Work::where('id', (int) $request->id)->delete();
        return response()->json(['msg' => 'deleted']);
    }
    public function updateProfilePicPosition(Request $request){
        dump($request->all()['objectYposition']);
        FirstPgImages::where('id', $request->all()['picId'])
                    ->update(['object_y_position' => $request->all()['objectYposition']]);

        return response()->json(['msg' => 'ok']);
    }

}
