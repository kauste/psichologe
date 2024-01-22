<footer>
    <div class="content-box">
        <div class="content">
            <div class="left">
                <h5>Susisiekite!</h5>
                <div>&#43;370 {{substr($contacts->telephone_number, 0, 3)}} {{substr($contacts->telephone_number, 2, 5)}}</div>
                <a href="mailto:{{$contacts->email}}?subject=Mail from site">{{$contacts->email}}</a>
            </div>
            <div class="middle">
                <a href="#" class="active">Apie mane</a>
                <a href="#">Straipsniai</a>
                <a href="#">Kontaktai</a>
            </div>
            <div class="right">
                @if($contacts->facebook)
                <a href="{{$contacts->facebook}}" target="_blank">
                    <svg>
                        <use xlink:href="#fb"></use>
                    </svg>
                </a>
                @endif
                @if($contacts->linkedin)
                <a href="{{$contacts->linkedin}}" target="_blank">
                    <svg>
                        <use xlink:href="#linkedin"></use>
                    </svg>
                </a>
                @endif
            </div>
        </div>
    </div>
</footer>