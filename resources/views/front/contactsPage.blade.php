@extends('layouts.app')
@section('content')
<section class="contacts-page contacts--page">
    <div class="in-section">
        <div class="contacts-box">
            <div class="contacts-item">
                <div class="heading">Adresas:</div>
                <div>{{$contacts->adress}}, {{$contacts->city}}</div>
            </div>
            <div class="contacts-item">
                <div class="heading">Telefono numeris:</div>
                <div style="display:block" class="tel-num tel-desktop">&#43;370 {{substr($contacts->telephone_number, 0, 3)}} {{substr($contacts->telephone_number, 2, 5)}}</div>
                <a style="display:none" class=" tel-num tel-mobile" href="tel:+370{{str_replace([' ', '-'], '', $contacts->telephone_number)}}" target="_blank">&#43;370 {{substr($contacts->telephone_number, 0, 3)}} {{substr($contacts->telephone_number, 2, 5)}}</a>
            </div>
            <div class="contacts-item">
                <div class="heading">Elektroninis paštas:</div>
                <a class="email" href="mailto:{{$contacts->email}}?subject=Mail from site">{{$contacts->email}}</a>
            </div>
        </div>
        <div class="map-box">
            <img src="{{asset('images/map.png')}}" alt="psichologes kabinetas zemelapyje">
        </div>
    </div>
</section>
@endsection
