<div class="data --data">
    <div class="var --var" data-name="tag" contenteditable="false">{{$tag->tag}}</div>
    <div class="var list-input-box list--box">
        <ul data-name="articles">
            @foreach ($tag->articles ?? [] as $key => $article)
            <li data-id="{{$article->id}}">
                <div class="svg-box delete-svg delete--item">
                    <svg class="delete-svg ">
                        <use xlink:href="#delete"></use>
                    </svg>
                </div>
                <div class="--value" style="display:none">{{$article->id}}</div>
                <div class="inner--text">{{$article->title}}</div>
            </li>
            @endforeach
        </ul>
        <div class="input-box select--box">
            <svg class=" add-btn-in --button">
                <use xlink:href="#plus"></use>
            </svg>
            <select>
                @foreach($tag->notUsedArticles() ?? [] as $article)
                <option value="{{$article->id}}">{{$article->title}}</option>
                @endforeach
            </select>
        </div>
    </div>
    <div class="var last position --var {{$tag->priority && $tag->priority > 0 ? '' : 'small'}}" data-name="priority">{{$tag->priority && $tag->priority > 0 ? $tag->priority : ' nesvarbu'}}</div>
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
