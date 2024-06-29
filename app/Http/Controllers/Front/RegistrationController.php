<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Front\GoogleCalendarController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;
use Session;
use App\Models\Contact;

class RegistrationController extends Controller
{
    private $googleCalendarController;

    public function __construct() {
        $this->googleCalendarController = new GoogleCalendarController;
    }
    private function callendar($day, $availibleDays, $amountOfMonhs){

        $callendar = [];

        foreach(range(1, $amountOfMonhs) as $cycle){
            if($cycle !== 1){
                $day->addMonth();
            }
            $year = $day->isoFormat('YYYY');
            $monthName = $day->locale('lt_Lt')->isoFormat('MMMM');
            $monthNum = $day->month;
            //pirmadienis:
            $tempDate = $day->copy()->startOfMonth();
            $daysTillMon = $tempDate->dayOfWeek - 1;
            for($i = 0; $i < $daysTillMon; $i++){
                $tempDate->subDay();
            }
            //
            $month = [];
            foreach(range(1, 6) as $_){
                $week = [];
                foreach(range(1, 7) as $_) {
                    $date = $tempDate->format('Y-m-d');
                    $isAvailible = in_array($date, $availibleDays) ? true : false;
                    $week[] = ['day' => $tempDate->day, 
                               'monthNum' => $tempDate->month,
                               'date' => $date, 
                               'is_abailible' => $isAvailible];
                    $tempDate->addDay();
                  }
                $month[] = $week;
            }
            $callendar[] = [
                'year' => $year,
                'monthName' => $monthName,
                'monthNum' => $monthNum,
                'monthCallendar' => $month,
            ];
        }


        return $callendar;

    }
    private function slots($amountOfMonhs)
    {
        $fromDate = Carbon::now()->addDays(2)->startOfDay()->format('c');
        $endDate = Carbon::now()->addMonths($amountOfMonhs - 1)->endOfMonth()->format('c');

        $events = $this->googleCalendarController->getEvents($fromDate, $endDate);
        $slots = [];

        foreach($events as $event){
            if(isset($events->attendees) && count($events->attendees) > 0) continue;
            $day = Carbon::parse($event->start->dateTime)->format('Y-m-d');
            $start = Carbon::parse($event->start->dateTime)->format('H:i');
            $end = Carbon::parse($event->end->dateTime)->format('H:i');
            $slots[$day][] = ['start' => $start, 'end' => $end, 'event_id' => $event->id];
        }

        return $slots;
    }

    public function registration(Request $request)
    {

        $amountOfMonhs = 2;
        $slots = $this->slots($amountOfMonhs);

        if(count($slots) === 0 ) return view('front.registrationUnable');

        $availibeDays = array_keys($slots);
        $firstAvailibleDay = Carbon::parse($availibeDays[0])->setTimezone('Europe/Vilnius');
        $today = Carbon::now()->setTimezone('Europe/Vilnius');
        
        $amountOfMonhs -= ($firstAvailibleDay->month - $today->month);

        $callendar = $this->callendar($firstAvailibleDay, $availibeDays, $amountOfMonhs);
        return view('front.registration', [
                                            'pageName' => 'registration',
                                            'callendar' => $callendar,
                                            'todayDay'=> $today->toArray(),
                                            'activeDay' => $availibeDays[0],
                                            'daySlots' => $slots[$availibeDays[0]],
                                            'slots' => json_encode($slots),
                                          ]);
    }

    public function storeRegistration(Request $request)
    {
        $data = $request->all();

        $bugError = 'Įvyko klaida, prašome susisiekti telefonu arba el. paštu';
        $validator = Validator::make($data, [
                                    'event_id' => 'required',
                                    'name' => 'required|min:1|max:50',
                                    'surname' => 'required|min:3|max:50',
                                    'tel' => 'required|min:5|max:12',
                                    'email' => 'nullable|email|max:100',
                                ],
                                [
                                    'event_id.required' => $bugError, 
                                    'name.required' => 'Vardas yra privalomas.', 
                                    'name.min' => 'Nurodykite bent pirmą vardo raidę.', 
                                    'name.max' => 'Vardas turi būti ne ilgesnis nei 50 simbolių.',
                                    'surname.required' => 'Pavardė yra privaloma.', 
                                    'surname.min' => 'Pavardė turi būti bent 3 simbolių ilgumo.', 
                                    'surname.max' => 'Pavardė turi būti ne ilgesnis nei 50 simbolių.',
                                    'tel.required' => 'Telefono numeris yra privalomas.', 
                                    'tel.min' => 'Telefono numeris turi būti bent 5 simbolių ilgumo.', 
                                    'tel.max' => 'Telefono numeris turi būti ne ilgesnis nei 12 simbolių.',
                                    'email.email' => 'Elektroninis paštas turi būti tinkamo formato.',
                                    'email.max' => 'Elektroninis paštas turi būti ne ilgesnis nei 100 simbolių.',

                                ]);
        if ($validator->fails()) {
            $formatedErrors = $validator->errors();
            $formatedErrors = collect($formatedErrors)->map(function($error) {
                return $error[0];
            })->toArray();
            return response()->json(['errorsObj' => $formatedErrors]);
        }
        $error = $this->googleCalendarController->bookEvent($data['event_id'], 
                                                   $data['name'] . ' ' . $data['surname'], 
                                                   $data['tel'], 
                                                   isset($data['email']) ? $data['email'] : null);

                                                   
        if($error){
            return response()->json(['errors' => $error]);
        }
        $request->session()->put('registered_client', $request->all());
        return response()->json(['redirectRoute' => route('registered')]);

    }
    public function registered (Request $request) 
    {
        $client = $request->session()->get('registered_client', null);
        if(!$client) return redirect()->route('registration');
        $event = $this->googleCalendarController->getEvent($client['event_id']);
        $eventStart =  Carbon::parse($event->start->dateTime)->locale('lt_Lt')->format('Y-m-d H:i');
        $contacts = Contact::select('adress', 'city')->first();

        return view('front.registered', ['client' => $client,
                                         'eventStart' => $eventStart,
                                         'contacts' => $contacts]);

    }
}