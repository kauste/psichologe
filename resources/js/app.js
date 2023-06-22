import 'bootstrap';
import axios from 'axios';
import navigation from './nav';
import firstSectionAnimation from './firstPage/firstSectionAnimation';
import secondSection from './firstPage/secondSection';
import thirdAndFourthSection from './firstPage/thirdAndFourthSection';
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

navigation();
if(document.querySelector('.page--1')){
    firstSectionAnimation();
    secondSection();
    thirdAndFourthSection();
}
