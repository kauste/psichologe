<div class="data --data">
    <div class="var --var" data-name="citation" contenteditable="false">{{$citation->citation}}</div>
    <div class="var last --var {{$citation->author ? '' : 'small'}}" data-name="author" contenteditable="false">{{$citation->author ?? ''}}</div>
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
