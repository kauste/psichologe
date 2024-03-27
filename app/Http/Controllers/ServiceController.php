<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Service;
use App\Models\ServiceType;


class ServiceController extends Controller
{
    public function servicesList()
    {
        $services = Service::where('id', '>', '0')
                            ->orderByRaw('priority IS NULL, priority')
                            ->get();
        return view('back.servicesPage', ['pageName' => 'services', 
                                           'services' => $services]);
    }
    public function storeService(Request $request)
    {
        $data = $request->data;
        $validator = Validator::make($data,
        [
            'service_title' => 'required|string|min:3|max:100',
            'priority' => 'nullable|integer|min:1',
            'service_types' => 'nullable|array',
            'service_types.*'=> 'required|string|min:3|max:120',
        ],
        [
            'service_title.required' => 'Paslaugos pavadinimas yra privalomas.',
            'service_title.string' => 'Paslaugos pavadinimas turi būti string tipo.',
            'service_title.min' => 'Paslaugos pavadinimą turi sudaryti bent 3 simboliai.',
            'service_title.max' => 'Paslaugos pavadinimas turi būti ne ilgesnis nei 100 simbolių.',
            'priority.integer' => 'Prioritetas turi būti sveikasis skaičius.',
            'priority.min' => 'Prioritetas turi būti teigiamas skaičius.',
            'service_types.array' => 'Paslaugos tipai turi būti masyve.',
            'service_types.*.required' => 'Paslaugos tipas negali būti tuščias.',
            'service_types.*.string' => 'Paslaugos tipas turi būti string tipo kintamasis.',
            'service_types.*.min' => 'Paslaugos tipas turi būti ne trumpesnis nei 3 simboliai.',
            'service_types.*.max' => 'Paslaugos tipas turi būti ne ilgesnis nei 120 simbolių.',
        ]);
        if($validator->fails()){
            return response()->json(['errors' => $validator->errors()->all()]);
        };
        $service = Service::create([
            'service_title' => $data['service_title'],
            'priority' => $data['priority'],
        ]);
        if($data['service_types'] && count($data['service_types'])){
            collect($data['service_types'])->each(function($serviceType) use ($service){
                $serviceType = ServiceType::create([
                    'service_type' => $serviceType,
                    'service_id'=> $service->id,
                ]);
            });
        }
        $modalHTML = view('back.CRUDmodal.service-pg.newServiceInModal', ['service' => $service])->render();
        $sectionHTML = view('back.CRUDmodal.service-pg.newServiceInSec', ['service' => $service])->render();  
        return response()->json(['message' => 'Pridėta nauja paslauga.', 
                                 'modalHTML' => $modalHTML,
                                 'sectionHTML' => $sectionHTML,
                                 'itemId' => $service->id,
                                ]);
    }
    public function updateService(Request $request, $id)
    {
        $data = $request->data;
        dump($data);
        $data['id'] = (int) $id;
        $validator = Validator::make($data,
        [
            'service_title' => 'required|string|min:3|max:100',
            'priority' => 'nullable|integer|min:1',
            'service_types' => 'nullable|array',
            'service_types.*'=> 'required|integer|exists:service_types,id',
            'new_service_types' => 'nullable|array',
            'new_service_types.*' => 'required|string|min:3|max:120',
            'id' => 'required|integer|exists:services,id'
        ],
        [
            'service_title.required' => 'Paslaugos pavadinimas yra privalomas.',
            'service_title.string' => 'Paslaugos pavadinimas turi būti string tipo.',
            'service_title.min' => 'Paslaugos pavadinimą turi sudaryti bent 3 simboliai.',
            'service_title.max' => 'Paslaugos pavadinimas turi būti ne ilgesnis nei 100 simbolių.',
            'priority.integer' => 'Prioritetas turi būti sveikasis skaičius.',
            'priority.min' => 'Prioritetas turi būti teigiamas skaičius.',
            'service_types.array' => 'Paslaugos tipai turi būti masyve.',
            'service_types.*.required' => 'Paslaugos tipas negali būti tuščias.',
            'service_types.*.integer' => 'Paslaugos tipai turi būti sveikieji skaičiai.',
            'service_types.*.exists' => 'Norimas ištrinti paslaugos tipas turi egsiztuoti duomenų bazėje.',
            'new_service_types.array' => 'Nauji paslaugos tipai turi būti masyve.',
            'new_service_types.*.required' => 'Naujas paslaugos tipas negali būti tuščias.',
            'new_service_types.*.string' => 'Naujas paslaugos tipas turi būti string tipo kintamasis.',
            'new_service_types.*.min' => 'Naujas paslaugos tipas turi būti ne trumpesnis nei 3 simboliai.',
            'new_service_types.*.max' => 'Naujas paslaugos tipas turi būti ne ilgesnis nei 120 simbolių.',
            'id.required' => 'Norimos redaguoti paslaugos id yra privalomas.',
            'id.integer' => 'Norimos redaguoti paslaugos id turi būti sveikasis skaičius.',
            'id.required' => 'Norima redaguoti paslauga turi egzistuoti duomenų bazėje.',

        ]);
        if($validator->fails()){
            return response()->json(['errors' => $validator->errors()->all()]);
        };
        $service = Service::find($id);
        $service->update([
            'service_title' => $data['service_title'],
            'priority' => $data['priority'],
        ]);
        $service->serviceTypes()->delete();
        if($data['service_type']){
            collect($data['service_type'])->each(function($serviceType) use ($id, &$serviceTypes){
                $serviceType = ServiceType::create([
                    'service_type' => $serviceType,
                    'service_id'=> $id,
                ]);
            });
        }
        return response()->json(['message' => 'Paslauga yra pakeista.']);

    }
    public function deleteService($id)
    {
        $service = Service::find((int) $id);
        $service->serviceTypes()->delete();
        $service->delete();
        return response()->json(['message' => 'Paslauga yra ištrinta.']);
    }
}
