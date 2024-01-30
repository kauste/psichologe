import 'bootstrap';
import axios from 'axios';
window.axios = axios;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

import NavStyles from './nav';
import SecondSection from './firstPage/front/secondSection';
import { ListSwiper, ThirdAndFourthSecAppear } from './firstPage/front/thirdAndFourthSection';
import Swiper from 'swiper';
import { Navigation, Autoplay, EffectFade } from 'swiper/modules';




// footer animations
const footerNavAnimation = new NavStyles('.footer--nav', '#161616', '#17453F', '17px', '17.2px', '0');
footerNavAnimation.setNavStyles();
footerNavAnimation.animation();
// contact animation
const contactAnimation = new NavStyles('.--contacts', '#161616', '#161616',  '16px', '16px', '3px');
contactAnimation.animation();

// firt page
if(document.querySelector('.about--me--page')){
    //nav
    const navAnimation = new NavStyles('.--nav', '#17453F', '#17453F',  '17px', '17.2px', '0');
    navAnimation.setNavStyles();
    navAnimation.animation();
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
    //sec 2
    new SecondSection('#about')
    // sec 3
    new ThirdAndFourthSecAppear('#education')
    new ListSwiper('#education')
    // sec 4
    new ThirdAndFourthSecAppear('#work')
    new ListSwiper('#work')

}
// articles page
if(document.querySelector('.articles--page') 
|| document.querySelector('.article--page')){
    const navAnimation = new NavStyles('.--nav', '#EFEFEF', '#E9C1C8',  '17px', '17.2px', '0');
    navAnimation.setNavStyles();
    navAnimation.animation();

    const articlesTagsNav = new NavStyles('.tags--nav', '#EFEFEF', '#E9C1C8', '19px', '19.2px', '0')
    articlesTagsNav.animation();

}
if(document.querySelector('.article--page')){
    const articlesToMedia = new NavStyles('.article--box', '#17453F', '#17453F', '18px', '18px', '0')
    articlesToMedia.setNavStyles();
    articlesToMedia.animation();
}


