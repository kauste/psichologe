<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poiret+One&family=Quicksand:wght@300;400;600;700&display=swap" rel="stylesheet">


    <!-- Scripts -->
    <script>
        const editAboutRoute = "{{route('back-update-about')}}";
        const educationUpdateRoute = "{{route('back-update-education')}}";
        const workUpdateRoute = "{{route('back-update-work')}}";
        const educationStoreRoute = "{{route('back-store-education')}}";
        const workStoreRoute = "{{route('back-store-work')}}";
        const educationDeleteRoute = "{{route('back-delete-education')}}";
        const workDeleteRoute = "{{route('back-delete-work')}}";
    </script>
    @vite(['resources/sass/app.scss', 'resources/js/app.js'])
</head>
<body>
    @include('parts.loader')
    <div class="nav-box">
        <nav class="--nav">
            <a href="#" class="active">Apie mane</a>
            <a href="#">Straipsniai</a>
            <a href="#">Kontaktai</a>
        @if(Auth::user()?->role === 7)
            <a class="dropdown-item" href="{{ route('logout') }}" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                {{ __('Logout') }}
            </a>
            <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
                @csrf
            </form>
        @endif
        </nav>
    </div>
        {{-- <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
            <div class="container">
                <a class="navbar-brand" href="{{ url('/') }}">
                    {{ config('app.name', 'Laravel') }}
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <!-- Left Side Of Navbar -->
                    <ul class="navbar-nav me-auto">

                    </ul>

                    <!-- Right Side Of Navbar -->
                    <ul class="navbar-nav ms-auto">
                        <!-- Authentication Links -->
                        @guest
                            @if (Route::has('login'))
                                <li class="nav-item">
                                    <a class="nav-link" href="{{ route('login') }}">{{ __('Login') }}</a>
                                </li>
                            @endif

                            @if (Route::has('register'))
                                <li class="nav-item">
                                    <a class="nav-link" href="{{ route('register') }}">{{ __('Register') }}</a>
                                </li>
                            @endif
                        @else
                            <li class="nav-item dropdown">
                                <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                                    {{ Auth::user()->name }}
                                </a>

                                <div class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                    <a class="dropdown-item" href="{{ route('logout') }}"
                                       onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                                        {{ __('Logout') }}
                                    </a>

                                    <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
                                        @csrf
                                    </form>
                                </div>
                            </li>
                        @endguest
                    </ul>
                </div>
            </div>
        </nav> --}}

        <main class="">
            @yield('content')
        </main>
        @include('parts.footer')

        <svg version="1.0" xmlns="http://www.w3.org/2000/svg"  style="display:none">
        <symbol id="leave" viewBox="0 0 1166.000000 1280.000000">
            <g transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)" fill="inherit" stroke="none">
                <path d="M3385 12743 c9 -43 26 -106 36 -128 4 -11 10 -36 13 -55 6 -49 25 -131 36 -155 15 -34 18 -78 9 -104 -5 -13 -12 -63 -16 -110 -3 -47 -9 -92 -13 -100 -4 -8 1 -52 11 -98 13 -59 16 -91 9 -103 -7 -12 -7 -28 0 -45 16 -41 12 -136 -5 -155 -10 -11 -17 -47 -20 -109 -3 -56 -12 -105 -21 -123 -12 -23 -15 -47 -10 -92 15 -161 17 -228 5 -242 -8 -10 -9 -39 -4 -100 6 -80 5 -87 -15 -109 -24 -26 -24 -16 -6 -185 20 -185 20 -187 -2 -201 -14 -9 -18 -18 -13 -28 4 -9 16 -44 25 -79 14 -49 15 -66 6 -78 -17 -20 -5 -73 40 -170 21 -45 41 -96 45 -113 4 -17 11 -33 16 -37 17 -10 37 -71 32 -98 -4 -18 1 -34 14 -49 29 -33 123 -230 123 -258 0 -39 53 -138 114 -214 31 -38 54 -76 51 -83 -2 -7 2 -15 9 -18 27 -10 109 -128 109 -156 0 -17 6 -28 14 -28 17 0 183 -160 183 -176 0 -7 48 -56 108 -110 59 -54 220 -213 357 -353 138 -139 292 -289 344 -333 52 -44 121 -110 154 -146 33 -37 64 -69 68 -72 29 -21 268 -359 296 -420 20 -41 55 -115 79 -164 24 -48 44 -94 44 -101 0 -8 16 -49 36 -92 55 -119 92 -208 129 -313 19 -52 45 -126 59 -163 15 -37 26 -81 26 -97 0 -26 -4 -30 -27 -30 -36 1 -62 15 -129 75 -71 62 -103 107 -239 324 -59 96 -127 202 -151 235 -54 77 -193 229 -253 277 -82 64 -278 247 -338 314 -32 37 -71 73 -88 80 -16 8 -39 20 -50 27 -113 73 -166 111 -177 125 -7 10 -20 23 -29 28 -9 6 -61 40 -115 78 -71 48 -108 67 -130 67 -28 0 -131 49 -166 80 -7 6 -28 22 -47 35 -31 23 -36 23 -52 9 -15 -13 -22 -12 -70 17 -71 42 -164 83 -219 98 -25 7 -61 22 -80 33 -19 12 -56 22 -81 24 -26 1 -57 8 -70 15 -13 7 -26 14 -29 15 -6 1 -75 31 -117 51 -17 8 -47 13 -65 12 -29 -2 -77 8 -128 28 -8 4 -17 7 -20 8 -3 1 -17 7 -31 13 -15 6 -46 16 -70 22 -24 7 -69 20 -100 30 -30 11 -64 17 -75 14 -10 -3 -73 2 -139 10 -112 14 -120 14 -131 -3 -19 -26 -86 -46 -112 -32 -11 6 -48 17 -81 25 -50 12 -62 12 -71 1 -6 -7 -39 -16 -73 -18 -82 -7 -129 -17 -147 -32 -17 -13 -49 -28 -65 -30 -5 0 -17 -5 -25 -10 -8 -5 -92 -10 -186 -10 -150 0 -173 -2 -188 -18 -12 -11 -22 -14 -30 -8 -18 15 -224 25 -240 12 -15 -12 -257 -17 -317 -6 -26 5 -48 1 -84 -15 -44 -20 -59 -22 -134 -16 -47 4 -94 13 -105 19 -14 8 -78 12 -186 13 -177 0 -177 0 -288 46 -41 16 -76 27 -79 25 -9 -9 17 -45 48 -67 31 -23 87 -51 227 -115 45 -21 87 -44 93 -51 6 -7 32 -20 57 -28 30 -10 86 -48 156 -107 60 -50 141 -107 179 -127 97 -51 105 -56 135 -85 15 -13 38 -28 52 -32 82 -25 283 -196 265 -226 -10 -15 32 -57 85 -84 53 -28 115 -89 105 -104 -6 -10 138 -85 200 -105 29 -9 75 -51 75 -69 0 -10 18 -22 49 -32 27 -9 55 -23 61 -31 7 -7 18 -14 24 -14 18 0 96 -69 96 -85 0 -7 24 -27 52 -44 55 -31 110 -81 107 -97 -4 -24 4 -35 44 -55 23 -12 50 -30 60 -40 9 -10 36 -23 60 -29 133 -35 184 -55 212 -84 17 -16 57 -39 90 -51 97 -34 141 -58 166 -92 13 -18 39 -36 59 -42 85 -24 157 -54 177 -73 22 -20 67 -34 218 -68 44 -10 103 -25 130 -33 28 -9 88 -26 135 -38 62 -16 92 -30 111 -50 30 -33 74 -45 191 -54 56 -4 91 -12 99 -21 8 -10 34 -14 93 -13 111 1 217 -16 261 -42 37 -22 40 -22 393 -16 394 7 453 14 652 72 69 20 143 41 165 46 22 5 45 11 50 13 80 25 93 25 146 11 30 -9 97 -23 149 -32 144 -24 170 -35 215 -95 21 -29 67 -110 101 -179 35 -70 78 -151 97 -181 52 -82 264 -476 423 -788 29 -58 69 -132 87 -165 85 -152 247 -453 247 -460 0 -4 8 -19 19 -33 29 -42 141 -261 141 -276 0 -8 16 -38 36 -67 20 -30 45 -72 56 -94 12 -22 29 -51 39 -64 11 -13 19 -27 19 -31 0 -16 -101 -19 -157 -4 -71 18 -109 57 -158 161 -19 40 -39 73 -44 73 -6 0 -11 5 -11 11 0 32 -205 292 -303 384 -122 115 -153 138 -372 268 -11 7 -34 22 -51 34 -51 36 -207 107 -234 107 -14 0 -52 14 -86 31 -88 47 -131 60 -149 45 -16 -14 -59 -2 -136 36 -26 13 -58 24 -72 24 -13 0 -62 20 -108 44 -91 47 -179 73 -207 60 -22 -9 -49 -6 -87 11 -80 35 -137 48 -160 35 -20 -11 -33 -8 -97 23 -40 19 -82 38 -93 42 -25 9 -93 10 -102 2 -8 -9 -48 -9 -55 -1 -4 3 -91 6 -194 5 -103 0 -195 4 -205 9 -12 7 -21 5 -29 -6 -11 -12 -31 -14 -112 -10 -129 7 -245 -8 -273 -34 -14 -13 -35 -20 -62 -20 -47 0 -193 -28 -208 -40 -9 -7 -46 -13 -170 -25 -122 -12 -162 -19 -184 -34 -23 -15 -71 -24 -263 -50 -94 -13 -137 -27 -163 -51 -18 -17 -40 -22 -101 -26 -44 -3 -89 -10 -101 -16 -12 -6 -28 -8 -36 -5 -7 3 -19 -3 -25 -13 -13 -22 -58 -43 -127 -60 -27 -7 -54 -16 -60 -19 -5 -3 -18 -4 -28 -3 -10 2 -24 -1 -30 -6 -7 -5 -38 -12 -71 -15 -43 -4 -65 -12 -85 -30 -14 -14 -45 -31 -68 -38 -23 -6 -52 -23 -64 -35 -13 -13 -29 -24 -36 -24 -7 0 -21 -4 -31 -10 -9 -5 -48 -19 -87 -30 -129 -36 -178 -56 -186 -76 -14 -38 -53 -61 -139 -78 -47 -10 -96 -22 -110 -26 -14 -5 -72 -11 -130 -14 -58 -4 -125 -8 -150 -11 -25 -2 -80 -7 -122 -10 -43 -4 -80 -10 -83 -15 -2 -4 -36 -10 -75 -14 -38 -4 -70 -11 -70 -15 0 -14 78 -45 165 -66 35 -8 90 -24 122 -35 32 -12 103 -25 160 -30 63 -5 114 -15 135 -26 18 -10 38 -18 43 -19 6 -1 17 -4 25 -7 8 -4 33 -9 55 -11 86 -11 195 -36 241 -57 27 -12 76 -30 109 -41 33 -12 125 -52 205 -91 80 -39 154 -74 165 -80 36 -16 68 -36 74 -46 8 -12 122 -72 138 -72 6 0 22 -13 36 -29 23 -28 62 -41 162 -55 34 -5 69 -18 85 -31 13 -11 79 -28 199 -51 29 -6 70 -35 71 -50 0 -6 26 -18 58 -27 55 -15 78 -20 169 -33 24 -4 48 -13 54 -20 6 -8 43 -23 83 -35 39 -12 79 -28 88 -36 9 -8 51 -25 93 -38 42 -13 83 -29 91 -36 9 -7 37 -13 65 -14 29 -1 56 -8 67 -18 10 -10 35 -17 55 -17 57 0 252 -50 291 -75 32 -20 108 -28 242 -26 104 1 124 -1 145 -17 20 -16 50 -20 179 -26 119 -6 159 -11 172 -23 15 -14 35 -14 145 -7 109 8 130 7 143 -6 16 -16 44 -14 143 10 36 9 52 9 60 1 6 -6 20 -11 31 -11 31 0 206 49 253 71 22 11 61 22 85 25 114 15 159 16 172 5 11 -9 28 -6 77 14 35 15 70 28 78 30 9 2 126 42 261 88 255 88 320 114 533 216 70 34 148 66 173 71 25 6 143 12 260 13 l215 2 72 -75 c107 -110 191 -209 297 -350 52 -69 113 -147 136 -175 23 -27 117 -151 209 -275 93 -124 191 -254 218 -290 27 -36 102 -135 165 -220 63 -85 134 -175 157 -200 23 -25 68 -86 99 -136 65 -104 84 -125 196 -214 45 -36 116 -94 158 -130 42 -36 140 -112 216 -169 77 -57 162 -125 190 -152 52 -48 129 -109 311 -245 254 -191 424 -314 460 -335 22 -13 120 -80 217 -149 98 -69 239 -163 314 -210 191 -119 218 -136 312 -197 46 -30 98 -61 115 -68 18 -8 62 -35 99 -62 103 -73 181 -121 208 -128 19 -4 37 2 68 25 49 35 62 62 62 130 0 64 -15 72 -140 77 -52 3 -109 11 -127 19 -17 8 -34 14 -37 14 -15 0 -168 77 -278 140 -67 39 -123 70 -125 70 -2 0 -32 19 -66 43 -34 23 -78 51 -97 61 -35 19 -383 252 -430 288 -14 11 -72 55 -130 98 -153 115 -225 169 -289 220 -31 25 -106 83 -166 130 -60 47 -125 99 -144 116 -20 17 -97 80 -171 139 -252 203 -375 309 -468 405 -51 52 -128 131 -172 175 -43 44 -110 121 -150 170 -39 50 -79 99 -88 110 -14 17 -111 143 -186 244 -11 14 -31 40 -45 57 -15 17 -59 74 -99 125 -222 288 -286 370 -408 529 -133 174 -166 215 -214 274 -14 17 -47 60 -74 95 -27 35 -60 75 -72 88 -25 27 -40 95 -29 140 7 30 77 157 136 244 40 59 141 153 259 241 100 75 198 186 301 338 46 69 87 132 92 140 4 8 23 35 42 60 19 25 44 65 55 89 21 44 73 117 99 137 7 6 15 22 16 36 3 26 26 68 56 103 9 11 28 40 41 66 13 25 38 65 55 90 54 78 146 278 149 323 3 49 28 142 44 161 6 7 10 28 9 46 -2 32 21 96 78 217 14 31 26 76 28 111 2 32 14 85 26 117 12 33 23 70 24 84 4 47 18 105 27 116 5 7 8 16 6 20 -1 5 4 26 11 47 9 27 10 41 2 51 -11 13 -1 65 32 166 8 25 15 69 16 98 0 29 3 58 7 63 9 16 22 213 14 224 -8 11 -23 103 -23 150 -1 17 3 93 8 170 5 77 8 156 7 175 -4 92 -14 167 -23 185 -10 20 -8 62 7 212 5 55 3 78 -8 95 -9 15 -15 57 -16 118 -2 52 -7 99 -12 104 -6 6 -10 26 -10 46 0 20 -3 40 -6 43 -4 4 -6 48 -6 99 1 71 -2 96 -14 109 -11 12 -19 53 -26 131 -5 62 -14 120 -18 129 -8 16 -14 46 -25 121 -2 20 -11 56 -19 80 -9 24 -18 70 -22 103 -3 33 -14 71 -24 85 -10 14 -22 61 -28 104 -6 47 -17 85 -28 97 -14 16 -17 41 -19 143 -1 72 -6 130 -12 138 -6 7 -13 40 -16 73 -6 73 -15 123 -27 150 -5 11 -19 45 -31 75 -12 30 -29 63 -38 73 -14 17 -16 17 -24 -5 -5 -13 -10 -104 -12 -203 -2 -120 -9 -207 -20 -260 -19 -89 -33 -165 -34 -180 -1 -6 -17 -35 -36 -65 -20 -31 -35 -67 -35 -84 0 -16 -6 -37 -13 -45 -7 -9 -21 -41 -31 -71 -10 -30 -31 -76 -47 -101 -16 -25 -39 -74 -52 -110 -13 -35 -31 -77 -40 -94 -9 -16 -26 -50 -38 -75 -12 -25 -34 -58 -49 -75 -15 -16 -37 -59 -50 -94 -12 -36 -38 -87 -57 -114 -19 -27 -40 -64 -46 -81 -5 -17 -21 -44 -34 -61 -47 -61 -63 -89 -63 -115 0 -23 -15 -52 -47 -93 -13 -16 -23 -39 -23 -53 0 -13 -5 -24 -11 -24 -6 0 -9 -12 -8 -27 5 -50 -17 -102 -73 -180 -21 -28 -47 -71 -59 -95 -11 -24 -24 -50 -29 -58 -4 -9 -11 -30 -14 -47 -4 -17 -14 -37 -22 -44 -8 -6 -14 -15 -14 -20 0 -4 -14 -30 -31 -57 -22 -36 -32 -66 -35 -108 -3 -37 -16 -83 -35 -124 -43 -92 -60 -137 -74 -209 -7 -32 -50 -105 -86 -146 -10 -11 -18 -23 -18 -28 1 -24 -14 -88 -22 -93 -5 -3 -9 -26 -9 -52 0 -46 -22 -134 -38 -156 -5 -6 -14 -36 -21 -66 -6 -31 -20 -70 -31 -88 -11 -18 -20 -48 -20 -67 0 -18 -5 -37 -10 -40 -6 -4 -8 -10 -5 -15 3 -5 1 -27 -5 -49 -6 -22 -11 -56 -12 -76 -1 -20 -5 -38 -10 -41 -4 -3 -8 -14 -8 -25 0 -11 -6 -30 -14 -42 -8 -12 -17 -41 -21 -64 -4 -24 -11 -45 -16 -49 -5 -3 -7 -9 -4 -14 3 -5 -6 -25 -20 -46 -14 -20 -25 -49 -25 -64 0 -15 -7 -41 -15 -56 -9 -17 -15 -56 -15 -93 0 -59 -8 -101 -31 -156 -11 -26 -13 -168 -5 -330 3 -71 8 -179 10 -240 2 -60 12 -139 21 -175 9 -36 21 -85 25 -110 21 -117 68 -263 105 -326 16 -29 47 -83 68 -121 20 -37 41 -75 46 -83 22 -38 80 -168 87 -195 4 -16 12 -36 18 -44 16 -21 11 -159 -8 -203 -30 -70 -40 -64 -121 73 -25 42 -54 84 -65 94 -11 10 -20 23 -20 29 0 6 -15 34 -33 61 -19 28 -41 65 -50 82 -40 79 -49 93 -57 98 -4 3 -22 32 -39 65 -18 33 -40 75 -51 93 -11 17 -31 52 -45 77 -14 25 -41 72 -60 105 -20 33 -45 80 -57 105 -12 25 -27 52 -33 60 -12 14 -36 61 -190 355 -37 72 -72 135 -77 142 -5 6 -55 98 -112 205 -57 106 -121 224 -142 262 -89 158 -116 207 -179 333 -66 130 -67 133 -51 158 22 34 104 94 139 101 16 4 57 37 100 81 40 41 95 90 122 109 28 18 68 50 90 69 22 19 45 35 51 35 5 0 19 8 30 18 10 10 47 41 81 69 79 66 342 335 384 393 18 25 46 61 63 82 47 55 96 124 96 135 0 5 12 20 26 34 14 13 71 80 127 149 55 69 118 144 139 167 21 24 38 52 38 64 0 25 24 61 100 149 61 70 120 163 120 186 0 8 16 45 35 82 19 37 39 78 45 92 5 14 14 32 19 40 5 8 13 26 19 40 6 14 24 56 41 93 19 42 29 78 25 91 -3 13 6 47 21 82 15 32 33 85 41 118 8 32 24 72 35 88 15 20 20 39 16 61 -3 20 6 64 24 119 16 48 29 98 29 111 0 14 7 44 16 68 8 24 17 51 19 59 2 8 13 51 24 94 25 94 26 119 7 135 -10 9 -12 20 -6 40 4 16 11 72 15 126 5 65 16 119 33 164 14 36 26 91 27 122 1 30 17 100 34 154 18 54 30 107 28 117 -3 10 5 53 19 96 15 49 23 101 23 142 0 36 3 76 7 90 4 14 8 61 10 105 2 44 7 89 12 100 25 54 38 166 22 195 -7 13 -5 39 5 86 9 36 15 90 14 118 -1 28 1 119 4 201 9 228 -5 450 -30 500 l-21 40 -5 -130 c-5 -149 -7 -157 -30 -183 -10 -11 -26 -42 -36 -70 -21 -56 -83 -163 -106 -182 -8 -7 -15 -18 -15 -25 0 -7 -24 -34 -52 -61 -29 -27 -104 -103 -167 -169 -62 -66 -122 -123 -133 -127 -11 -5 -46 -28 -78 -53 -32 -25 -65 -45 -73 -45 -7 0 -49 -38 -92 -85 -43 -47 -84 -84 -91 -81 -20 8 -54 -24 -95 -88 -22 -33 -56 -72 -77 -86 -20 -14 -42 -36 -48 -48 -6 -12 -17 -30 -25 -39 -8 -10 -24 -35 -34 -56 -24 -45 -82 -104 -110 -109 -11 -2 -46 -41 -81 -91 -34 -48 -73 -98 -85 -111 -13 -12 -41 -44 -62 -69 -21 -26 -43 -45 -48 -42 -10 7 -39 -18 -39 -33 0 -5 -7 -15 -15 -22 -8 -6 -30 -40 -50 -73 -20 -34 -48 -78 -63 -98 -15 -20 -53 -73 -86 -118 -32 -45 -68 -86 -80 -91 -13 -4 -34 -35 -53 -76 -54 -116 -103 -231 -103 -242 0 -5 -6 -15 -14 -22 -8 -6 -12 -18 -9 -25 7 -21 -16 -86 -42 -115 -41 -47 -73 -131 -80 -215 -4 -44 -14 -96 -22 -115 -9 -19 -17 -73 -19 -119 -2 -46 -8 -89 -14 -95 -5 -5 -10 -19 -10 -31 0 -11 -7 -33 -15 -49 -8 -15 -15 -36 -15 -45 0 -10 -3 -21 -7 -24 -3 -4 -7 -17 -8 -30 -3 -32 -34 -167 -42 -180 -3 -5 -12 -37 -19 -71 -7 -34 -20 -90 -29 -126 -18 -71 -26 -119 -26 -165 0 -16 -5 -55 -10 -85 -12 -64 -14 -84 -24 -250 -8 -123 11 -380 34 -470 5 -19 17 -71 27 -115 9 -44 28 -120 41 -169 26 -96 29 -189 7 -241 -26 -64 -45 -55 -94 49 -22 44 -44 88 -49 96 -11 18 -71 147 -81 175 -4 11 -13 33 -19 48 -6 15 -11 36 -11 46 0 10 -7 24 -15 31 -8 7 -15 21 -15 32 0 11 -6 32 -14 46 -21 41 -36 95 -36 130 0 17 -4 34 -10 37 -5 3 -10 14 -10 23 0 9 -6 29 -14 44 -15 28 -25 65 -31 117 -2 17 -11 72 -20 123 -8 51 -17 117 -20 147 -5 65 -24 160 -36 184 -12 21 -26 226 -34 487 -3 107 -9 229 -12 270 -3 41 -6 89 -7 105 -1 17 -4 35 -7 40 -11 19 -3 299 10 341 8 24 11 63 8 95 -23 217 -26 314 -13 374 5 22 9 54 10 72 0 40 -25 142 -36 149 -4 3 -8 15 -8 27 0 21 -25 100 -37 120 -3 5 -7 32 -9 59 -3 27 -9 59 -15 70 -6 11 -26 70 -46 131 -19 62 -43 121 -53 132 -10 12 -20 45 -24 80 -11 98 -34 165 -61 175 -31 12 -54 48 -67 102 -15 65 -16 70 -27 106 -5 18 -24 49 -40 68 -17 19 -31 42 -31 50 0 25 -29 74 -44 74 -8 0 -33 23 -56 50 -23 28 -49 50 -59 50 -9 0 -22 8 -29 18 -6 9 -30 45 -53 80 -26 40 -47 62 -60 62 -11 0 -32 19 -51 47 -55 78 -154 173 -181 173 -28 0 -67 41 -134 143 -50 75 -76 95 -99 76 -27 -22 -115 66 -138 139 -4 12 -13 22 -19 22 -7 1 -29 26 -50 56 -21 30 -49 59 -63 64 -13 5 -38 32 -55 60 -17 27 -37 50 -44 50 -8 0 -29 18 -47 41 -18 23 -51 63 -73 90 -74 90 -90 113 -115 166 -27 58 -61 101 -161 205 -71 73 -103 88 -94 41z"/>
            </g>
        </symbol>
        <symbol id="brains" viewBox="0 0 1280.000000 920.000000">
            <g transform="translate(0.000000,920.000000) scale(0.100000,-0.100000)" stroke="none">
                <path d="M5790 9189 c-1027 -61 -2141 -380 -3070 -879 -1455 -781 -2462 -1946 -2675 -3095 -163 -882 134 -1674 840 -2240 187 -150 484 -325 730 -429 117 -50 396 -153 385 -143 -3 3 -84 45 -180 94 -362 184 -654 406 -878 668 -481 561 -646 1263 -476 2023 203 908 919 1853 1948 2571 977 683 2167 1139 3366 1291 318 40 410 45 830 45 430 0 574 -9 845 -50 84 -13 -27 16 -166 44 -496 98 -982 131 -1499 100z"/>
                <path d="M8525 8765 c833 -212 1657 -700 2383 -1409 903 -883 1491 -1983 1583 -2959 18 -197 7 -489 -25 -659 -142 -749 -638 -1224 -1401 -1342 l-90 -14 91 -1 c188 -2 449 39 634 99 132 44 302 127 412 201 193 131 384 352 494 570 583 1162 -193 3103 -1766 4413 -654 545 -1399 933 -2075 1080 -106 23 -373 67 -400 65 -5 0 67 -20 160 -44z"/>
                <path d="M5890 8079 c-996 -61 -1839 -314 -2377 -715 -198 -147 -391 -380 -470 -566 -101 -241 -109 -502 -23 -760 135 -402 529 -836 1073 -1182 31 -20 57 -35 57 -32 0 2 -24 23 -52 46 -486 386 -774 827 -817 1247 -26 249 47 516 201 741 64 92 224 261 328 345 545 440 1479 726 2570 788 420 24 1248 -8 1505 -58 17 -3 27 -2 24 1 -18 19 -586 101 -869 126 -349 30 -846 38 -1150 19z"/>
                <path d="M9555 6920 c11 -5 63 -26 115 -46 247 -94 546 -265 728 -417 236 -197 399 -434 464 -675 26 -98 35 -294 18 -399 -73 -455 -484 -874 -1125 -1148 -800 -341 -1865 -412 -2780 -184 -142 35 -398 118 -507 164 -43 18 -76 29 -73 25 7 -12 195 -120 293 -169 373 -187 875 -318 1377 -361 156 -13 539 -13 702 0 704 57 1328 269 1784 606 143 105 328 294 412 420 255 384 282 772 80 1165 -95 185 -245 360 -443 518 -232 185 -540 345 -876 454 -151 50 -203 64 -169 47z"/>
                <path d="M8000 6816 c0 -3 24 -10 53 -16 121 -25 258 -113 353 -229 67 -80 147 -238 175 -346 23 -86 31 -275 16 -348 -7 -33 -11 -38 -30 -33 -41 10 -302 45 -422 57 -155 16 -624 16 -785 1 -547 -53 -950 -165 -1434 -400 -4 -3 -5 15 -1 39 4 24 7 93 7 154 -2 239 -94 462 -266 643 -84 88 -140 130 -242 181 -146 73 -292 95 -434 67 -96 -20 -143 -40 -69 -30 25 3 82 0 125 -6 373 -56 680 -426 710 -854 4 -54 2 -122 -5 -166 -22 -140 -23 -141 -142 -230 -581 -432 -772 -998 -518 -1537 69 -145 152 -258 298 -403 259 -257 576 -445 995 -589 127 -44 164 -50 68 -11 -102 41 -330 158 -429 221 -271 171 -502 397 -621 609 -91 162 -135 324 -136 500 0 182 29 301 115 471 213 417 705 769 1382 988 316 102 652 167 1047 202 136 13 735 17 746 6 13 -12 -61 -129 -112 -177 -86 -81 -211 -125 -325 -114 l-44 4 43 -15 c217 -72 460 32 565 242 55 108 71 180 70 318 -1 142 -22 236 -84 365 -125 263 -369 440 -606 440 -35 0 -63 -2 -63 -4z"/>
                <path d="M1789 6133 c-341 -282 -559 -665 -630 -1108 -8 -44 -13 -161 -13 -260 0 -99 5 -216 13 -260 107 -662 550 -1194 1164 -1400 208 -69 275 -79 537 -79 204 0 248 2 330 21 159 36 289 81 425 149 449 222 785 641 909 1131 34 132 32 157 -3 63 -211 -564 -686 -964 -1262 -1064 -482 -84 -978 58 -1348 384 -705 623 -758 1723 -117 2408 27 28 47 52 44 52 -2 0 -24 -17 -49 -37z"/>
                <path d="M11735 4273 c-261 -22 -529 -117 -750 -266 -126 -86 -314 -275 -398 -403 -129 -195 -219 -429 -253 -655 -20 -137 -15 -373 10 -489 42 -195 120 -371 232 -525 166 -229 213 -312 258 -453 51 -161 55 -318 14 -512 -85 -403 -349 -727 -741 -911 -76 -35 -88 -47 -24 -23 191 73 378 189 512 316 190 180 310 388 382 665 26 101 28 120 28 303 -1 183 -3 200 -28 285 -51 167 -116 282 -272 485 -209 270 -271 612 -180 990 45 184 112 331 239 528 160 247 330 404 565 522 90 45 282 106 376 120 44 7 91 16 105 20 24 8 24 8 -5 8 -16 -1 -48 -3 -70 -5z"/>
                <path d="M4815 2264 c310 -30 431 -49 623 -99 434 -114 806 -312 1240 -661 170 -136 325 -277 645 -585 269 -259 391 -362 499 -419 134 -72 258 -94 367 -66 58 15 186 74 178 82 -2 2 -37 13 -78 23 -138 35 -297 120 -479 254 -124 91 -220 172 -470 392 -285 251 -329 288 -460 386 -410 306 -806 505 -1216 610 -238 60 -392 80 -659 84 -126 2 -212 1 -190 -1z"/>
            </g>
        </symbol>
        <symbol id="key"viewBox="0 0 1280.000000 714.000000">
            <g transform="translate(0.000000,714.000000) scale(0.100000,-0.100000)">
            <path d="M10705 7130 c-318 -50 -608 -269 -726 -550 -56 -132 -73 -229 -73 -400 1 -125 5 -170 22 -233 37 -136 101 -253 214 -394 15 -18 -70 21 -196 90 -73 40 -113 57 -121 51 -7 -5 -51 -42 -98 -81 -88 -76 -97 -81 -97 -60 0 31 -61 136 -95 164 -93 77 -233 64 -333 -31 -44 -41 -65 -81 -71 -136 l-6 -45 -820 2 -820 2 -84 81 c-45 44 -128 110 -183 147 -55 36 -102 73 -105 82 -24 77 -67 143 -167 251 -28 31 -71 84 -95 119 -187 264 -614 508 -1071 612 -52 12 -143 42 -203 65 -195 79 -430 124 -639 124 -86 0 -100 3 -183 39 -92 40 -204 72 -309 91 -128 22 -408 7 -531 -28 -19 -6 -69 -4 -135 5 -207 28 -503 -1 -709 -71 -69 -23 -81 -24 -235 -19 -304 11 -558 -43 -816 -172 -85 -43 -232 -141 -294 -196 l-49 -43 -86 -1 c-187 -3 -376 -118 -642 -391 -202 -207 -347 -345 -412 -393 -155 -112 -280 -291 -358 -511 -12 -36 -42 -99 -67 -142 -110 -192 -133 -375 -61 -479 19 -27 19 -28 -12 -93 -92 -196 -16 -467 202 -726 45 -53 58 -76 68 -125 63 -294 312 -536 696 -680 90 -33 315 -94 405 -109 30 -5 38 -12 54 -52 10 -25 42 -71 71 -102 57 -62 58 -64 73 -238 6 -72 14 -100 36 -138 40 -68 121 -143 222 -206 49 -30 125 -82 169 -116 108 -83 175 -124 302 -188 132 -66 225 -100 363 -132 93 -22 136 -26 365 -31 281 -6 371 0 605 43 74 14 145 27 158 31 18 4 25 -1 38 -33 58 -140 194 -319 320 -425 88 -74 105 -98 301 -439 60 -105 238 -452 322 -630 75 -156 211 -273 336 -287 68 -8 169 14 197 44 20 22 23 34 21 96 -2 76 -9 101 -107 382 -31 88 -52 161 -47 163 6 2 61 -9 123 -24 90 -21 152 -28 303 -35 105 -4 231 -11 281 -15 108 -8 197 3 409 52 324 74 495 153 657 302 101 94 188 235 188 305 0 13 13 36 30 52 38 36 58 80 76 166 10 49 12 81 5 107 -25 101 -28 92 34 92 173 0 365 43 495 111 353 183 560 644 560 1244 0 178 -18 485 -36 630 -35 279 -106 495 -206 626 -19 24 -49 87 -67 139 -75 216 -198 397 -318 467 -26 15 -43 32 -43 43 0 16 14 19 143 24 78 3 400 7 715 9 l572 3 0 -30 c0 -46 42 -127 85 -165 54 -47 100 -64 176 -65 54 0 74 5 112 27 62 36 99 84 117 151 l15 55 95 -79 c52 -44 100 -80 107 -80 6 0 77 34 156 75 80 41 148 75 151 75 3 0 -19 -33 -50 -72 -209 -271 -249 -667 -99 -983 116 -244 349 -438 615 -511 94 -26 368 -26 460 -1 264 75 465 221 587 429 104 175 137 294 137 495 l0 142 26 -7 c14 -3 86 -6 160 -6 163 1 246 21 383 91 77 39 109 64 192 147 153 154 216 288 237 500 33 330 -110 617 -390 781 -40 23 -116 58 -170 76 -90 30 -107 33 -232 33 -74 1 -151 -2 -171 -7 l-36 -7 -6 162 c-6 193 -25 278 -93 408 -124 241 -356 429 -604 490 -98 24 -292 34 -385 20z m260 -365 c154 -32 317 -151 392 -285 70 -124 94 -277 62 -405 -23 -96 -92 -227 -155 -295 l-23 -25 132 -116 c73 -63 149 -128 170 -143 l37 -28 64 69 c35 38 87 81 116 97 179 97 381 67 528 -80 70 -70 107 -139 124 -234 38 -201 -104 -417 -320 -489 -160 -54 -330 0 -465 149 l-52 58 -135 -120 c-74 -65 -148 -131 -163 -147 l-29 -28 52 -67 c99 -132 133 -225 134 -366 0 -199 -95 -379 -258 -488 -96 -64 -178 -92 -291 -99 -165 -10 -309 44 -435 163 -125 118 -183 247 -184 409 0 50 6 115 13 145 53 218 222 383 445 436 l76 18 -2 67 c-2 37 0 70 4 74 10 11 41 -11 63 -45 27 -41 107 -80 164 -80 156 1 276 174 257 372 -12 136 -75 240 -170 284 -94 44 -170 26 -248 -57 -26 -28 -53 -49 -60 -46 -9 2 -13 25 -13 65 0 33 -4 65 -10 70 -5 5 -41 17 -79 27 -198 52 -353 194 -417 382 -34 97 -34 269 -1 365 99 285 389 453 677 393z m-6505 -949 c185 -34 347 -161 420 -330 28 -67 25 -77 -13 -34 -45 53 -115 81 -199 80 -135 -1 -223 -54 -280 -169 -79 -160 -15 -334 151 -411 81 -39 186 -38 255 1 27 15 51 26 53 23 6 -6 -71 -98 -126 -149 -67 -63 -83 -97 -82 -166 0 -31 25 -351 56 -711 30 -360 55 -681 55 -712 0 -50 -4 -62 -29 -90 l-29 -33 -326 -3 c-362 -3 -372 -2 -402 62 -15 31 -12 79 46 742 34 390 62 732 62 761 1 63 -24 110 -88 166 -140 123 -211 339 -175 529 39 201 201 375 402 432 99 28 147 30 249 12z"/>
            </g>
        </symbol>
        <symbol id="psichologe" viewBox="0 0 1280.000000 1280.000000">
            <g transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)" stroke="none">
                <path d="M668 11315 c-5 -5 -8 -66 -8 -136 l0 -127 78 -7 c131 -11 204 -25 296 -56 255 -85 417 -265 493 -546 l27 -98 6 -825 c7 -771 9 -835 29 -979 127 -905 494 -1586 1131 -2098 690 -554 1690 -885 2813 -929 l177 -7 -1 -871 c-1 -479 -4 -1233 -8 -1676 l-7 -805 -31 -93 c-76 -226 -222 -385 -454 -496 -104 -50 -229 -89 -359 -112 -129 -22 -363 -36 -478 -29 l-103 7 3 -118 3 -118 105 2 c1490 25 2490 25 3980 0 l105 -2 3 118 3 118 -103 -7 c-116 -7 -349 7 -481 30 -132 24 -252 61 -356 111 -232 111 -374 265 -453 494 l-33 95 -6 840 c-4 462 -7 1216 -8 1676 l-1 836 178 7 c996 39 1904 306 2577 756 256 172 531 422 704 640 362 457 568 966 663 1635 19 139 21 210 28 975 l6 825 27 98 c83 307 269 493 572 571 50 13 232 36 281 36 12 0 14 23 12 133 l-3 132 -170 -1 c-614 -2 -1170 -217 -1550 -598 -218 -219 -361 -461 -470 -791 -84 -254 -121 -497 -135 -876 -5 -141 -17 -321 -25 -400 -76 -689 -287 -1278 -618 -1719 -84 -112 -261 -297 -367 -383 -306 -247 -688 -404 -1125 -462 -134 -18 -491 -32 -548 -21 l-37 7 0 1752 c1 1890 7 2247 39 2389 72 316 274 541 579 644 203 69 424 94 660 75 81 -6 157 -14 170 -17 22 -6 22 -6 22 125 l0 131 -2130 0 -2130 0 0 -131 c0 -131 0 -131 23 -125 12 3 88 11 169 17 236 19 457 -6 660 -75 290 -98 495 -315 567 -598 45 -174 44 -133 48 -2205 l5 -1982 -38 -7 c-58 -11 -414 3 -549 21 -437 58 -819 215 -1125 462 -106 86 -283 271 -367 383 -203 270 -365 606 -472 976 -105 362 -154 692 -171 1143 -14 386 -51 621 -140 891 -248 755 -829 1224 -1673 1351 -138 21 -496 37 -509 24z"/>
            </g>
        </symbol>
        <symbol id="bamboo" viewBox="0 0 640.000000 1280.000000">
            <g transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)" >
                <path d="M3110 12778 c0 -40 32 -331 45 -419 47 -303 115 -466 238 -574 59 -52 169 -110 191 -102 26 10 49 114 49 217 -1 172 -59 295 -272 580 -114 152 -240 310 -246 310 -3 0 -5 -6 -5 -12z"/>
                <path d="M4530 12704 c-189 -104 -408 -249 -513 -338 -185 -159 -277 -348 -277 -570 l0 -86 63 0 c126 0 249 51 358 149 98 87 223 290 403 650 102 204 138 281 128 281 -4 0 -77 -39 -162 -86z"/>
                <path d="M3611 11684 c-110 -427 -241 -947 -241 -959 0 -8 -7 -15 -15 -15 -8 0 -15 -4 -15 -10 0 -5 5 -10 10 -10 6 0 10 -16 10 -35 0 -32 -3 -35 -29 -35 -24 0 -28 -3 -24 -20 3 -11 13 -20 23 -20 18 0 20 -30 36 -890 l7 -336 -43 4 c-54 5 -52 -18 3 -31 49 -12 50 -37 1 -37 -31 0 -35 -3 -32 -22 2 -18 9 -23 31 -21 22 1 27 -2 27 -20 0 -18 -143 -1172 -166 -1337 -6 -45 -7 -46 -40 -42 -28 4 -33 1 -28 -12 3 -9 17 -16 30 -16 13 0 24 -4 24 -10 0 -5 -14 -10 -31 -10 -24 0 -30 -3 -25 -16 3 -9 6 -18 6 -20 0 -2 10 -4 23 -4 22 0 22 -1 19 -112 -3 -109 -62 -797 -84 -983 -6 -49 -13 -202 -17 -340 -5 -212 -7 -238 -14 -170 -5 44 -10 86 -13 94 -12 36 -10 -7 6 -154 10 -88 23 -218 29 -290 7 -71 21 -209 31 -305 11 -96 28 -260 39 -365 11 -104 23 -211 26 -237 l6 -48 -41 0 c-52 0 -51 -14 3 -26 41 -9 42 -10 45 -52 l3 -44 -38 4 c-32 3 -38 0 -41 -18 -3 -19 3 -23 42 -28 39 -6 45 -10 48 -34 2 -15 0 -36 -4 -47 -4 -11 -26 -144 -48 -295 -23 -151 -65 -423 -95 -605 -30 -181 -68 -418 -85 -525 -17 -107 -33 -210 -36 -228 -4 -26 -9 -32 -29 -32 -18 0 -25 -5 -25 -20 0 -15 7 -20 25 -20 16 0 25 -6 25 -16 0 -13 -8 -15 -35 -12 -20 2 -35 0 -35 -7 0 -5 -3 -20 -6 -31 -5 -18 0 -22 30 -28 l36 -7 0 -207 c0 -256 -18 -1385 -26 -1659 l-6 -203 -33 0 c-21 0 -35 -6 -39 -16 -9 -24 -9 -24 34 -24 30 0 40 -4 40 -16 0 -12 -8 -14 -45 -8 -43 6 -45 5 -45 -19 0 -23 5 -27 45 -33 l45 -6 -2 -252 c-2 -206 0 -259 13 -296 l16 -45 13 30 c7 19 15 125 20 290 5 143 9 261 9 262 1 2 20 0 44 -3 39 -6 44 -4 54 19 12 25 11 26 -43 32 -73 10 -74 33 -2 37 41 2 54 7 56 21 3 15 -5 17 -54 17 l-56 0 6 378 c4 207 11 616 16 907 8 414 14 556 27 648 l18 118 37 -6 c34 -6 39 -4 48 20 15 39 13 42 -30 49 -31 5 -40 11 -40 26 0 17 7 20 44 20 31 0 46 5 50 16 8 22 5 25 -43 31 -35 5 -40 8 -36 27 3 11 37 215 75 451 39 237 89 540 111 674 45 276 63 468 53 555 l-6 59 35 -7 c30 -6 38 -3 46 13 15 28 15 28 -33 35 -41 6 -44 9 -50 44 -9 58 -8 62 23 62 16 0 34 7 41 15 11 13 7 15 -28 15 -39 0 -41 2 -46 33 -13 76 -148 1348 -149 1402 -2 70 13 264 54 715 16 178 29 351 29 385 0 33 9 127 20 209 11 81 20 152 20 157 0 5 11 9 25 9 16 0 25 6 25 15 0 8 -9 15 -20 15 -11 0 -20 5 -20 10 0 6 9 10 20 10 11 0 20 5 20 10 0 6 -9 10 -21 10 -18 0 -20 4 -15 38 6 38 104 821 130 1042 9 69 18 173 22 233 l7 107 28 0 c24 0 29 4 29 25 0 21 -5 25 -30 25 -16 0 -30 5 -30 10 0 6 11 10 25 10 16 0 25 6 25 15 0 9 -9 15 -22 15 l-23 0 1 573 c0 492 2 578 16 612 8 22 21 40 29 40 7 0 15 8 17 18 2 10 -3 17 -11 17 -22 0 -8 50 17 60 18 7 19 9 5 15 -15 5 -7 43 62 313 89 347 102 440 83 610 -6 56 -13 105 -17 108 -3 3 -10 -11 -16 -32z m-204 -1581 c-1 -54 -3 -10 -3 97 0 107 2 151 3 98 2 -54 2 -142 0 -195z m10 -135 c-3 -7 -5 -2 -5 12 0 14 2 19 5 13 2 -7 2 -19 0 -25z"/>
                <path d="M2350 11632 c0 -15 42 -160 92 -317 87 -275 193 -522 283 -660 110 -169 289 -284 482 -310 51 -7 52 -6 60 22 14 51 7 234 -11 303 -20 77 -72 191 -118 257 -44 65 -189 214 -323 333 -114 101 -452 380 -460 380 -3 0 -5 -3 -5 -8z"/>
                <path d="M3676 11604 c-4 -14 -5 -28 -3 -31 3 -2 8 8 11 23 4 14 5 28 3 31 -3 2 -8 -8 -11 -23z"/>
                <path d="M3662 11540 c0 -14 2 -19 5 -12 2 6 2 18 0 25 -3 6 -5 1 -5 -13z"/>
                <path d="M4347 11405 c-283 -155 -503 -309 -620 -435 -69 -75 -135 -188 -161 -280 -22 -77 -37 -205 -29 -253 l6 -40 86 6 c201 11 352 123 504 373 109 179 377 704 359 704 -4 0 -69 -34 -145 -75z"/>
                <path d="M4455 9749 c-478 -257 -798 -507 -914 -712 -81 -144 -121 -301 -121 -476 l0 -78 41 -6 c94 -12 249 28 362 94 187 110 317 292 583 814 120 235 227 455 221 455 -1 0 -79 -41 -172 -91z"/>
                <path d="M2136 9598 c139 -514 300 -910 449 -1105 124 -163 323 -280 511 -299 l62 -7 8 44 c14 81 6 258 -15 344 -26 99 -94 239 -160 325 -63 84 -287 302 -466 455 -165 141 -401 335 -409 335 -2 0 7 -42 20 -92z"/>
                <path d="M1835 8128 c7 -24 50 -158 95 -298 182 -566 318 -905 431 -1072 130 -191 322 -325 523 -364 73 -15 89 -15 96 -4 18 30 32 188 27 309 -12 293 -114 507 -373 781 -179 191 -401 385 -657 577 -169 127 -159 122 -142 71z"/>
                <path d="M4014 7708 c-506 -465 -710 -694 -791 -889 -59 -140 -78 -322 -50 -459 l12 -55 49 2 c160 5 386 158 501 338 84 131 178 375 264 680 31 111 112 458 107 462 -1 1 -42 -34 -92 -79z"/>
                <path d="M1865 6168 c13 -40 54 -167 91 -283 116 -365 231 -675 323 -870 146 -309 359 -496 630 -550 68 -14 85 -15 91 -4 37 58 37 386 2 521 -79 296 -290 562 -749 945 -125 104 -396 313 -407 313 -2 0 6 -33 19 -72z"/>
                <path d="M4755 5834 c-828 -478 -1093 -682 -1243 -957 -41 -75 -86 -189 -102 -262 -17 -77 -31 -228 -24 -271 l6 -43 57 -7 c79 -10 234 10 343 46 175 56 335 167 465 323 149 179 340 494 504 832 104 214 211 455 201 455 -4 -1 -97 -53 -207 -116z"/>
                <path d="M1325 3898 c2 -7 12 -42 24 -78 211 -685 417 -1252 543 -1499 137 -267 316 -454 539 -561 96 -46 195 -76 280 -86 55 -6 58 -5 63 17 3 13 11 44 16 69 20 84 23 336 7 446 -29 185 -107 386 -209 537 -194 287 -586 662 -1081 1033 -98 74 -180 134 -182 134 -3 0 -3 -6 0 -12z"/>
                <path d="M4865 2662 c-363 -160 -437 -195 -715 -333 -420 -211 -564 -302 -714 -455 -77 -78 -175 -213 -221 -303 -63 -126 -115 -326 -115 -446 l0 -63 50 -11 c96 -21 239 -24 345 -8 422 66 725 329 1180 1027 157 241 414 680 397 680 -4 0 -97 -40 -207 -88z"/>
            </g>
        </symbol>
        <symbol id="chevron" viewBox="0 0 263.7 473.1">
            <g>
                <path d="M244.5,473.1c-4.9,0-9.8-1.9-13.6-5.6L0,236.5L230.9,5.6c7.5-7.5,19.7-7.5,27.2,0c7.5,7.5,7.5,19.7,0,27.2L54.3,236.5 l203.7,203.7c7.5,7.5,7.5,19.7,0,27.2C254.3,471.2,249.4,473.1,244.5,473.1z"/>
            </g>
        </symbol>
        <symbol id="fb" viewBox="0 0 310 310">
            <g id="XMLID_834_">
                <path id="XMLID_835_" d="M81.703,165.106h33.981V305c0,2.762,2.238,5,5,5h57.616c2.762,0,5-2.238,5-5V165.765h39.064
                    c2.54,0,4.677-1.906,4.967-4.429l5.933-51.502c0.163-1.417-0.286-2.836-1.234-3.899c-0.949-1.064-2.307-1.673-3.732-1.673h-44.996
                    V71.978c0-9.732,5.24-14.667,15.576-14.667c1.473,0,29.42,0,29.42,0c2.762,0,5-2.239,5-5V5.037c0-2.762-2.238-5-5-5h-40.545
                    C187.467,0.023,186.832,0,185.896,0c-7.035,0-31.488,1.381-50.804,19.151c-21.402,19.692-18.427,43.27-17.716,47.358v37.752H81.703
                    c-2.762,0-5,2.238-5,5v50.844C76.703,162.867,78.941,165.106,81.703,165.106z"/>
            </g>
        </symbol>
        <symbol id="linkedin" viewBox="0 0 310 310">
            <g id="XMLID_801_">
                <path id="XMLID_802_" d="M72.16,99.73H9.927c-2.762,0-5,2.239-5,5v199.928c0,2.762,2.238,5,5,5H72.16c2.762,0,5-2.238,5-5V104.73 C77.16,101.969,74.922,99.73,72.16,99.73z"/>
                <path id="XMLID_803_" d="M41.066,0.341C18.422,0.341,0,18.743,0,41.362C0,63.991,18.422,82.4,41.066,82.4 c22.626,0,41.033-18.41,41.033-41.038C82.1,18.743,63.692,0.341,41.066,0.341z"/>
                <path id="XMLID_804_" d="M230.454,94.761c-24.995,0-43.472,10.745-54.679,22.954V104.73c0-2.761-2.238-5-5-5h-59.599 c-2.762,0-5,2.239-5,5v199.928c0,2.762,2.238,5,5,5h62.097c2.762,0,5-2.238,5-5v-98.918c0-33.333,9.054-46.319,32.29-46.319 c25.306,0,27.317,20.818,27.317,48.034v97.204c0,2.762,2.238,5,5,5H305c2.762,0,5-2.238,5-5V194.995 C310,145.43,300.549,94.761,230.454,94.761z"/>
            </g>
        </symbol>
        <symbol id="edit" viewBox="0 0 1280.000000 640.000000">
            <g transform="translate(0.000000,640.000000) scale(0.100000,-0.100000)" stroke="none">
                <path d="M11560 5640 c-745 -189 -1215 -311 -1222 -318 -10 -10 684 -2406 703 -2426 5 -6 106 15 251 53 237 60 259 68 875 314 l633 252 0 199 0 199 -106 361 c-142 484 -397 1315 -430 1399 l-26 67 -146 -1 -147 -1 -385 -98z"/>
                <path d="M10100 5269 c-13 -6 -26 -11 -27 -13 -3 -3 285 -1088 503 -1891 70 -258 132 -489 137 -512 8 -33 15 -43 30 -43 24 0 99 21 110 31 5 3 -21 107 -58 230 -77 260 -139 465 -531 1782 -70 235 -130 427 -133 426 -3 0 -17 -5 -31 -10z"/>
                <path d="M9806 5194 c-46 -11 -859 -222 -1381 -359 -49 -13 -171 -44 -270 -70 -149 -39 -941 -246 -1200 -315 -38 -10 -304 -80 -590 -155 -286 -75 -630 -167 -765 -205 -135 -38 -373 -105 -530 -149 -916 -257 -1153 -324 -2205 -621 -313 -88 -632 -178 -709 -200 -76 -22 -141 -42 -145 -45 -3 -4 15 -48 41 -98 46 -91 47 -94 64 -255 l16 -162 -59 -73 c-76 -93 -207 -264 -265 -347 -34 -48 -60 -106 -101 -225 -31 -88 -59 -167 -62 -176 -7 -19 199 -255 243 -278 15 -8 140 -66 277 -128 138 -63 253 -117 257 -121 6 -6 37 -272 53 -454 6 -64 10 -78 24 -78 20 0 347 57 576 101 88 17 225 48 305 69 80 21 334 89 565 150 231 61 606 160 833 221 226 60 600 159 830 220 229 61 593 157 807 214 1887 500 4202 1119 4208 1125 8 7 -84 308 -358 1175 -34 110 -136 434 -225 720 -90 286 -166 523 -169 526 -3 4 -33 0 -65 -7z"/>
                <path d="M1038 2262 l-646 -647 18 -71 c10 -39 32 -142 50 -230 17 -87 34 -172 38 -188 l7 -30 490 -122 c773 -192 1286 -316 1290 -312 2 2 5 87 5 188 1 146 -1 185 -12 188 -27 8 -245 106 -319 143 -42 21 -85 49 -95 61 -23 28 -194 173 -246 208 -32 22 -45 44 -99 170 l-61 145 6 115 c13 220 -12 175 242 440 l224 234 0 86 -1 85 -86 65 c-48 36 -103 77 -123 92 l-36 27 -646 -647z"/>
                <path d="M120 1345 c-63 -63 -111 -117 -108 -121 7 -6 196 -56 261 -68 l37 -7 0 102 c0 95 -2 105 -31 155 -17 30 -34 54 -37 54 -4 0 -59 -52 -122 -115z"/>
            </g>
        </symbol>
        <symbol id="delete" viewBox="0 0 1280.000000 1226.000000">
            <g transform="translate(0.000000,1226.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
                <path d="M1374 11287 c-748 -535 -1361 -976 -1363 -980 -3 -8 953 -876 3616 -3285 606 -548 1100 -1002 1098 -1009 -3 -9 -4304 -5395 -4513 -5650 l-34 -43 143 51 c144 51 254 77 2209 519 195 44 522 118 726 164 l371 84 1612 1473 c887 811 1616 1474 1620 1474 7 0 803 -719 3936 -3557 l580 -526 3 65 c3 56 5 63 18 52 8 -6 16 -10 17 -8 2 2 88 303 191 669 103 366 223 788 266 937 l77 273 -362 422 c-2246 2625 -2875 3362 -2875 3367 0 3 920 847 2045 1875 l2045 1869 -93 64 c-50 34 -778 530 -1617 1102 -1109 755 -1528 1036 -1538 1028 -9 -7 -33 8 -88 53 -63 53 -78 60 -89 49 -7 -8 -643 -803 -1414 -1766 -770 -964 -1404 -1753 -1409 -1752 -4 0 -34 33 -68 72 -54 64 -943 1103 -2582 3020 -305 356 -557 647 -562 647 -4 0 -62 -43 -130 -96 -68 -53 -126 -91 -129 -86 -7 10 -343 402 -345 402 0 0 -613 -438 -1362 -973z"/>
            </g>
        </symbol>
        <symbol id="plus" viewBox="0 0 24 24"stroke="inherit">
            <path d="M6 12H18" stroke="inherit" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 18V6" stroke="inherit" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </symbol>
        <symbol viewBox="0 0 24 24" id="back" stroke="inherit">
            <path d="M9.57 5.92993L3.5 11.9999L9.57 18.0699" stroke="inherit" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M20.5 12H3.67004" stroke="inherit" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        </symbol>
    </svg>
</body>
</html>
