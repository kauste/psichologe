import 'bootstrap';
import axios from 'axios';
window.axios = axios;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
import Swiper from 'swiper';
import { Navigation, Autoplay, EffectFade } from 'swiper/modules';

// form back and front'
import './backAndFront/appBackAndFront';
import ListSwiper from './backAndFront/firstPage/listSwiper';

// firt page
if(document.querySelector('.about--me--page')){
    // sec 1
    new Swiper('.citations--swiper', {
        speed: 1000,
        loop: true,
        autoplay:{
            delay:20000,
            pauseOnMouseEnter:true,
        },
        slidesPerView: 'auto',
        modules: [ Navigation, Autoplay, EffectFade ],
        wrapperClass: 'swiper-wrapper',
        navigation: {
            nextEl: '.swiper-button-next',
          },
        effect: 'fade',
        fadeEffect: {
            crossFade: true,
          },
          centeredSlides:true,

      });
    // sec 3
    new ListSwiper('#education')
    // sec 4
    new ListSwiper('#work')

}
// articles page
if(document.querySelector('.articles--page') 
|| document.querySelector('.article--page')){
    // const articlesTagsNav = new NavStyles('.tags--nav', '#EFEFEF', '#E9C1C8', '19px', '19.2px', '0')
    // articlesTagsNav.animation();

}


