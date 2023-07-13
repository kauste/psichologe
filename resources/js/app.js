import 'bootstrap';
import axios from 'axios';
import navigation from './nav';
import firstSectionAnimation from './firstPage/front/firstSection';
import { SecondSection } from './firstPage/front/secondSection';
import { ThirdAndFourthSec } from './firstPage/front/thirdAndFourthSection';
import { secondSectionUpdate } from './firstPage/back/secondSection';
import { ThirdAndFourthSection } from './firstPage/back/thirdAndFourthSection';
import { FirstSection } from './firstPage/back/firstSection';
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

navigation();
if(document.querySelector('.page--1')){
    firstSectionAnimation();
    new SecondSection('.section--2')
    new ThirdAndFourthSec('.--education');
    new ThirdAndFourthSec('.--work')
}
if(document.querySelector('.back--office')){
    if(document.querySelector('.page--1')){
        secondSectionUpdate();
        new ThirdAndFourthSection('education');
        new ThirdAndFourthSection('work');
        new FirstSection('profilePic');


    }
}
