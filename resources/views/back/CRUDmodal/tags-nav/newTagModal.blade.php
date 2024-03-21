<div class="tag --var" data-name="tag">{{$tag->tag}}</div>
<div class="articles list--box" style="padding: 0px">
    <ul class="var--list" data-name="articles">
        @forelse ($tag->articles as $key => $article)
        <li data-article-id="{{$article->id}}" data-priority="{{$article->priority ?? null}}" style="padding-bottom:0px; {{$key === 0 ? 'padding-top:0px' : ''}}">
            <div class="svg-box delete-svg-box delete--item" style="display:none">
                <svg class="delete-svg">
                    <use xlink:href="#delete"></use>
                </svg>
            </div>
            <div class="--value" style="display:none">{{$article->id}}</div>

            <div class="inner--text">{{$article->title}}</div>
        </li>
        @empty
        <li></li>
        @endforelse
    </ul>
    <div class="add-article select--box" style="display:none">
        <div>
            <svg class="add-btn-in --button">
                <use xlink:href="#plus"></use>
            </svg>
        </div>
        <select>
            @foreach($tag->notUsedArticles() ?? [] as $article)
            <option value="{{$article->id}}">{{$article->title}}</option>
            @endforeach
        </select>
    </div>
</div>
<div class="position --priority {{$tag->priority && $tag->priority > 0 ? '' : 'small'}}">{{$tag->priority && $tag->priority > 0 ? $tag->priority : ' nesvarbu'}}</div>
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
