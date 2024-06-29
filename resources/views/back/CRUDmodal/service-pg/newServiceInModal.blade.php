<div class="data --data">
    <div class="var --var" data-name="service_title" contenteditable="false">{{$service->service_title}}</div>
    <div class="var list-input-box list--box">
        <ul data-name="service_types">
            @forelse ($service->serviceTypes ?? [] as $key => $oneService)
            <li data-item-id="{{$oneService->id}}">
                <div class="svg-box delete-svg delete--item">
                    <svg class="delete-svg">
                        <use xlink:href="#delete"></use>
                    </svg>
                </div>
                <div class="--value">{{$oneService->service_type}}</div>
            </li>
            @empty
            <li></li>
            @endforelse
        </ul>
        <div class="input-box input--box">
            <svg class="add-btn-in --button">
                <use xlink:href="#plus"></use>
            </svg>
            <input type="text" />
        </div>
    </div>
    <div class="var last --last --var {{$service->priority && $service->priority > 0 ? '' : 'small'}}" data-name="priority" contenteditable="false">{{$service->priority && $service->priority > 0 ? $service->priority : ' nesvarbu'}}</div>
</div>
<div>
    <div class="edit--actions edit-actions">
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
    <div class="update-actions update--actions">
        <button class="cancel-btn --cancel" type="button">Atšaukti</button>
        <button class="update-btn --update" type="button">Redaguoti</button>
    </div>
    <div class="delete-actions delete--actions">
        <button class="cancel-btn --cancel" type="button">Atšaukti</button>
        <button class="delete-btn --delete" type="button">Ištrinti</button>
    </div>
</div>