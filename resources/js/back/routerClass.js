import Swiper from 'swiper';
import { Navigation, Autoplay, EffectFade } from 'swiper/modules';
import { ToggleItems } from './toggltem';
import Msg from './msg';
import ListSwiper from '../backAndFront/firstPage/listSwiper';
import { InputItemManager, SelectItemManager } from './listItemManager ';
import ModalActivaror from './modal/modalActivator';


class Router{
    constructor(){
        this.route();
    }
    currentPage(selector){
      return !!document.querySelector(selector); 
    }
    route(){
        switch(true){
            case(this.currentPage('.about--me--page')):
                this.firstPage();
                break;
            case(this.currentPage('.articles--page')):
                this.articlesPage();
                break;
            case(this.currentPage('.article--page')):
                this.articlePage();
                break;
            case(this.currentPage('.article--edit')):
                this.articleEditPage();
                break;
                case(this.currentPage('.article--create')):
                this.articleCreatePage();
                break;
            case(this.currentPage('.services--list')):
                this.servicesPage();
                break;
            case(this.currentPage('.contact--modal--box')):
                this.contactsPage();
                break;
        }
    }
    firstPage(){
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
        const citationsModalActivator = new ModalActivaror('citation',
                                                            '.citation--modal--box .ul--box',
                                                            citationStoreRoute, 
                                                            citationUpdateRoute, 
                                                            citationDeleteRoute, 
                                                            citationSwiper);
        citationsModalActivator.activateModalNavigation();
        citationsModalActivator.activateItemsToggler();

        // new SecondSectionUpdate('#about', new TopMessage);
        const educationsModalActivator = new ModalActivaror('education', 
                                                            '.education--modal--box .ul--box',
                                                            educationStoreRoute, 
                                                            educationUpdateRoute, 
                                                            educationDeleteRoute, 
                                                            new ListSwiper('#education'))
        educationsModalActivator.activateModalNavigation();
        educationsModalActivator.activateItemsToggler();

        const workModalActivator = new ModalActivaror('work',
                                                      '.work--modal--box .ul--box',
                                                      workStoreRoute, 
                                                      workUpdateRoute, 
                                                      workDeleteRoute, 
                                                      new ListSwiper('#work'))
        workModalActivator.activateItemsToggler();
        workModalActivator.activateModalNavigation();
    }
    articlesPage(){
        const tagsNavModalActivator = new ModalActivaror('tagsNav',
                                                          '.tagsNav--modal--box .ul--box',
                                                          articlesTagStoreRoute, 
                                                          articlesTagUpdateRoute, 
                                                          articlesTagDeleteRoute, 
                                                          null);
        tagsNavModalActivator.activateModalNavigation();
        tagsNavModalActivator.activateItemsToggler();
        const boxDOM = document.querySelector('.tagsNav--modal--box .--form .list--box')
        new SelectItemManager(boxDOM)
        new Msg('body');
        new ToggleItems('.articles--box', 
                        '.edit--actions .--delete', 
                        '.delete--actions',
                        'let--delete'
                        );

    }
    articlePage(){
        new ToggleItems('.one--item',
                        '.edit--actions .--delete', 
                        '.delete--actions',
                        'let--delete'
                        );
    }
    articleCreatePage(){
        const listDOM = document.querySelector('.list--box');
        new SelectItemManager(listDOM)
    }
    articleEditPage(){
        const listDOM = document.querySelector('.list--box');
        new SelectItemManager(listDOM).letRemoveItems()
    }
    servicesPage(){
        const modalActivaror = new ModalActivaror('service', 
                                                   '.service--modal--box .ul--box',
                                                   serviceStoreRoute, 
                                                   serviceUpdateRoute, 
                                                   serviceDeleteRoute, 
                                                   null);
        modalActivaror.activateModalNavigation();
        modalActivaror.activateItemsToggler();
        const boxDOM = document.querySelector('.service--modal--box .--form .list--box')
        new InputItemManager(boxDOM)
    }
    contactsPage(){

    }
}
export default Router;