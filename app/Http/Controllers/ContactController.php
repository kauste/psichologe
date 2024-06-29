<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Contact;
use Illuminate\Support\Facades\Validator;


class ContactController extends Controller
{
    public function contactsPage()
    {
        $contacts = Contact::first();
        return view('back.contactsPage', ['pageName' => 'contacts', 
                                            'contacts' => $contacts]);
    }
    public function update($id, Request $request)
    {
        $data = $request->all();
        $validator = Validator::make($data, [
                                                'adress' => 'required|min:10|max:40',
                                                'city' => 'required|min:4|max:20',
                                                'telephone_number' => 'required|size:8',
                                                'email' => 'required|min:5|max:40|email',
                                                'linkedin' =>  'nullable|min:25|max:100|regex:/^(?:https?:\/\/)?(?:www.)?linkedin.com\/([a-zA-Z0-9_])*/',
                                                'facebook' => 'nullable|min:25|max:100|regex:/^(?:https?:\/\/)?(?:www.)?facebook.com\/([a-zA-Z0-9_])*/',
                                                'map_link' => 'required|min:25|max:150|',
                                                'old_map' => 'required|boolean',
                                                'map' => 'required_if:old_map,false|mimes:jpg,webp,png',          
                                            ], 
                                            [
                                                'adress.required' => 'Kabineto adresas yra privalomas.',
                                                'adress.min' => 'Kabineto adresas turi būti bent 10 simbolių ilgio.',
                                                'adress.max' => 'Kabineto adresas negali būti ilgesnis nei 40 simbolių.',
                                                'city.required' => 'Miestas yra privalomas.',
                                                'city.min' => 'Miestas turi būti bent 4 simbolių ilgio.',
                                                'city.max' => 'Miestas negali būti ilgesnis nei 20 simbolių.',
                                                'telephone_number.required' => 'Telefono numeris yra privalomas.',
                                                'telephone_number.size' => 'Telefono numeris turi būti 8 simbolių ilgio.',
                                                'email.required' => 'Elektroninio pašto adresas yra privalomas.',
                                                'email.min' => 'Elektroninio pašto adresas turi būti bent 5 simbolių ilgio.',
                                                'email.max' => 'Elektroninio pašto adresas negali būti ilgesnis nei 40 simbolių.',
                                                'email.email' => 'Elektroninio pašto adresas turi būti validus.',
                                                'linkedin.min' => 'Linkedin nuoroda turi būti bent 25 simbolių ilgio.',
                                                'linkedin.max' => 'Linkedin nuoroda negali būti ilgesnis nei 100 simbolių.',
                                                'linkedin.regex' => 'Linkedin nuoroda turi būti validi.',
                                                'facebook.min' => 'Facebook nuoroda turi būti bent 25 simbolių ilgio.',
                                                'facebook.max' => 'Facebook nuoroda negali būti ilgesnis nei 100 simbolių.',
                                                'facebook.regex' => 'Facebook nuoroda turi būti validi.',
                                                'map_link.min' => 'Žemėlapio nuoroda turi būti bent 25 simbolių ilgio.',
                                                'map_link.max' => 'Žemėlapio nuoroda negali būti ilgesnis nei 150 simbolių.',
                                                'map_link.required' => 'Žemėlapio nuoroda yra privaloma.',
                                                'map.required_if' => 'Žemėlapio nuotrauka yra privalomas.',
                                                'map.mimes' => 'Žemėlapio nuotrauka turi būti jpg, webp arba png tipo.',
                                            ]);
        if($validator->fails()){
            return response()->json(['errors' => $validator->errors()->all()]);
        };
        $currMap = Contact::select('map')->first()->map;
        if(!$data['old_map']){
            if($currMap){
                $pic_asset = $currMap;
                $name = pathinfo($pic_asset, PATHINFO_FILENAME);
                $ext = pathinfo($pic_asset, PATHINFO_EXTENSION);
                $pic_path = public_path() . '/images/'. $name . '.' .$ext;
                if (file_exists($pic_path)) {
                    unlink($pic_path);
                }
            }
            $image = $data['map'];
            $extention = $image->getClientOriginalExtension();
            $name = pathinfo($image->getClientOriginalName(), PATHINFO_FILENAME);
            $currMap = $name. '-' . rand(100000, 999999). '.' . $extention;
            $image->move(public_path().'/images', $currMap);               
        }
        Contact::updateOrCreate(
            ['id' => $id],
            [
             'adress' => $data['adress'], 
             'city' => $data['city'],
             'email' => $data['email'], 
             'telephone_number' => $data['telephone_number'],
             'facebook' => $data['facebook'], 
             'linkedin' => $data['linkedin'],
             'map_link' => $data['map_link'],
             'adress' => $data['adress'],
             'map' => $currMap, 
             ]
        );

        return response()->json(['redirectRoute' => route('back-contacts')]);
    }
}
