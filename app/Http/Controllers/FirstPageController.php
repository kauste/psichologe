<?php

namespace App\Http\Controllers;

use App\Models\FirstPage;

class FirstPageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        dump('ce');
        return view('back.firstPage');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreFirstPageRequest $request)
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
