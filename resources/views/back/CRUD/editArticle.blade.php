@extends('layouts.appBack')
@section('content')
<div class="article--edit article-edit">
    <section id="article">
        <div class="form-box">
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
            <div class="form one--item" data-id="{{$article->id}}">
                <div class="data --data">
                    <div class="with-error-box">
                        <div class="title-box">
                            <label>Pavadinimas</label>
                            <input class="title --var" data-name="title" value="{{$article->title}}">
                        </div>
                        <div class="error --error title--error"></div>
                    </div>
                    <div class="with-error-box">
                        <div class="text-box">
                            <label>Straipsnis</label>
                            <textarea class="article-text --var" data-name="article">{{ implode("\n", $article->article )}}</textarea>
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
                                            <input type="number" data-name="img_position_{{$img}}" class="img-position --var" value="{{$article->{'img_'. $img} && isset($article->{'img_'. $img}['paragraph_before']) ? $article->{'img_'. $img}['paragraph_before'] : ''}}">
                                        </div>
                                        <div class="img-author-box">
                                            <label>Nuotraukos autorius</label>
                                            <input data-name="img_author_{{$img}}" class="img-author --var" value="{{$article->{ 'img_'. $img } && isset($article->{ 'img_'. $img }['author']) ? $article->{'img_'. $img}['author'] : ''}}">
                                        </div>
                                        <div class="extra-data-box">
                                            <label>Papildoma informacija</label>
                                            <textarea data-name="extra_data_{{$img}}" class="extra-data-textarea --var">{{$article->{'img_'. $img} && isset($article->{'img_'. $img}['extra_data']) ? $article->{'img_'. $img}['extra_data'] : ''}}</textarea>
                                        </div>
                                        <div class="img-box img--box">
                                            <img src="{{  $article->{'img_'. $img} ? asset('/images/articlesImgs/' . $article->{'img_'. $img}['path']) : null }}" atl="article image" style="object-position:0px {{$article->{'img_'. $img} && isset($article->{'img_'. $img}['object_position']) ? $article->{'img_'. $img}['object_position'] : 0}}%">
                                        </div>
                                    </div>
                                    <div class="file-input-box file--input--box" style="{{$article->{'img_'. $img} ? 'display:none' : 'display:flex'}}">
                                        <input type="file" class="--var" data-name="img_{{$img}}" id="article_{{$img}}" accept="image/*" value="{{old('img_'. $img)}}" />
                                        <span class='button grey-button'>Choose</span>
                                        <span class="label" for="article_img_{{$img}}" data-js-label>Nuotrauka nepasirinkta.</span>
                                        <input class="object--position --var " type="hidden" data-name="object_position_{{$img}}" value="{{$article->{'img_'. $img} && isset($article->{'img_'. $img}['object_position']) ? $article->{'img_'. $img}['object_position'] : ''}}">
                                        <input class="--old --var" type="hidden" data-name="img_old_{{$img}}" value="{{$article->{ 'img_'. $img} ? true : false}}">
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
                            <input data-name="youtube" class="youtube" value="{{$article->youtube ? 'https://www.youtube.com/watch?v=' . $article->youtube : ''}}">
                        </div>
                        <div class="error --error youtube--error"></div>
                    </div>
                    <div class="link-box">
                        <div class="with-error-box">
                            <div class="link">
                                <label>Spauda&nbsp;(nuoroda)</label>
                                <input data-name="link" class="link --link" value="{{$article->link ? $article->link['link'] : ''}}">
                            </div>
                            <div class="error --error link--error"></div>
                        </div>
                        <div class="with-error-box">
                            <div class="title">
                                <label>Spauda&nbsp;(pavadinimas)</label>
                                <input data-name="link_title" class="link-title --var" value="{{$article->link ? $article->link['title'] : ''}}" placeholder="Skaityti spaudoje">
                            </div>
                            <div class="error --error link--title--error"></div>
                        </div>
                    </div>
                    <div class="with-error-box">
                        <div class="list-input-box">
                            <label for="article-tags">Tagai</label>
                            <div class="list-input-box list--box">
                                <ul data-name="added_tags">
                                    @foreach ($article->tags ?? [] as $tag)
                                    <li>
                                        <div class="svg-box delete-svg delete--item">
                                            <svg class="delete-svg">
                                                <use xlink:href="#delete"></use>
                                            </svg>
                                        </div>
                                        <div class="--value" style="display:none">{{$tag->id}}</div>
                                        <div class="--tag inner--text">{{$tag->tag}}</div>
                                    </li>
                                    @endforeach
                                </ul>
                                <div class="input-box select--box" style="{{count($tagsForSelect) === 0 ? 'display:none' : 'display:flex'}}">
                                    <svg class=" add-btn-in --button">
                                        <use xlink:href="#plus"></use>
                                    </svg>
                                    <select id="article-tags">
                                        @foreach($tagsForSelect ?? [] as $tag)
                                        <option value="{{$tag->id}}">{{$tag->tag}}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="error --error tags--error"></div>
                    </div>
                </div>
                <div class="update-actions update--actions">
                    <button class="cancel-btn --cancel">Atšaukti</button>
                    <button class="update-btn --update" type="button">Redaguoti</button>
                </div>
            </div>
        </div>
    </section>
</div>
@endsection
