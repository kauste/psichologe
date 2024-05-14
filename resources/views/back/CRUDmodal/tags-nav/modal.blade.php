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
                <li class="one-item one-tagsNav one--item" id="tagsNav-edit-{{$tag->id}}" data-priority="{{$tag->priority}}">
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
                        <div class="var last position --priority {{$tag->priority && $tag->priority > 0 ? '' : 'small'}}">{{$tag->priority && $tag->priority > 0 ? $tag->priority : ' nesvarbu'}}</div>
                    </div>
                    <div class="--actions">
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
                    <div class="one-tagsNav names">
                        <div class="data">
                            <div>Tagas</div>
                            <div>Straipsniai</div>
                            <div>Prioritetas</div>
                        </div>
                    </div>
                    <div class="form --form one-tagsNav one-item create">
                        <div class="data --data">
                            <div class="var --var" data-name="tag" contenteditable="true"></div>
                            <div class="var list-input-box list--box">
                                <ul data-name="articles"></ul>
                                <div class="input-box">
                                    <svg class="add-btn-in --button">
                                        <use xlink:href="#plus"></use>
                                    </svg>
                                    <select>
                                        @foreach($allArticles ?? [] as $article)
                                        <option value="{{$article->id}}">{{$article->title}}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>
                            <div class="var last --priority" contenteditable="true"></div>
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
