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
            <ul class="--service">
                @forelse ($services as $service)
                <li class="one-item one-service one--item" id="service-edit-{{$service->id}}" data-priority="{{$service->priority}}">
                    <div class="data --data">
                        <div class="var --var" data-name="service_title" contenteditable="false">{{$service->service_title}}</div>
                        <div class="var list-input-box list--box">
                            <ul data-name="service_type">
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
                        <div class="var last --last --priority {{$service->priority && $service->priority > 0 ? '' : 'small'}}" contenteditable="false">{{$service->priority && $service->priority > 0 ? $service->priority : ' nesvarbu'}}</div>
                    </div>
                    <div class="--actions">
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
                </li>
                @empty
                <div>Šiuo metu duomenys neprieinami</div>
                @endforelse
            </ul>

        </div>
        <div class="modal-add-box">
            <form>
                <div>
                    <div class="names one-service">
                        <div class="data">
                            <div>Paslauga</div>
                            <div>Paslaugos tipai</div>
                            <div>Pozicija</div>
                        </div>
                    </div>
                    <div class="form --form one-service one-item create">
                        <div class="data --data">
                            <div class="var --var" data-name="service_title" contenteditable="true"></div>
                            <div class="var list-input-box list--box">
                                <ul data-name="service_types">
                                </ul>
                                <div class="input-box">
                                    <svg class="add-btn-in --button">
                                        <use xlink:href="#plus"></use>
                                    </svg>
                                    <input type="text">
                                </div>
                            </div>
                            <div class="var last --priority" contenteditable="true"></div>
                        </div>
                        <div class="store-actions store--actions">
                            <button class="cancel-btn --cancel" type="button">Atšaukti</button>
                            <button class="store-btn --store" type="button">Sukurti</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
