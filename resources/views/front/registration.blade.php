@extends('layouts.app')
@section('content')
<section class="registration-page registration--page">
    <div class="container">
        <div class="callendars-box --callendar">
            @include('front.parts.callendar')
        </div>
        <div class="--registration">
            <div class="registration-container swiper --swiper --form">
                <div class="swiper-wrapper --data">
                    <div class="slots-form swiper-slide">
                        @include('front.parts.slots')
                    </div>
                    <div class="personal-data-form swiper-slide">
                        @include('front.parts.registrationData')
                    </div>
                </div>
                <div class="swiper-button-prev button round electric bg-light-sand lardge">
                    <svg class="chevron chevron-left">
                        <use xlink:href="#chevron"></use>
                    </svg>
                </div>
                <div class="swiper-button-next button round electric bg-light-sand lardge">
                    <svg class="chevron chevron-right">
                        <use xlink:href="#chevron"></use>
                    </svg>
                </div>
            </div>
        </div>
    </div>
    <input class="availibe--slots" type="hidden" value="{{$slots}}">
</section>
@endsection
