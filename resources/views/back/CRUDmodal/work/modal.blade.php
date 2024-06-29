<div class="modal-box work--modal--box">
    <div class="modal --modal">
        <div class="heading-box">
            <div class="first-line">
                <h2>Darbo patirtis</h2>
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
        <div class="modal-items-box">
            <ul class="items--parent">
                @forelse ($data->works as $work)
                <li class="one-item one-work one--item" data-id="{{$work->id}}" data-priority="{{$work->priority}}">
                    <div class="data --data">
                        <div class="var --var" data-name="date" contenteditable="false">{{$work->date}}</div>
                        <div class="var --var" data-name="about" contenteditable="false">{{$work->about}}</div>
                        <div class="var last --var {{$work->priority && $work->priority > 0 ? '' : 'small'}}" data-name="priority" contenteditable="false">{{$work->priority && $work->priority > 0 ? $work->priority : ' nesvarbu'}}</div>
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
                    <div class="names one-work">
                        <div class="data">
                            <div>Datos</div>
                            <div>Darbas</div>
                            <div>Eil. nr.</div>
                        </div>
                    </div>
                    <div class="form --form one-work one-item create">
                        <div class="data --data">
                            <div class="var --var" data-name="date" contenteditable="true"></div>
                            <div class="var --var" data-name="about" contenteditable="true"></div>
                            <div class="var last --var" data-name="priority" contenteditable="true"></div>
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
