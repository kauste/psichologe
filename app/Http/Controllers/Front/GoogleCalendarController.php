<?php

namespace App\Http\Controllers\Front;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Google\Client as GoogleClient;
use Google\Service\Calendar as GoogleCalendar;

class GoogleCalendarController extends Controller{
    protected $calendarId;
    protected $client;
    protected $calendarService;

    public function __construct()
    {
        $this->calendarId = config('services.google.calendar_id');
        $this->client = new GoogleClient();
        $this->client->setAuthConfig(config('services.google.credentials_path'));
        $this->client->addScope(GoogleCalendar::CALENDAR);
        // $this->client->setSubject(config('services.google.impersonated_user'));
        $this->calendarService = new GoogleCalendar($this->client);
    }
    public function getEvent($eventId)
    {
        return $this->calendarService->events->get($this->calendarId, $eventId);
    }
    public function getEvents($startDate, $endDate)
    {
        $events = $this->calendarService->events->listEvents($this->calendarId, [
            'timeMin' => $startDate,
            'timeMax' => $endDate,
            'orderBy' => 'startTime',
            'singleEvents' => true,
        ]);
        $filteredEvents = array_filter($events->getItems(), function($event) {
            return !$event->getDescription();
        });

        return $filteredEvents;
    }
    public function bookEvent($eventId, $fullName, $tel, $email){
        try {

            $event = $this->getEvent($eventId);
            if(!!$event->description) return 'Atsiprašome, šis laikas jau rezervuotas.Prašome pasirinkti kitą laiką.';

            $event->setSummary(trim(strtoupper($fullName)));
            $description = "Telefono numeris: $tel" . PHP_EOL . "Elektroninis pastas: $email";
            $event->setDescription($description);
            $updatedEvent = $this->calendarService->events->update($this->calendarId, $eventId, $event);
            
            return null;

        } catch (\Exception $e) {
            return  'Atsiprašome, įvyko klaida. Prašome susisiekti telefonu arba elektroniniu paštu.';
        }

    }

}