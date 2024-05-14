<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Contact;

class ContactController extends Controller
{
    public function contactsPage(){
        $contacts = Contact::first();
        return view('back.contactsPage', ['pageName' => 'contacts', 
                                            'contacts' => $contacts]);
    }
}
