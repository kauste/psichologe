import 'bootstrap';
import axios from 'axios';
window.axios = axios;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
import Swiper from 'swiper';
import { Navigation, Autoplay, EffectFade } from 'swiper/modules';

// parts
import cssStyles from './back/parts/cssStyles';
// form back and front'
import './backAndFront/appBackAndFront';
import ListSwiper from './backAndFront/firstPage/listSwiper';
// from back
import SecondSectionUpdate from './back/firstPage/secondSection';
import TopMessage from './back/parts/topMessage';
import { FileInputsActivator } from './back/parts/fileInputsActivator';
import AddItem from './back/articlesPages/addItem';
import DeleteItems from './back/articlesPages/deleteItems';
import CreateArticle from './back/articlesPages/createArticle';
import EditArticle from './back/articlesPages/editArticle';
import Services from './back/servicesPage/services';
import { CRUDmodal } from './back/parts/CRUDmodal';

// firt page
if(document.querySelector('.about--me--page')){
    // sec 1
    const citationSwiper = new Swiper('.citations--swiper', {
        speed: 1000,
        loop: true,
        autoplay:{
            delay:20000,
            pauseOnMouseEnter:true,
        },
        slidesPerView: 'auto',
        modules: [ Navigation, Autoplay, EffectFade ],
        wrapperClass: 'swiper-wrapper',
        navigation: {
            nextEl: '.swiper-button-next',
          },
        effect: 'fade',
        fadeEffect: {
            crossFade: true,
          },
          centeredSlides:true,

      });
    new CRUDmodal(cssStyles, 'citation', citationStoreRoute, citationUpdateRoute, citationDeleteRoute, citationSwiper);
    // sec 2
    new SecondSectionUpdate('#about', new TopMessage);
    // sec 3
    new CRUDmodal(cssStyles, 'education', educationStoreRout, educationUpdateRoutee, educationDeleteRoute, new ListSwiper('#education'))
    //sec4
    new CRUDmodal(cssStyles, 'work', workStoreRoute, workUpdateRoute, workDeleteRoute, new ListSwiper('#work'))
}
else if(document.querySelector('.articles--page')){
  new CRUDmodal(cssStyles, 'tagsNav', articlesTagStoreRoute, articlesTagUpdateRoute, articlesTagDeleteRoute, null);
  new DeleteItems('.articles--box');
  const topMsg = new TopMessage;
  topMsg.showLaraMsg();
}
else if (document.querySelector('.article--page')){
  new DeleteItems('.edit--actions');
}
else if(document.querySelector('.article--create')){
  new FileInputsActivator();
  new AddItem('.tags--box', '.add--btn', 'select', 'added--tags')
  new CreateArticle;
}
else if(document.querySelector('.article--edit')){
  new FileInputsActivator();
  const addTags = new AddItem('.tags--box', '.add--btn', 'select', 'added--tags');
  addTags.letExistingTagsDelete();
  new EditArticle;
}
else if(document.querySelector('.services--list')){
  new CRUDmodal(cssStyles, 'service', serviceStoreRoute, serviceUpdateRoute, serviceDeleteRoute, null)
}

