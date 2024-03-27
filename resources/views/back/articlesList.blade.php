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
                <li id="tagsNav-{{$tag->id}}" class="one-tagsNav" data-priority="{{$tag->priority}}">
                    <a class="--tag" href="{{url()->current() . '?filter=' .$tag->id}}">{{$tag->tag}}</a>
                </li>
                @endforeach
            </ul>
        </div>
    </div>
    <section class="articles-box articles--box">
        <div class="add-back-btns">
            <a href="{{route('back-article-create')}}">
                <svg class="add-btn add--btn">
                    <use xlink:href="#plus"></use>
                </svg>
            </a>
        </div>
        @foreach ($articles ?? [] as $article)
        <form action="{{route('back-article-delete', $article->id)}}" method="post" class="article-delete-box">
            <a class="article-box" href="{{route('back-article-page', $article->url)}}">
                <div class="title-box">
                    <span class="title">{{$article->title}}</span>
                    <svg>
                        <use xlink:href="#arrow"></use>
                    </svg>
                </div>
                <div class="article">{{$article->article[0]}}</div>
            </a>
            <div>
                <div class="svg-box --delete" style="display:flex">
                    <svg class="delete-svg">
                        <use xlink:href="#delete"></use>
                    </svg>
                </div>

                <div class="delete-actions delete--actions" style="display:none">
                    <button class="cancel-btn --cancel" type="button">Atšaukti</button>
                    @csrf
                    @method('delete')
                    <button class="delete-btn do--delete" type="submit">Ištrinti</button>
                </div>
            </div>
        </form>
        @endforeach
        @include('parts.paginator')
    </section>
</div>
@endsection
