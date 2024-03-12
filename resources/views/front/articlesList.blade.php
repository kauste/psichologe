@extends('layouts.app')
@section('content')
@inject('tags', 'App\Services\ArticlesTags')
<div class="articles--page articles-list">
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
    <section class="articles-box">
        @foreach ($articles ?? [] as $article)
        <a class="article-box" href="{{route('article-page', $article)}}">
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
