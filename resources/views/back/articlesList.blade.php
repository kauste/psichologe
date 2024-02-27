@extends('layouts.appBack')
@section('content')
@inject('tags', 'App\Services\ArticlesTags')
@include('back.CRUDmodal.tags-nav.modal')

<div class="articles--page articles-list">
    <div id="tagsNav" class="tags-nav-box ul--box">
        <div class="edit-svg-box --edit">
            <svg>
                <use xlink:href="#edit"></use>
            </svg>
        </div>
        <div class="tags-nav tags--nav">
            <li>
                <a href="{{route('back-articles-list')}}" class="active">All</a>
            </li>
            <ul class="tags-list tags--list">
                @foreach ($tags->tags as $tag)
                <li id="tagsNav-{{$tag->id}}" data-priority="{{$tag->priority}}">
                    <a class="--tag" href="{{url()->current() . '?filter=' .$tag->id}}">{{$tag->tag}}</a>
                </li>
                @endforeach
            </ul>
        </div>
    </div>

    <section class="articles-box">
        <div class="add-back-btns">
            <a href="{{route('back-article-create')}}">
                <svg class="add-btn add--btn">
                    <use xlink:href="#plus"></use>
                </svg>
            </a>
        </div>
        @foreach ($articles ?? [] as $article)
        <a class="article-box" href="{{route('back-article-page', $article)}}">
            <div class="title-box">
                <span class="title">{{$article->title}}</span>
                <svg>
                    <use xlink:href="#arrow"></use>
                </svg>
            </div>
            <div class="article">{{$article->article[0]}}</div>
        </a>
        @endforeach
        @include('parts.paginator')
    </section>
</div>
@endsection
