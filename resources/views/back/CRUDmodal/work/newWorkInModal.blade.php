<div class="data --data">
    <div class="var --var" data-name="date" contenteditable="false">{{$work->date}}</div>
    <div class="var --var" data-name="about" contenteditable="false">{{$work->about}}</div>
    <div class="var last --var {{$work->priority && $work->priority > 0 ? '' : 'small'}}" data-name="priority" contenteditable="false">{{$work->priority && $work->priority > 0 ? $work->priority : ' nesvarbu'}}</div>
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
