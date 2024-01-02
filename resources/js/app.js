import 'bootstrap';
import axios from 'axios';
import navigation from './nav';
import { SecondSection } from './firstPage/front/secondSection';
import { secondSectionUpdate } from './firstPage/back/secondSection';
import { ThirdAndFourthSection } from './firstPage/back/thirdAndFourthSection';
import { FirstSection } from './firstPage/back/firstSection';
import FirstSecAnimation from './firstPage/front/firstSection';
import ListSwiper from './firstPage/front/thirdAndFourthSection';
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

navigation();
if(document.querySelector('.page--1')){
    new FirstSecAnimation();
    new SecondSection('.section--2')
    new ListSwiper('.section--3')
    new ListSwiper('.section--4')


    // new ThirdAndFourthSec('.--education');
    // new ThirdAndFourthSec('.--work')
}
if(document.querySelector('.back--office')){
    if(document.querySelector('.page--1')){
        secondSectionUpdate();
        new ThirdAndFourthSection('education');
        new ThirdAndFourthSection('work');
        new FirstSection('profilePic');


    }
}
