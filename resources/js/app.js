import 'bootstrap';
import axios from 'axios';
import NavStyles from './nav';
import FirstSecAnimation from './firstPage/front/firstSection';
import SecondSection from './firstPage/front/secondSection';
import { ListSwiper, ThirdAndFourthSecAppear } from './firstPage/front/thirdAndFourthSection';
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

new NavStyles('.--nav', '#17453F', '#17453F');
if(document.querySelector('.about--me--page')){
    // new FirstSecAnimation();
    new SecondSection('#about')
    // sec 3
    new ThirdAndFourthSecAppear('#education')
    new ListSwiper('#education')
    // sec 4
    new ThirdAndFourthSecAppear('#work')
    new ListSwiper('#work')

}
if(document.querySelector('.articles--page')){
    new NavStyles('.tags--nav', '#EFEFEF', '#E9C1C8')
}

