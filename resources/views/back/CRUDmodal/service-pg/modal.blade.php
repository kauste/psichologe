<div class="modal-box service--modal--box">
    <div class="modal --modal">
        <div class="heading-box">
            <div class="first-line">
                <h2>Paslaugos</h2>
                <div class="add-back-btns">
                    <svg class="add-btn add--btn">
                        <use xlink:href="#plus"></use>
                    </svg>
                    <svg class="back-btn back--btn">
                        <use xlink:href="#back"></use>
                    </svg>
                </div>
            </div>
            <div class="message --message"></div>
        </div>
        <div class="modal-ul-box ul--box">
            <ul class="service-ul --service">
                @forelse ($services as $service)
                <li class="one-service" id="service-edit-{{$service->id}}" data-priority="{{$service->priority}}">
                    <div class="service the--service">{{$service->service_title}}</div>
                    <div class="service-types service--types" style="padding: 0px">
                        <ul>
                            @forelse ($service->serviceTypes ?? [] as $key => $oneService)
                            <li data-service-type-id="{{$oneService->id}}" style="padding:0px;">
                                <div class="svg-box delete-svg-box delete--service--type--svg" style="display:none">
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
                </li>
                @empty
                <div>Šiuo metu duomenys neprieinami</div>
                @endforelse
            </ul>

        </div>
        <div class="modal-add-box add--box">
            <form>
                <div>
                    <div class="names one-service">
                        <div>Paslauga</div>
                        <div>Paslaugos tipai</div>
                        <div>Pozicija</div>
                        <div></div>
                    </div>
                    <div class="form --form one-service">
                        <div class="service --var" data-name="service_title" contenteditable="true"></div>
                        <div class="add-service-type-box">
                            <div class="service-types">
                                <ul class="added-types var--list" data-name="service_types">
                                </ul>
                                <div class="add-service-type add--service--type">
                                    <svg class="add-btn-in">
                                        <use xlink:href="#plus"></use>
                                    </svg>
                                    <input type="text" class="new--service--type">
                                </div>
                            </div>
                        </div>
                        <div class="--priority" contenteditable="true"></div>
                        <div class="update-actions store--actions">
                            <button class="cancel-btn --cancel" type="button">Atšaukti</button>
                            <button class="update-btn --store" type="button">Sukurti</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
