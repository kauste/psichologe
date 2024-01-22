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
import SecondSection from './firstPage/front/secondSection';
// from back
import FirstSection from './firstPage/back/sections/firstSection';
import SecondSectionUpdate from './firstPage/back/sections/secondSection';
import { ThirdAndFourthSection } from './firstPage/back/sections/thirdAndFourthSection';
import TopMessage from './firstPage/back/parts/topMessage';
import NavStyles from './nav';

new NavStyles('.--nav', '#fff', '#E9C1C8');
if(document.querySelector('.about--me--page')){
    // sec 1
    // const firstSecAnimation = new FirstSecAnimation()
    // new FirstSection(cssStyles, firstSecAnimation);
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

