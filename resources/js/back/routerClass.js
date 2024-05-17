import Swiper from 'swiper';
import { Navigation, Autoplay, EffectFade } from 'swiper/modules';
import { ItemsActivator } from './itemsActivator';
import Msg from './msg';
import ListSwiper from '../backAndFront/firstPage/listSwiper';
import { InputListManager, SelectListManager } from './listItemManager ';
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
        new ModalActivaror('citation',
                           {
                               activateModalNavigation:true,
                               activateEdit:citationUpdateRoute,
                               activateDelete:citationDeleteRoute,
                               activateCreate:citationStoreRoute,
                           },
                           citationSwiper);

        // new SecondSectionUpdate('#about', new TopMessage);
        new ModalActivaror('education', 
                            {
                                activateModalNavigation:true,
                                activateEdit:educationUpdateRoute,
                                activateDelete:educationDeleteRoute,
                                activateCreate:educationStoreRoute,
                            },
                            new ListSwiper('#education'))

        new ModalActivaror('work',
                           {
                               activateModalNavigation:true,
                               activateEdit:workUpdateRoute,
                               activateDelete:workDeleteRoute,
                               activateCreate:workStoreRoute,
                           },
                             new ListSwiper('#work'))

    }
    articlesPage(){
        new Msg(document);
        new ModalActivaror('tagsNav',
                           {
                               activateModalNavigation:true,
                               activateEdit:articlesTagUpdateRoute,
                               activateDelete:articlesTagDeleteRoute,
                               activateCreate:articlesTagStoreRoute,
                               activateLists:{ select:true },
                           });
        // const boxDOM = document.querySelector('.tagsNav--modal--box .--form .list--box')
        // new SelectListManager(boxDOM)
        new ItemsActivator('delete',
                           document,
                           {
                                actionsParentSelector:'.articles--box .--actions',
                                openBtnSelector:'.edit--actions .--delete', 
                                cancelBtnSelector:'.delete--actions .--cancel',
                                actionBtnSelector:'.delete--actions .--delete'
                           },
                          );

    }
    articlePage(){
        new ItemsActivator('delete',
                            document,
                            {
                                actionsParentSelector:'.one--item .--actions',
                                openBtnSelector:'.edit--actions .--delete', 
                                cancelBtnSelector:'.delete--actions .--cancel',
                                actionBtnSelector:'.delete--actions .--delete'
                            },
                          );
    }
    articleCreatePage(){
        const listDOM = document.querySelector('.list--box');
        new SelectListManager(listDOM).letRemoveItems()
        new ItemsActivator('edit',
                            document,
                            {
                                actionsParentSelector:'.--form',
                                openBtnSelector:null, 
                                cancelBtnSelector:'.store--actions .--cancel',
                                actionBtnSelector:'.store--actions .--store'
                            },
                            articleUpdateRoute,
                            { select:true  },
                          )
    }
    articleEditPage(){
        const listDOM = document.querySelector('.list--box');
        new SelectListManager(listDOM).letRemoveItems()
        new ItemsActivator('edit',
                            document,
                            {
                                actionsParentSelector:'.--form',
                                openBtnSelector:null, 
                                cancelBtnSelector:'.update--actions .--cancel',
                                actionBtnSelector:'.update--actions .--update'
                            },
                            articleUpdateRoute,
                            { select:true  },
                            
                        );
    }
    servicesPage(){
        new ModalActivaror('service',
                           {
                               activateModalNavigation:true,
                               activateEdit:serviceUpdateRoute,
                               activateDelete:serviceDeleteRoute,
                               activateCreate:serviceStoreRoute,
                               activateLists: { input:true },
                           });

    }
    contactsPage(){

    }
}
export default Router;