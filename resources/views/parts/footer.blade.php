<footer>
    <div class="content-container">
        <div class="content-box">
            <div class="content">
                <div>
                    <h5>Susisiekite!</h5>
                    <div class="--contacts">
                        <div style="display:block" class="tel-desktop">&#43;370 {{substr($contacts->telephone_number, 0, 3)}} {{substr($contacts->telephone_number, 2, 5)}}</div>
                        <a style="display:none" class="tel-mobile" href="tel:+370{{str_replace([' ', '-'], '', $contacts->telephone_number)}}" target="_blank">&#43;370 {{substr($contacts->telephone_number, 0, 3)}} {{substr($contacts->telephone_number, 2, 5)}}</a>
                        <a class="mail" href="mailto:{{$contacts->email}}?subject=Mail from site">{{$contacts->email}}</a>
                    </div>
                </div>
                <div class="media">
                    @if($contacts->facebook)
                    <a class="button round electric bg-grey" href="{{$contacts->facebook}}" target="_blank">
                        <svg>
                            <use xlink:href="#fb"></use>
                        </svg>
                    </a>
                    @endif
                    @if($contacts->linkedin)
                    <a class="button round electric bg-grey" href="{{$contacts->linkedin}}" target="_blank">
                        <svg>
                            <use xlink:href="#linkedin"></use>
                        </svg>
                    </a>
                    @endif
                </div>
                <div class="footer-nav footer--nav">
                    <ul>
                        <div class="nav-column">
                            <li>
                                <a href="{{route('contacts')}}" class="{{isset($pageName) && $pageName === 'contacts' ? 'active' : ''}}">Kontaktai</a>
                            </li>
                            <li>
                                <a href="{{route('services')}}" class="{{isset($pageName) && $pageName === 'services' ? 'active' : ''}}">Paslaugos</a>
                            </li>
                        </div>
                        <div class="nav-column">
                            <li>
                                <a href="{{route('first-page')}}" class="{{isset($pageName) && $pageName === 'firstPage' ? 'active' : ''}}">Apie&nbsp;mane</a>
                            </li>
                            <li>
                                <a href="{{route('articles-list')}}" class="{{isset($pageName) && $pageName === 'articles' ? 'active' : ''}}">Straipsniai</a>
                            </li>
                        </div>
                        <div class="nav-column">
                            <li>
                                <a href="{{route('registration')}}" class="{{isset($pageName) && $pageName === 'registration' ? 'active' : ''}}">Registracija</a>
                            </li>
                        </div>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <svg class="psychology-svg">
        <defs>
            <linearGradient id="gradient" x1="30%" y1="10%" x2="100%" y2="60%">
                <stop offset="0%" stop-color="#b5b3b0bc" />
            <stop offset=" 100%" stop-color="#b5b3b065" />
            </linearGradient>
        </defs>
        <defs>
            <linearGradient id="sand-gradient" x1="30%" y1="10%" x2="100%" y2="60%">
                <stop offset="0%" stop-color="#E8E3D7" />
                <stop offset=" 100%" stop-color="#f0eadd" />
            </linearGradient>
        </defs>
        <use xlink:href="#psychology"></use>
    </svg>
    <a href="#" class="button round electric bg-sand lardge up">
        <svg class="chevron chevron-up">
            <use xlink:href="#chevron"></use>
        </svg>
    </a>
</footer>
