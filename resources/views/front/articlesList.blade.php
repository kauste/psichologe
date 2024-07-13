@extends('layouts.app')
@section('content')
@inject('tags', 'App\Services\ArticlesTags')
<div class="articles--page articles-list">
    <div class="tags-nav-box tags--nav--box">
        <div class="chevron-svg-box toggle--btn">
            <svg class="chevron-svg">
                <use xlink:href="#chevron"></use>
            </svg>
        </div>
        <ul class="tags-nav tags--nav">
            <li>
                <a href="{{route('articles-list')}}" class="active">All</a>
            </li>
            @foreach ($tags->tags as $tag)
            <li>
                <a href="{{url()->current() . '?filter=' .$tag->id}}">{{$tag->tag}}</a>
            </li>
            @endforeach

        </ul>
    </div>
    <section class="articles-sec">
        <div class="articles-box">
            @foreach ($articles ?? [] as $article)
            <a class="article-box" href="{{route('article-page', $article->url)}}">
                <div class="title-box">
                    <span class="title">{{$article->title}}</span>
                </div>
                <div class="article">{{$article->article[0]}}</div>
            </a>
            @endforeach
        </div>
        <div>
        @include('parts.paginator')
        </div>
    </section>
</div>
@endsection
