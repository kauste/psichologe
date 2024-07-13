@extends('layouts.appBack')
@section('content')
@inject('tags', 'App\Services\ArticlesTags')
@include('back.CRUDmodal.tags-nav.modal')

<div class="articles--page articles-list">
    <div id="tagsNav" class="tags-nav-box">
        <div class="edit-svg-box --edit">
            <svg>
                <use xlink:href="#edit"></use>
            </svg>
        </div>
        <div class="tags-nav-box">
            <div class="tags-nav-box tags--nav--box">
                <div class="chevron-svg-box toggle--btn">
                    <svg class="chevron-svg">
                        <use xlink:href="#chevron"></use>
                    </svg>
                </div>
                <ul class="tags-nav items--parent">
                    <li>
                        <a href="{{route('back-articles-list')}}" class="active">All</a>
                    </li>
                    @foreach ($tags->tags as $tag)
                    <li data-id="{{$tag->id}}" class="one-tagsNav one--item" data-priority="{{$tag->priority}}">
                        <a class="--var" data-name="tag" href="{{url()->current() . '?filter=' .$tag->id}}">{{$tag->tag}}</a>
                    </li>
                    @endforeach
                </ul>
            </div>
        </div>
    </div>
    <section id="articles" class="articles-sec">
        <div class="articles-box">
            <div class="add-back-btns">
                <a href="{{route('back-article-create')}}">
                    <svg class="add-btn add--btn">
                        <use xlink:href="#plus"></use>
                    </svg>
                </a>
            </div>
            @foreach ($articles ?? [] as $article)
            <form action="{{route('back-article-delete', $article->id)}}" method="post" class="article-delete-box one-item one--item">
                <a class=" article-box" href="{{route('back-article-page', $article->url)}}">
                    <div class="title-box">
                        <span class="title">{{$article->title}}</span>
                    </div>
                    <div class="article">{{$article->article[0]}}</div>
                </a>
                <div>
                    <div class="edit--actions edit-actions">
                        <div class="svg-box --delete">
                            <svg class="delete-svg">
                                <use xlink:href="#delete"></use>
                            </svg>
                        </div>
                    </div>
                    <div class="delete-actions delete--actions">
                        <button class="cancel-btn --cancel" type="button">Atšaukti</button>
                        @csrf
                        @method('delete')
                        <button class="delete-btn" type="submit">Ištrinti</button>
                    </div>
                </div>
            </form>
            @endforeach
        </div>
        @include('parts.paginator')
    </section>
</div>
@endsection
