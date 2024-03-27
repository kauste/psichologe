@extends('layouts.appBack')
@section('content')
@include('back.CRUDmodal.service-pg.modal')

<section id="service" class="services-list services--list">
    <div class="edit-svg-box --edit">
        <svg>
            <use xlink:href="#edit"></use>
        </svg>
    </div>
    <div class="ul-box ul--box">
        <ul class="services-box">
            @foreach ($services ?? [] as $service)
            <li id="service-{{$service->id}}" data-priority="{{$service->priority}}" class="one-service">
                <div>
                    <h3>{{$service->service_title}}</h3>
                </div>
                @if($service->serviceTypes)
                <div class="service--types--ul--box">
                    <ul>
                        @foreach ($service->serviceTypes ?? [] as $oneService)
                        <li data-service-type-id="{{$oneService->id}}">{{$oneService->service_type}}</li>
                        @endforeach
                    </ul>
                </div>
                @endif
            </li>
            @endforeach
        </ul>
    </div>
</section>
<svg class="psychology-svg">
    <defs>
        <linearGradient id="gradient" x1="30%" y1="10%" x2="100%" y2="60%">
            <stop offset="0%" stop-color="#6E717B"" />
            <stop offset=" 100%" stop-color="#b5b3b1eb" />
        </linearGradient>
    </defs>
    <use xlink:href="#psychology"></use>
</svg>
@endsection