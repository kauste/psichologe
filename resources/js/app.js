import 'bootstrap';
import axios from 'axios';
import navigation from './nav';
import { SecondSection } from './firstPage/front/secondSection';
import FirstSecAnimation from './firstPage/front/firstSection';
import { ListSwiper, ThirdAndFourthSecAppear } from './firstPage/front/thirdAndFourthSection';
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

navigation();
if(document.querySelector('.page--1')){
    // new FirstSecAnimation();
    new SecondSection('.section--2')
    new ThirdAndFourthSecAppear('.section--3')
    new ListSwiper('.section--3')
    new ThirdAndFourthSecAppear('.section--4')
    new ListSwiper('.section--4')

}

