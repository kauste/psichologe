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
    // first page
    public function index()
    {
        $data = FirstPage::with(['images' => function($query){
                                    $query->orderByRaw('priority IS NULL, priority');
                                },
                                'educations'=> function($query){
                                    $query->orderByRaw('priority IS NULL, priority');
                                },
                                'works' => function($query){
                                    $query->orderByRaw('priority IS NULL, priority');
                                },])->first();
        return view('back.firstPage', ['data' => $data, 'area' => null ]);
    }

    // propfile Pic
    public function storeProfilePic(Request $request)
    {
        $picture = $request->file('picture');
        $objectYposition = $request->input('objectYposition');
        $isRight = $request->input('is_right');

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
        $image = FirstPgImages::create([
            'picture_path' => $fileName,
            'object_y_pos_percent' => $objectYposition,
            'is_right' => $isRight
        ]);

        $url = asset('/images/'. $fileName);
        $modalHTML = view('back.CRUDmodal.profilePic.newPicInModal', ['url' => $url, 
                                                                      'objectYposition' => $objectYposition])->render();
        $sectionHTML = view('back.CRUDmodal.profilePic.newPicInSec', ['url' => $url, 
                                                                        'objectYposition' => $objectYposition,
                                                                        'isRight' => $image->is_right])->render();                                               
        return response()->json(['message' => 'Sukurta nauja profilio nuotrauka.', 
                                 'modalHTML' => $modalHTML,
                                 'sectionHTML' => $sectionHTML,
                                 'imageId' => $image->id,
                                ]);
    }
    public function updateProfilePic(Request $request){
        $imgData = $request->all();
        $imgData['priority'] = (int) $imgData['priority'];
        $imgData['priority'] = $imgData['priority'] ? $imgData['priority'] : null;
        $validator = Validator::make($imgData, [
            'picId' => 'required|integer|exists:first_pg_images,id',
            'objectYposition' => 'required|decimal:0,2|min:0|max:100',
            'priority' => 'nullable|integer|max:255|min:1',
        ]);
        if($validator->fails()){
            return response()->json(['errors' => $validator->errors()->all()]);
        };
        FirstPgImages::where('id', $imgData['picId'])
                    ->update(['object_y_pos_percent' => $imgData['objectYposition'],
                              'priority' => $imgData['priority']]);

        return response()->json(['message' => 'Informacija apie nuotrauką yra pakeista.']);
    }
    public function deleteProfilePic(Request $request)
    {
        $image = FirstPgImages::find((int) $request->openLiId);
        if($image){
            $pic_path = public_path() . '/images/'. $image->picture_path;
            if (file_exists($pic_path)) {
                unlink($pic_path);
            }
        }
        FirstPgImages::destroy((int) $request->openLiId);
        return response()->json(['message' => 'Nuotrauka yra ištrinta.']);
    }

    // about
    public function updateAbout(Request $request){
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
        return response()->json(['message' => 'New education is created.', 
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

        return response()->json(['message' => 'Pridėti nauji kursai/mokymai.']);
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
