<?php 
namespace App\Services;
use App\Models\Contact;

class Contacts {
    public $email;
    public $telephone_number;
    public $facebook;
    public $linkedin;

    public function __construct(){
        $contacts = Contact::first();
        $this->email = $contacts->email;
        $this->telephone_number = $contacts->telephone_number;
        $this->facebook = $contacts->facebook;
        $this->linkedin = $contacts->linkedin;


    }
}