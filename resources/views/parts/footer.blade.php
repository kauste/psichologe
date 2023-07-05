<footer>
    <div class="content-box">
        <div class="content">
            <div class="left">
                <h5>Susisiekite!</h5>
                <div>&#43;370 {{substr($data->telephone_number, 0, 3)}} {{substr($data->telephone_number, 2, 5)}}</div>
                <a href="mailto:{{$data->email}}?subject=Mail from site">{{$data->email}}</a>
            </div>
            <div class="right">
                @if($data->facebook)
                <a href="{{$data->facebook}}" target="_blank">
                    <svg>
                        <use xlink:href="#fb"></use>
                    </svg>
                </a>
                @endif
                @if($data->linkedin)
                <a href="{{$data->linkedin}}" target="_blank">
                    <svg>
                        <use xlink:href="#linkedin"></use>
                    </svg>
                </a>
                @endif
            </div>
        </div>
    </div>
</footer>