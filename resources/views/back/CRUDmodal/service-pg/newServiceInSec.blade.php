<div>
    <h3 class="--var" data-name="service_title" >{{$service->service_title}}</h3>
</div>
@if($service->serviceTypes)
<div class="list--box">
    <ul data-name="service_types">
        @foreach ($service->serviceTypes ?? [] as $oneService)
        <li>{{$oneService->service_type}}</li>
        @endforeach
    </ul>
</div>
@endif
