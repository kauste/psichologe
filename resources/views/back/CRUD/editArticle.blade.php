@extends('layouts.appBack')
@section('content')
<div class="article--edit article-edit">
    <div class="form-box" enctype="multipart/form-data">
        <div class="heading-box">
            <div class="first-line">
                <h2>Redaguokite straipsnį</h2>
                <div class="add-back-btns">
                    <a href="{{url()->previous()}}">
                        <svg class="back-btn back--btn">
                            <use xlink:href="#back"></use>
                        </svg>
                    </a>
                </div>
            </div>
            <div class="message --message"></div>
        </div>
        <div class="form --form">
            <div class="with-error-box">
                <div class="title-box">
                    <label>Pavadinimas</label>
                    <input class="title" name="title" value="{{$article->title}}">
                </div>
                <div class="error --error title--error"></div>
            </div>
            <div class="with-error-box">
                <div class="text-box">
                    <label>Straipsnis</label>

                    <textarea class="article-text" name="article">{{ implode("\n", $article->article )}}</textarea>
                </div>
                <div class="error --error article--error"></div>
            </div>
            <div class="imgs-box imgs--box">
                @foreach (range(1, 3) as $img)
                <div class="with-error-box">
                    <div class="img-input-delete input--delete--box">
                        <div class="svg-box --delete">
                            <svg class="delete-svg">
                                <use xlink:href="#delete"></use>
                            </svg>
                        </div>
                        <div class="img-input-box --images">
                            <div class="img-data-box img--data--box" style="{{$article->{'img_'. $img} ? 'display:block' : 'display:none'}}">
                                <div class="img-position-box">
                                    <label>Paragrafas prieš</label>
                                    <input type="number" name="img_position_{{$img}}" class="img-position" value="{{$article->{'img_'. $img} && isset($article->{'img_'. $img}['paragraph_before']) ? $article->{'img_'. $img}['paragraph_before'] : ''}}">
                                </div>
                                <div class="img-author-box">
                                    <label>Nuotraukos autorius</label>
                                    <input name="img_author_{{$img}}" class="img-author" value="{{$article->{ 'img_'. $img } && isset($article->{ 'img_'. $img }['author']) ? $article->{'img_'. $img}['author'] : ''}}">
                                </div>
                                <div class="extra-data-box">
                                    <label>Papildoma informacija</label>
                                    <textarea name="extra_data_{{$img}}" class="extra-data-textarea">{{$article->{'img_'. $img} && isset($article->{'img_'. $img}['extra_data']) ? $article->{'img_'. $img}['extra_data'] : ''}}</textarea>
                                </div>
                                <div class="img-box img--box">
                                    <img src="{{  $article->{'img_'. $img} ? asset('/images/articlesImgs/' . $article->{'img_'. $img}['path']) : null }}" atl="article image" style="object-position:0px {{$article->{'img_'. $img} && isset($article->{'img_'. $img}['object_position']) ? $article->{'img_'. $img}['object_position'] : 50}}%">
                                </div>
                            </div>
                            <div class="file-input-box file--input--box" style="{{$article->{'img_'. $img} ? 'display:none' : 'display:flex'}}">
                                <input type="file" name="img_{{$img}}" id="article_{{$img}}" accept="image/*" value="{{old('img_'. $img)}}" />
                                <span class='button grey-button'>Choose</span>
                                <span class="label" for="article_img_{{$img}}" data-js-label>Nuotrauka nepasirinkta.</span>
                                <input type="hidden" name="object_position_{{$img}}" value="{{$article->{'img_'. $img} && isset($article->{'img_'. $img}['object_position']) ? $article->{'img_'. $img}['object_position'] : ''}}">
                                <input class="--old" type="hidden" name="old_img_{{$img}}" value="{{$article->{ 'img_'. $img} ? true : false}}">
                            </div>
                        </div>
                    </div>
                    <div class="error --error img_{{$img}}--error"></div>
                    <div class="error --error img_position_{{$img}}--error"></div>
                    <div class="error --error img_author_{{$img}}--error"></div>
                    <div class="error --error extra_data_{{$img}}--error"></div>
                    <div class="error --error object_position_img}}--error"></div>
                </div>
                @endforeach
            </div>
            <div class="with-error-box">
                <div class="youtube-box">
                    <label>Youtube&nbsp;nuoroda</label>
                    <input name="youtube" class="youtube" value="{{$article->youtube ? 'https://www.youtube.com/watch?v=' . $article->youtube : ''}}">
                </div>
                <div class="error --error youtube--error"></div>
            </div>
            <div class="link-box">
                <div class="with-error-box">
                    <div class="link">
                        <label>Spauda&nbsp;(nuoroda)</label>
                        <input name="link" class="link --link" value="{{$article->link ? $article->link['link'] : ''}}">
                    </div>
                    <div class="error --error link--error"></div>
                </div>
                <div class="with-error-box">
                    <div class="title">
                        <label>Spauda&nbsp;(pavadinimas)</label>
                        <input name="link_title" class="link-title link--title" value="{{$article->link ? $article->link['title'] : ''}}" placeholder="Skaityti spaudoje">
                    </div>
                    <div class="error --error link--title--error"></div>
                </div>
            </div>
            <div class="with-error-box">
                <div class="tags-box tags--box">
                    <label for="article-tags">Tagai</label>
                    <ul class="added-tags added--tags">
                        @foreach ($article->tags ?? [] as $tag)
                        <li>
                            <div class="svg-box --delete">
                                <svg class="delete-svg">
                                    <use xlink:href="#delete"></use>
                                </svg>
                            </div>
                            <div class="--tag">{{$tag->tag}}</div>
                            <input type="hidden" name="tags[]" value="{{$tag->id}}">
                        </li>
                        @endforeach
                    </ul>
                    <div class="add-article-tag add--article--tag" style="{{count($tagsForSelect) === 0 ? 'display:none' : 'display:flex'}}">
                        <div class=" add--btn">
                            <svg class=" add-btn-in">
                                <use xlink:href="#plus"></use>
                            </svg>
                        </div>
                        <select id="article-tags">
                            @foreach($tagsForSelect ?? [] as $tag)
                            <option value="{{$tag->id}}">{{$tag->tag}}</option>
                            @endforeach
                        </select>
                    </div>
                </div>
                <div class="error --error tags--error"></div>
            </div>
            <div class="update-actions update--actions">
                <button class="cancel-btn --cancel" href="{{url()->current()}}">Atšaukti</button>
                <button class="update-btn --update" type="button">Redaguoti</button>
            </div>
        </div>
    </div>
</div>
@endsection
