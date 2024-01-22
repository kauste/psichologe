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
        <div class="modal-ul-box ul--box">
            <ul class="work-ul --work">
                @forelse ($data->works as $work)
                <li class="one-work" id="work-edit-{{$work->id}}" data-priority="{{$work->priority}}">
                    <div class="date --date">{{$work->date}}</div>
                    <div class="about --about">{{$work->about}}</div>
                    <div class="position --priority {{$work->priority && $work->priority > 0 ? '' : 'small'}}">{{$work->priority && $work->priority > 0 ? $work->priority : ' nesvarbu'}}</div>
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
                    <div class="names">
                        <div>Datos</div>
                        <div>Darbas</div>
                        <div>Eil. nr.</div>
                    </div>
                    <div class="form --form one-work">
                        <div class="date --date" contenteditable="true"></div>
                        <div class="about --about" contenteditable="true"></div>
                        <div class="position --priority" contenteditable="true"></div>
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
