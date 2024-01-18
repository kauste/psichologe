<div class="date --date">{{$edu->date}}</div>
<div class="about --about">{{$edu->about_education}}</div>
<div class="position --priority {{$edu->priority && $edu->priority > 0 ? '' : 'small'}}">{{$edu->priority && $edu->priority > 0 ? $edu->priority : ' nesvarbu'}}</div>
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
