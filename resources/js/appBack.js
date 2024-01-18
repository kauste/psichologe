import 'bootstrap';
import axios from 'axios';
window.axios = axios;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
// parts
import navigation from './nav';
import cssStyles from './firstPage/back/parts/cssStyles';
// from front
import FirstSecAnimation from './firstPage/front/firstSection';
import { ListSwiper, ThirdAndFourthSecAppear } from './firstPage/front/thirdAndFourthSection';
// from back
import FirstSection from './firstPage/back/sections/firstSection';
import { SecondSection, secondSectionUpdate } from './firstPage/back/sections/secondSection';
import { ThirdAndFourthSection } from './firstPage/back/sections/thirdAndFourthSection';


navigation();
if(document.querySelector('.page--1')){
    // sec 1
    const firstSecAnimation = new FirstSecAnimation()
    new FirstSection(cssStyles, firstSecAnimation);
    // sec 2
    // new SecondSection('.section--2')

    // sec 3
    new ThirdAndFourthSecAppear('#education')
    // new ListSwiper('#education')
    new ThirdAndFourthSection(cssStyles, 'education', educationUpdateRoute, educationStoreRoute, educationDeleteRoute, new ListSwiper('#education'))

    //sec4
    // new ThirdAndFourthSecAppear('#work')
    // new ListSwiper('#work')
    // new ThirdAndFourthSection(cssStyles, 'work', workUpdateRoute, workStoreRoute, workDeleteRoute)



}
if(document.querySelector('.back--office')){
    if(document.querySelector('.page--1')){
        secondSectionUpdate();
        // new ThirdAndFourthSection('education');
        // new ThirdAndFourthSection('work');


    }
}
