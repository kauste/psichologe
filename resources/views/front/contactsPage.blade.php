@extends('layouts.app')
@section('content')
<div class="contacts-page contacts--page">
    <section>
        <div class="in-section">
            <div class="one-contact">
                <div class="var-box">
                    <div class="heading">Adresas:</div>
                    <div>{{$contacts->adress}}, {{$contacts->city}}</div>
                </div>
                <div class="var-box">
                    <div class="heading">Telefono numeris:</div>
                    <div style="display:block" class="tel-num tel-desktop">&#43;370 {{substr($contacts->telephone_number, 0, 3)}} {{substr($contacts->telephone_number, 2, 5)}}</div>
                    <a style="display:none" class=" tel-num tel-mobile" href="tel:+370{{str_replace([' ', '-'], '', $contacts->telephone_number)}}" target="_blank">&#43;370 {{substr($contacts->telephone_number, 0, 3)}} {{substr($contacts->telephone_number, 2, 5)}}</a>
                </div>
                <div class="var-box">
                    <div class="heading">Elektroninis paštas:</div>
                    <a class="email" href="mailto:{{$contacts->email}}?subject=Mail from site">{{$contacts->email}}</a>
                </div>
            </div>
            <div class="img-box-container button electric bg-sand-blur">
                <a href="{{$contacts->map_link}}" class="map-box" target="_blank">
                    <img src="{{asset('images/' . $contacts->map)}}" alt="psichologes kabinetas zemelapyje">
                </a>
            </div>
        </div>
    </section>
</div>
@endsection
