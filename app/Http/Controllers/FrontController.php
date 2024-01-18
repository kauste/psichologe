<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FirstPage;

class FrontController extends Controller
{
    public function firstPage()
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
        return view('front.firstPage', ['data' => $data]);
    }
}
