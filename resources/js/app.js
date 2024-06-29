import 'bootstrap';
import axios from 'axios';
window.axios = axios;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

import AnimationRouter from './animations/animationRouter';
import CrossFadeSwiper from './animations/firstPage/crossFadeSwiper';
import LimitedSwiper from './animations/limitedSwiper';
import CRUDactivator from './CRUD/CRUDactivator';
import AppendSlots from './front/appendSlots';
import CreateActivator from './CRUD/activators/createActivator';

window.onload = function (){
    new AnimationRouter;

    if(document.querySelector('.about--me--page')){
        new CrossFadeSwiper('.citations--swiper');
        new LimitedSwiper('#education', 'vertical', 5, 5);
        new LimitedSwiper('#work', 'vertical', 5, 5);
    }
    if(document.querySelector('.registration-page')){
        const createActivator = new CreateActivator( 'registration',
                                                    document,
                                                    document.querySelector(`.--form`),
                                                    {
                                                        openBtnSelector:null, 
                                                        cancelBtnSelector:null,
                                                        actionBtnSelector:'.store--actions .--store'
                                                    },

                                                 );
        const registrationSwiper = new LimitedSwiper('.--registration', 'horizontal', 1, 1);
        new AppendSlots(registrationSwiper, createActivator);
        

    }
}



