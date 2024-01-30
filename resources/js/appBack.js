import 'bootstrap';
import axios from 'axios';
window.axios = axios;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

import { Navigation, Autoplay, EffectFade } from 'swiper/modules';

// parts
import cssStyles from './firstPage/back/parts/cssStyles';
// from front
import { ListSwiper, ThirdAndFourthSecAppear } from './firstPage/front/thirdAndFourthSection';
import SecondSection from './firstPage/front/secondSection';
// from back
import SecondSectionUpdate from './firstPage/back/firstPage/secondSection';
import { ThirdAndFourthSection } from './firstPage/back/firstPage/thirdAndFourthSection';
import TopMessage from './firstPage/back/parts/topMessage';
import NavStyles from './nav';
import Swiper from 'swiper';
import Citations from './firstPage/back/firstPage/citations';


// footer animations
const footerNavAnimation = new NavStyles('.footer--nav', '#161616', '#17453F', '17px', '17.2px', '0');
footerNavAnimation.setNavStyles();
footerNavAnimation.animation();
// contact animation
const contactAnimation = new NavStyles('.--contacts', '#161616', '#161616',  '16px', '16px', '3px');
contactAnimation.animation();

// firt page
if(document.querySelector('.about--me--page')){
    // nav
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
    new Citations(cssStyles, 'citation', citationUpdateRoute, citationStoreRoute, citationDeleteRoute);
    // sec 2

    new SecondSection('#about')
    new SecondSectionUpdate('#about', new TopMessage);
    // sec 3
    new ThirdAndFourthSecAppear('#education')
    new ThirdAndFourthSection(cssStyles, 'education', educationUpdateRoute, educationStoreRoute, educationDeleteRoute, new ListSwiper('#education'))
    //sec4
    new ThirdAndFourthSecAppear('#work')
    new ThirdAndFourthSection(cssStyles, 'work', workUpdateRoute, workStoreRoute, workDeleteRoute, new ListSwiper('#work'))
}

