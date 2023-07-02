<?php

namespace App\Http\Controllers;

use App\Models\FirstPage;
use Illuminate\Http\Request;
use App\Models\Education;
use Auth;

class FirstPageController extends Controller
{

    public function index()
    {
        $data = FirstPage::first();
        return view('back.firstPage', ['data' => $data ]);
    }
    public function updateAbout(Request $request){
        // validacija, kad ne per daug raidziu butu
        FirstPage::where('user_id', Auth::user()->id)->update(['about_me' => $request->about]);
        return response()->json(['msg' =>'msg']);
    }

    public function updateEducation(Request $request){
        $newData = $request->all();
        dump($newData);
        $education = Education::find((int) $newData[3]);
        $education->date = $newData[0];
        $education->about_education = $newData[1];
        $education->priority = (int) $newData[2];
        $education->first_page_id = Auth::user()->id;
        $education->save();
        return response()->json(['msg' => 'data is edited']);
    }

    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(FirstPage $firstPage)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(FirstPage $firstPage)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateFirstPageRequest $request, FirstPage $firstPage)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(FirstPage $firstPage)
    {
        //
    }
}
