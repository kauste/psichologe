import 'bootstrap';
import axios from 'axios';
import navigation from './nav';
import firstSectionAnimation from './firstPage/firstSectionAnimation';
import secondSection from './firstPage/secondSectionDRAFT';
import { ThirdAndFourthSec } from './firstPage/thirdAndFourthSection';
import { SecondSection } from './firstPage/secondSection';
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

navigation();
if(document.querySelector('.page--1')){
    firstSectionAnimation();
    // secondSection();
    new SecondSection('.section--2')
    new ThirdAndFourthSec('.section--3');
    new ThirdAndFourthSec('.section--4')
}
if(document.querySelector('.back--office')){
    if(document.querySelector('.page--1')){
        const section1 = document.querySelector('.section--2')
        const editDOM = section1.querySelector('.--edit')
        const actionsDOM = section1.querySelector('.update--actions')
        const paragraphDOM = section1.querySelector('.--paragraph p')
        editDOM.addEventListener('click', () => {
            actionsDOM.style.display = 'flex';
            paragraphDOM.setAttribute('contenteditable', true)
        })
    }
}
