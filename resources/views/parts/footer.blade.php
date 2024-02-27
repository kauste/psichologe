<footer>
    <div class="content-box">
        <div class="content">
            {{-- <div class="left">

            </div> --}}
            <div class="left">
                <h5>Susisiekite!</h5>
                <div class="--contacts">
                <div style="display:block" class="tel-desktop">&#43;370 {{substr($contacts->telephone_number, 0, 3)}} {{substr($contacts->telephone_number, 2, 5)}}</div>
                <a style="display:none" class="tel-mobile" href="tel:+370{{str_replace([' ', '-'], '', $contacts->telephone_number)}}" target="_blank">&#43;370 {{substr($contacts->telephone_number, 0, 3)}} {{substr($contacts->telephone_number, 2, 5)}}</a>
                <a class="mail" href="mailto:{{$contacts->email}}?subject=Mail from site">{{$contacts->email}}</a>
                </div>
                <div class="media">
                    @if($contacts->facebook)
                    <a class="round-button electric" href="{{$contacts->facebook}}" target="_blank">
                        <svg>
                            <use xlink:href="#fb"></use>
                        </svg>
                    </a>
                    @endif
                    @if($contacts->linkedin)
                    <a a class="round-button electric" href="{{$contacts->linkedin}}" target="_blank">
                        <svg>
                            <use xlink:href="#linkedin"></use>
                        </svg>
                    </a>
                    @endif
                </div>
            </div>
            <div class="right footer--nav">
                <ul>
                    <li>
                        <a href="{{route('first-page')}}" class="{{isset($pageName) && $pageName === 'firstPage' ? 'active' : ''}}">Apie mane</a>
                    </li>
                    <li>
                        <a href="#">Paslaugos</a>
                    </li>
                    <li>
                        <a href="#">Kontaktai</a>
                    </li>
                    <li>
                        <a href="#">Registracija</a>
                    </li>
                    <li>
                        <a href="{{route('articles-list')}}" class="{{isset($pageName) && $pageName === 'articlesList' ? 'active' : ''}}">Straipsniai</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <a href="#" class="round-button electric lardge up">
        <svg class="chevron chevron-up">
            <use xlink:href="#chevron"></use>
        </svg>
    </a>
</footer>
