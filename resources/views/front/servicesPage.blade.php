@extends('layouts.app')
@section('content')
<section class="services-list services--list">
    <div class="ul-box">
        <ul class="services-box">
            @foreach ($services ?? [] as $service)
            <li class="one-service">
                <div>
                    <h3>{{$service->service_title}}</h3>
                </div>
                @if($service->serviceTypes)
                <div>
                    <ul>
                        @foreach ($service->serviceTypes ?? [] as $oneService)
                        <li>{{$oneService->service_type}}</li>
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
