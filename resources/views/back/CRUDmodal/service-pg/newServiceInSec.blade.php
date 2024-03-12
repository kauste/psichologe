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
