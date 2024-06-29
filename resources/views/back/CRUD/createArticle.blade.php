@extends('layouts.appBack')
@section('content')
<div class="article--create article-create">
    <section id="article">
        <div class="form-box">
            <div class="heading-box">
                <div class="first-line">
                    <h2>Pridėkite naują straipsnį</h2>
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
                <div class="data --data">
                    <div class="with-error-box">
                        <div class="title-box">
                            <label>Pavadinimas</label>
                            <input class="title --var" data-name="title">
                        </div>
                        <div class="error --error title--error"></div>
                    </div>
                    <div class="with-error-box">
                        <div class="text-box">
                            <label>Straipsnis</label>
                            <textarea class="article-text --var" data-name="article"></textarea>
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
                                    <div class="img-data-box img--data--box">
                                        <div class="img-position-box">
                                            <label>Paragrafas prieš</label>
                                            <input type="number" data-name="img_position_{{$img}}" class="img-position --var">
                                        </div>
                                        <div class="img-author-box">
                                            <label>Nuotraukos autorius</label>
                                            <input data-name="img_author_{{$img}}" class="img-author --var">
                                        </div>
                                        <div class="extra-data-box">
                                            <label>Papildoma informacija</label>
                                            <textarea data-name="extra_data_{{$img}}" class="extra-data-textarea --var"></textarea>
                                        </div>
                                        <div class="img-box img--box">
                                            <img src="{{ session('img_'. $img .'_data') ? session('img_'. $img .'_data')['asset'] : ''}}" atl="article image" style="object-position:0 0">
                                        </div>
                                    </div>
                                    <div class="file-input-box file--input--box" style="{{session('img_'. $img .'_data') ? 'display:none' : 'display:flex'}}">
                                        <input type="file" class="--var" data-name="img_{{$img}}" id="article_{{$img}}" accept="image/*" />
                                        <span class='button grey-button'>Choose</span>
                                        <span class="label" for="article_img_{{$img}}" data-js-label>Nuotrauka nepasirinkta.</span>
                                        <input class="object--position --var" type="hidden" data-name="object_position_{{$img}}" value="">
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
                            <input data-name="youtube" class="youtube --var">
                        </div>
                        <div class="error --error youtube--error"></div>
                    </div>
                    <div class="link-box">
                        <div class="with-error-box">
                            <div class="link">
                                <label>Spauda&nbsp;(nuoroda)</label>
                                <input data-name="link" class="link --var">
                            </div>
                            <div class="error --error link--error"></div>
                        </div>
                        <div class="with-error-box">
                            <div class="title">
                                <label>Spauda&nbsp;(pavadinimas)</label>
                                <input data-name="link_title" class="link-title --var" placeholder="Skaityti spaudoje">
                            </div>
                            <div class="error --error link--title--error"></div>
                        </div>
                    </div>
                    <div class="with-error-box">
                        <div class="list-input-box">
                            <label for="article-tags">Tagai</label>
                            <div class="list-input-box list--box">
                                <ul data-name="added_tags"></ul>
                                <div class="input-box select--box">
                                        <svg class=" add-btn-in --button">
                                            <use xlink:href="#plus"></use>
                                        </svg>
                                    <select id="article-tags">
                                        @foreach($tags ?? [] as $tag)
                                        <option value="{{$tag->id}}">{{$tag->tag}}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="error --error tags--error"></div>
                    </div>
                </div>
                <div class="store-actions store--actions">
                    <a class="cancel-btn --cancel">Atšaukti</a>
                    <button class="store-btn --store" type="button">Sukurti</button>
                </div>
            </div>
        </div>
    </section>
</div>
@endsection
