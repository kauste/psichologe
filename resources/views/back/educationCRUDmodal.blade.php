<div class="modal-box --education">
    <div class="modal --modal">
        <div class="heading-box">
            <h2>Išsilavinimas/Kursai</h2>
            <div class="add-back-btns">
                <svg class="add-btn add--btn">
                    <use xlink:href="#plus"></use>
                </svg>
                <svg class="back-btn back--btn">
                    <use xlink:href="#back"></use>
                </svg>
            </div>
        </div>
        <div class="modal-ul-box ul--box">
            <ul class="education-ul">
            @forelse ($data->educations as $edu)
                <li class="one-education" id="education-edit-{{$edu->id}}">
                    <div class="date education--date">{{$edu->date}}</div>
                    <div class="about education--about">{{$edu->about_education}}</div>
                    {{-- butu galima visai paziureti, kad nerasytu man skaiciu nereikalingu --}}
                    <div class="position --priority {{$edu->priority && $edu->priority > 0 ? '' : 'small'}}">{{$edu->priority && $edu->priority > 0 ? $edu->priority : ' nesvarbu'}}</div>
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
                </li>
            @empty
                <div>Šiuo metu duomenys neprieinami</div>
            @endforelse
            </ul>
        </div>
        <div class="modal-add-box add--box">
            <div class="names">
                <div>Datos</div>
                <div>Išsilavinimas</div>
                <div>Eil. nr.</div>
            </div>
            <div class="form --form">
                <div class="date education--date" contenteditable="true"></div>
                <div class="about education--about" contenteditable="true"></div>
                {{-- butu galima visai paziureti, kad nerasytu man skaiciu nereikalingu --}}
                <div class="position --priority" contenteditable="true"></div>
                <div class="update-actions store--actions">
                    <button class="cancel-btn --cancel" type="button">Atšaukti</button>
                    <button class="update-btn --store" type="button">Sukurti</button>
                </div>
            </div>
        </div>
    </div>
</div>