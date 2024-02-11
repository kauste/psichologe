import 'bootstrap';
import axios from 'axios';
window.axios = axios;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
import Swiper from 'swiper';
import { Navigation, Autoplay, EffectFade } from 'swiper/modules';

// parts
import cssStyles from './back/parts/cssStyles';
// form back and front'
import './backAndFront/appBackAndFront';
import ListSwiper from './backAndFront/firstPage/listSwiper';
// from back
import SecondSectionUpdate from './back/firstPage/secondSection';
import { ThirdAndFourthSection } from './back/firstPage/thirdAndFourthSection';
import TopMessage from './back/parts/topMessage';
import Citations from './back/firstPage/citations';


// firt page
if(document.querySelector('.about--me--page')){
    // sec 1
    const citationSwiper = new Swiper('.citations--swiper', {
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
    new Citations(cssStyles, 'citation', citationUpdateRoute, citationStoreRoute, citationDeleteRoute, citationSwiper);
    // sec 2
    new SecondSectionUpdate('#about', new TopMessage);
    // sec 3
    new ThirdAndFourthSection(cssStyles, 'education', educationUpdateRoute, educationStoreRoute, educationDeleteRoute, new ListSwiper('#education'))
    //sec4
    new ThirdAndFourthSection(cssStyles, 'work', workUpdateRoute, workStoreRoute, workDeleteRoute, new ListSwiper('#work'))
}

