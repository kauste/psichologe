@extends('layouts.appBack')
@section('content')
@include('back.CRUDmodal.contacts.modal')
<div class="contacts-page contacts--page">
    <section id="contact">
        <div class="in-section items--parent">
            <div class="edit-svg-box --edit">
                <svg>
                    <use xlink:href="#edit"></use>
                </svg>
            </div>
            <div class="one-contact one--item" data-id="{{$contacts->id}}">
                <div class="var-box">
                    <div class="heading">Adresas:</div>
                    <div>
                        <span class="--var" data-name="adress">{{$contacts->adress}}</span>
                        <span>, </span>
                        <span class="--var" data-name="city">{{$contacts->city}}</span>
                    </div>
                </div>
                <div class="var-box">
                    <div class="heading">Telefono numeris:</div>
                    <div style="display:block" class="tel-num tel-desktop">
                        <span>&#43;370 </span>
                        <span class="--var" data-name="telephone_number">{{substr($contacts->telephone_number, 0, 3)}} {{substr($contacts->telephone_number, 2, 5)}}</span>
                    </div>
                </div>
                <div class="var-box">
                    <div class="heading">Elektroninis paštas:</div>
                    <div class="email --var" data-name="telephone_number">{{$contacts->email}}</div>
                </div>
            </div>
            <div class="map-box">
                <img src="{{asset('images/map.png')}}" alt="psichologes kabinetas zemelapyje">
            </div>
        </div>
    </section>
</div>
@endsection
