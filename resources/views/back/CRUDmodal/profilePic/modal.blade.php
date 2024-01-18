<div class="modal-box profilePic--modal--box">
    <div class="modal --modal">
        <div class="heading-box">
            <div class="first-line">
                <h2>Profilio nuotraukos</h2>
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
            <ul class="profile-pic-ul --profilePic">
                @forelse ($data->images as $image)
                <li class="one-profile-pic" id="profilePic-edit-{{$image->id}}">
                    <div class="img-box profilePic--img">
                        <img style="object-position:0 {{$image->object_y_pos_percent}}%" src="{{asset('/images/' .  $image->picture_path) }}" alt="image" />
                        <span class="line --line"></span>
                    </div>
                    <div class="priority-box">
                        @if($image->priority)
                        <div class="--priority priority">{{$image->priority}}</div>
                        @else
                        <div class="--priority priority">nesvarbu</div>
                        @endif
                    </div>
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
                <div class="form --form">
                    <div class="add-img add--img">
                        <div class="is--right--radios">
                            <div>Veidas dešinėje:</div>
                            <div>
                                <input type="radio" id="true" name="is_right" value="1" checked>
                                <label for="true">Taip</label>
                            </div>
                            <div>
                                <input type="radio" id="false" name="is_right" value="0">
                                <label for="false">Ne</label>
                            </div>
                        </div>
                        <div class="img-input-box">
                            <div class="file-input-box file--input--box">
                                <input id="profile-pic" type="file" name="picture" accept="image/*" />
                                <span class='button'>Pasirinkite</span>
                                <span class="label" for="brand-pic" data-js-label>Nuotrauka nepasirinkta</span>
                            </div>
                            <div class="img-box create--profilePic--img">
                                <img id="output" style="object-position:0 0" alt="image" />
                                <span class="line --line"></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="store-actions store--actions">
                    <button class="cancel-btn --cancel" type="button">Atšaukti</button>
                    <button class="update-btn --store" type="button">Sukurti</button>
                </div>
            </form>
        </div>
    </div>
</div>
