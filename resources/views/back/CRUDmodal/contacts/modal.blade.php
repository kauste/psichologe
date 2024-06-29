<div class="modal-box contact--modal--box">
    <div class="modal --modal">
        <div class="heading-box">
            <div class="first-line">
                <h2>Kontaktai</h2>
            </div>
            <div class="message --message"></div>
        </div>
        <div class="modal-items-box">
            <div class="items--parent">
                <div class="one-item one-contact one--item" data-id="{{$contacts->id ?? 0}}">
                    <div class=" data --data">
                        <div class="--var var" data-name="adress" contenteditable="true" placeholder="Adresas">{{$contacts->adress ?? ''}}</div>
                        <div class="--var var" data-name="city" contenteditable="true" placeholder="Miestas">{{$contacts->city ?? ''}}</div>
                        <div class="--var var" data-name="telephone_number" contenteditable="true" placeholder="Telefono numeris">{{$contacts->telephone_number ?? ''}}</div>
                        <div class="--var var" data-name="email" contenteditable="true" placeholder="Elektroninis paštas">{{$contacts->email ?? ''}}</div>
                        <div class="link --var var" data-name="linkedin" contenteditable="true" placeholder="Asmeninio linkedin puslapio nuoroda">{{$contacts->linkedin ?? ''}}</div>
                        <div class="link --var var" data-name="facebook" contenteditable="true" placeholder="Asmeninio facebook puslapio nuoroda">{{$contacts->facebook ?? ''}}</div>
                        <div class="link --var var" data-name="map_link" contenteditable="true" placeholder="Asmeninio facebook puslapio nuoroda">{{$contacts->map_link ?? ''}}</div>
                        <div class="var image">
                            <div class="img-input-delete input--delete--box">
                                <div class="svg-box --delete">
                                    <svg class="delete-svg">
                                        <use xlink:href="#delete"></use>
                                    </svg>
                                </div>
                                <div class="img-input-box --images">
                                    <div class="img-data-box img--data--box" style="{{$contacts->map ? 'display:block' : 'display:none'}}">
                                        <div class="img-box img--box">
                                            <img src="{{ $contacts->map ? asset('images/' . $contacts->map) : ''}}" atl="article image" style="object-position:0 0">
                                        </div>
                                    </div>
                                    <div class="file-input-box file--input--box" style="{{$contacts->map ? 'display:none' : 'display:flex'}}">
                                        <input type="file" class="--var" data-name="map" id="map" accept="image/*" value="{{$contacts->map}}" />
                                        <span class='button grey-button'>Choose</span>
                                        <span class="label" for="map" data-js-label>Nuotrauka nepasirinkta.</span>
                                        <input class="object--position --var" type="hidden" data-name="object_position_{{$contacts->map}}" value="">
                                        <input class="--old --var" type="hidden" data-name="old_map" value="{{$contacts->map ? true : false}}">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="update-actions update--actions" style="display:flex">
                        <button class="cancel-btn --cancel" type="button">Atšaukti</button>
                        <button class="update-btn --update" type="button">Redaguoti</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
