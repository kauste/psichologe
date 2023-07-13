@extends('layouts.app')

@section('content')
<div class="page--1 back--office back-ofice">
{{-- @include('back.educationCRUDmodal')
@include('back.workCRUDmodal') --}}
@include('back.CRUDmodal.modal')


    <section id="profilePic" class="section-1-box" >
        <div class="section-1 section--1">
            <div class="ul--box ul-box">

                <ul class="profile-pic-ul --profilePic">
                <div class="edit-svg-box --edit">
                    <svg>
                        <use xlink:href="#edit"></use>
                    </svg>
                </div>
                @forelse ($data->images as $key => $image)
                    <li class="one-profile-pic" id="profilePic-{{$image->id}}" style="opacity:{{$key === 0 ? '1' : '0'}}">
                        <img class="{{$image->is_right ? 'right' : 'left'}}"  src="{{asset('/images/' . $image->picture_path) }}" alt="psichologe Alytuje Romalda Stasioniene"/>
                    </li>
                @empty
                    <li class="one-profile-pic" id="profilePic-1">
                        <img class="right" style="opacity:1" src="./../images/psichologe_alytuje_1.webp" alt="psichologe Alytuje Romalda Stasioniene"/>
                    </li>
                @endforelse
                </ul>
                <div class="h1">Psichologė Alytuje <div>Romalda Stasionienė</div>
            </div>
        </div>
    </section>
    <section class="section-2 section--2">
        <div class="in-sec-2">
            <div class="edit-svg-box --edit">
                <svg>
                    <use xlink:href="#edit"></use>
                </svg>
            </div>
            <div class="heading-box --heading">
                <h2>Apie mane</h2>
            </div>
            <div class="--paragraph paragraph">
                <p >{{$data->about_me}}</p>
                <div class="update-actions update--actions">
                    <button class="cancel-btn --cancel" type="button">Atšaukti</button>
                    <button class="update-btn --update" type="button">Redaguoti</button>
                </div>
            </div>

            <svg class="bamboo --bamboo"> 
                <use xlink:href="#bamboo"></use>
            </svg>
        </div>
    </section>
    <section id="education" class="section-3 section--3 --education">
        <div class="education-box">
            <div class="edit-svg-box --edit">
                <svg>
                    <use xlink:href="#edit"></use>
                </svg>
            </div>
            <div class="heading-box">
                <h2>Išsilavinimas/Kursai</h2>
            </div>
            <div class="edu-chevron-box">
                <div class="chevron-box ch--up disabled">
                    <svg class="chevron chevron-up">
                        <use xlink:href="#chevron"></use>
                    </svg>
                </div>
                <div class="chevron-box ch--down">
                    <svg class="chevron chevron-down">
                        <use xlink:href="#chevron"></use>
                    </svg>
                </div>
                <div class="edu-ul-box ul--box">
                    <ul class="education-ul">
                    @forelse ($data->educations as $edu)
                        <li class="one-education" id="education-{{$edu->id}}">
                            <div class="date education--date">{{$edu->date}}</div>
                            <div class="about-edu education--about">{{$edu->about_education}}</div>
                        </li>
                    @empty
                        <div>Šiuo metu duomenys neprieinami</div>
                    @endforelse
                    </ul>
                </div>
            </div>
        </div>
    </section>
    <section id="work" class="section-4 section--4 --work">
        <div class="work-box">
            <div class="edit-svg-box --edit">
                <svg>
                    <use xlink:href="#edit"></use>
                </svg>
            </div>
            <div class="heading-box">
                <h2>Darbo patirtis</h2>
            </div>
            <div class="work-chevron-box">
                <div class="chevron-box disabled ch--up">
                    <svg class="chevron chevron-up">
                        <use xlink:href="#chevron"></use>
                    </svg>
                </div>
                <div class="chevron-box ch--down">
                    <svg class="chevron chevron-down">
                        <use xlink:href="#chevron"></use>
                    </svg>
                </div>
                <div class="work-ul-box ul--box">
                    <ul class="work-ul">
                    @forelse ($data->works as $key => $work)
                        <li class="one-work" id="work-{{$work->id}}">
                            <div class="date work--date">{{$work->date}}</div>
                            <div class="about-work work--about">{{$work->about_work}}</div>
                        </li>
                    @empty
                        <div>Šiuo metu duomenys neprieinami</div>
                    @endforelse
                    </ul>
                </div>
            </div>
        </div>
    </section>
</div>
@endsection