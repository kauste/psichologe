<div class="modal-box citation--modal--box">
    <div class="modal --modal">
        <div class="heading-box">
            <div class="first-line">
                <h2>Citatos</h2>
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
        <div class="modal-ul-box">
            <ul class="items--parent">
                @forelse ($citations as $citation)
                <li class="one-item one-citation one--item" data-id="{{$citation->id}}">
                    <div class="data --data">
                        <div class="var --var" data-name="citation" contenteditable="false">{{$citation->citation}}</div>
                        <div class="var last --var {{$citation->author ? '' : 'small'}}" data-name="author" contenteditable="false">{{$citation->author ?? ''}}</div>
                    </div>
                    <div >
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
                    <div class="names one-citation">
                        <div class="data">
                            <div>Citata</div>
                            <div>Autorius</div>
                        </div>
                    </div>
                    <div class="form --form one-citation one-item create">
                        <div class="data --data">
                            <div class="var --var" data-name="citation" contenteditable="true"></div>
                            <div class="var last --last --var" data-name="author" contenteditable="true"></div>
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
