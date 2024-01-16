import 'bootstrap';
import axios from 'axios';
import navigation from './nav';
import { FirstSecAnimation, FirstSection } from './firstPage/back/firstSection';
import { SecondSection, secondSectionUpdate } from './firstPage/back/secondSection';
import cssStyles from './firstPage/back/cssStyles';
import { ThirdAndFourthSection } from './firstPage/back/thirdAndFourthSection';
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

navigation();
if(document.querySelector('.page--1')){
    const firstSecAnimation = new FirstSecAnimation()
    new FirstSection(cssStyles, firstSecAnimation);
    
    // new ThirdAndFourthSection(cssStyles, 'education')
    // new SecondSection('.section--2')
    // new ThirdAndFourthSecAppear('education')
    // new ListSwiper('.section--3')


    // new ThirdAndFourthSecAppear('.section--4')
    // new ListSwiper('.section--4')

}
if(document.querySelector('.back--office')){
    if(document.querySelector('.page--1')){
        secondSectionUpdate();
        // new ThirdAndFourthSection('education');
        // new ThirdAndFourthSection('work');


    }
}
