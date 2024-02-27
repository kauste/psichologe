<div class="modal-box tagsNav--modal--box">
    <div class="modal --modal">
        <div class="heading-box">
            <div class="first-line">
                <h2>Straipsnių tagai</h2>
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
            <ul class="tags-nav-ul --tagsNav">
                @forelse ($tags->tags as $tag)
                <li class="one-tag" id="tagsNav-edit-{{$tag->id}}" data-priority="{{$tag->priority}}">
                    <div class="tag --tag">{{$tag->tag}}</div>
                    <div class="articles --articles" style="padding: 0px">
                        <ul>
                            @forelse ($tag->articles as $key => $article)
                            <li data-article-id="{{$article->id}}" data-priority={{$article->priority ?? null}} style="padding-bottom:0px; {{$key === 0 ? 'padding-top:0px' : ''}}">
                                <div class="svg-box delete-svg-box delete--article--svg" style="display:none">
                                    <svg class="delete-svg">
                                        <use xlink:href="#delete"></use>
                                    </svg>
                                </div>
                                <div>{{$article->title}}</div>
                            </li>
                            @empty
                            <li></li>
                            @endforelse
                        </ul>

                        <div class="add-article add--article" style="display:none">
                            <div>
                                <svg class="add-btn-in">
                                    <use xlink:href="#plus"></use>
                                </svg>
                            </div>
                            <select>
                                @foreach($articles ?? [] as $article)
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
                </li>
                @empty
                <div>Šiuo metu duomenys neprieinami</div>
                @endforelse
            </ul>

        </div>
        <div class="modal-add-box add--box">
            <form>
                <div>
                    <div class="one-tagsNav names">
                        <div>Tagas</div>
                        <div>Prioritetas</div>
                        <div></div>
                    </div>
                    <div class="form --form one-tagsNav">
                        <div class="tag --tag" contenteditable="true"></div>
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
