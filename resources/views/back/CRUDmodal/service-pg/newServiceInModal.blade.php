<div class="service the--service">{{$service->service_title}}</div>
<div class="service-types service--types" style="padding: 0px">
    <ul>
        @forelse ($service->serviceTypes ?? [] as $key => $oneService)
        <li data-service-type-id="{{$oneService->id}}" style="padding:0px;">
            <div class="svg-box  delete--service--type--svg" style="display:none">
                <svg class="delete-svg">
                    <use xlink:href="#delete"></use>
                </svg>
            </div>
            <div>{{$oneService->service_type}}</div>
        </li>
        @empty
        <li></li>
        @endforelse
    </ul>
    <div class="add-service-type add--service--type" style="display:none">
        <svg class="add-btn-in">
            <use xlink:href="#plus"></use>
        </svg>
        <input type="text" class="new--service--type">
    </div>
</div>
<div class="position --priority {{$service->priority && $service->priority > 0 ? '' : 'small'}}">{{$service->priority && $service->priority > 0 ? $service->priority : ' nesvarbu'}}</div>
<div class="edit--actions edit-actions" style="display:flex">
    <div class="svg-box --edit">
        <svg class="edit-svg">
            <use xlink:href="#edit"></use>
        </svg>
    </div>
    <div class="svg-box --delete">
        <svg class="delete-svg">
            <use xlink:href="#delete"></use>
        </svg>
    </div>
</div>
<div class="update-actions update--actions" style="display:none">
    <button class="cancel-btn --cancel" type="button">Atšaukti</button>
    <button class="update-btn --update" type="button">Redaguoti</button>
</div>
<div class="delete-actions delete--actions" style="display:none">
    <button class="cancel-btn --cancel" type="button">Atšaukti</button>
    <button class="delete-btn --delete" type="button">Ištrinti</button>
</div>