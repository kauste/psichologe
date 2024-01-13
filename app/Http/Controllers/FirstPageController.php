<?php

namespace App\Http\Controllers;

use App\Models\FirstPage;
use Illuminate\Http\Request;
use App\Models\Education;
use App\Models\Work;
use App\Models\FirstPgImages;
use Illuminate\Support\Facades\Validator;


use Auth;

class FirstPageController extends Controller
{

    public function index()
    {
        $data = FirstPage::first();

        return view('back.firstPage', ['data' => $data, 'area' => null ]);
    }
        // propfile Pic
    public function storeProfilePic(Request $request)
    {
        $picture = $request->file('picture');
        $objectYposition = $request->input('objectYposition');
        $isRight = $request->input('is_right');
        dump( $isRight);

        $validator = Validator::make([
            'picture' => $picture,
            'objectYposition' => $objectYposition,
            'is_right' => $isRight,
        ], [
            'picture' => 'required|image|mimes:jpg,bmp,png,webp',
            'objectYposition' => 'required|decimal:0,2',
            'is_right' => 'required|boolean'
        ]);
        if($validator->fails()){
            return response()->json(['errors' => $validator->errors()->all()]);
        };

        $ext = $picture->getClientOriginalExtension();
        $name = pathinfo($picture->getClientOriginalName(), PATHINFO_FILENAME);
        $fileName = $name. '-' . rand(100000, 999999). '.' . $ext;
        $picture->move(public_path().'/images', $fileName);
        //HARDCORE is_right
        $image = FirstPgImages::create([
            'picture_path' => $fileName,
            'object_y_pos_percent' => $objectYposition,
            'is_right' => $isRight
        ]);
        return response()->json(['message' => 'New profile picture is created.', 'imageId' => $image->id]);
    }
    public function updateProfilePicPosition(Request $request){
        FirstPgImages::where('id', $request->all()['picId'])
                    ->update(['object_y_pos_percent' => $request->all()['objectYposition']]);

        return response()->json(['msg' => 'ok']);
    }
    public function deleteProfilePic(Request $request)
    {
        FirstPgImages::destroy((int) $request->openLiId);
        return response()->json(['msg' => 'ok']);
    }
    // about
    public function updateAbout(Request $request){
        // validacija, kad ne per daug raidziu butu
        FirstPage::where('user_id', Auth::user()->id)->update(['about_me' => $request->about]);
        return response()->json(['msg' =>'msg']);
    }
    // education
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
    // work
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


}
