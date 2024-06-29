<?php 
namespace App\Services;
use Google\Client as GoogleClient;
use Google\Service\Calendar as GoogleCalendar;


class GoogleCallendarService {
    // public function __construct() {
    //     $conf = config('services.google');

    //     // Initialize Google Client
    //     $client->setClientId($conf['client_id']); // Fetch client ID from Laravel configuration
    //     $client->setClientSecret($conf['client_secret']); // Fetch client secret from Laravel configuration
    //     $client->setRedirectUri($conf['redirect_uri']); // Fetch redirect URI from Laravel configuration
    //     $client->setScopes($conf['scopes']); // Fetch scopes from Laravel configuration
    //     $client->setAccessType($conf['access_type']); // request offline access

    //     // Generate Authorization URL
    //     $authUrl = $client->createAuthUrl();
    // }
    public function getEvents($accessToken)
    {
        $conf = config('services.google');
        $client = new GoogleClient();
         $client->setClientId($conf['client_id']);
        $client->setClientSecret($conf['client_secret']);
        $client->setRedirectUri($conf['redirect_uri']);
        $client->setScopes($conf['scopes']);
        $client->setAccessType($conf['access_type']);
        $client->setAccessToken($accessToken);

        $calendarService = new GoogleCalendar($client);
        $calendarId = 'primary';
        $events = $calendarService->events->listEvents($calendarId, [
            'timeMin' => now()->format('c'),
            'orderBy' => 'startTime',
            'singleEvents' => true,
        ]);

        return $events;
    }}