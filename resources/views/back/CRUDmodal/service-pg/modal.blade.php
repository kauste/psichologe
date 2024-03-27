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
                    <div class="service --var" data-name="service_title">{{$service->service_title}}</div>
                    <div class="service-types list--box" style="padding: 0px">
                        <ul class="added--list" data-name="service_type">
                            @forelse ($service->serviceTypes ?? [] as $key => $oneService)
                            <li data-item-id="{{$oneService->id}}" style="padding:0px;">
                                <div class="svg-box delete-svg-box delete--item" style="display:none">
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
                        <div class="add-service-type input--box" style="display:none">
                            <svg class="add-btn-in --button">
                                <use xlink:href="#plus"></use>
                            </svg>
                            <input type="text"/>
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
                            <div class="service-types list--box">
                                <ul class="added-types added--list" data-name="service_types">
                                </ul>
                                <div class="add-service-type input--box">
                                    <svg class="add-btn-in --button">
                                        <use xlink:href="#plus"></use>
                                    </svg>
                                    <input type="text">
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
