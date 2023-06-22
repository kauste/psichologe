<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FirstPage;

class FrontController extends Controller
{
    public function firstPage()
    {
        $data = FirstPage::first();
        return view('front.firstPage', ['data' => $data,

                                        ]);
    }
}
