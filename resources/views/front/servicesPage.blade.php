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
@endsection
