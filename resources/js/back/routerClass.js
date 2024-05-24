import Swiper from 'swiper';
import { Navigation, Autoplay, EffectFade } from 'swiper/modules';
import Msg from './msg';
import ListSwiper from '../backAndFront/firstPage/listSwiper';
import ModalActivaror from './modal/modalActivator';
import CRUDactivator from './CRUD/activators/CRUDactivator';


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
            case(this.currentPage('.contacts--page')):
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
                               activateCRUD:{
                                    activateEdits:true,
                                    activateDeletes:true,
                                    activateCreate:true,
                               }
                           },
                           citationSwiper);

        // new SecondSectionUpdate('#about', new TopMessage);
        new ModalActivaror('education', 
                            {
                                activateModalNavigation:true,
                                activateCRUD:{
                                    activateEdits:true,
                                    activateDeletes:true,
                                    activateCreate:true,
                               }
                            },
                            new ListSwiper('#education'))

        new ModalActivaror('work',
                           {
                               activateModalNavigation:true,
                               activateCRUD:{
                                    activateEdits:true,
                                    activateDeletes:true,
                                    activateCreate:true,
                                }
                           },
                             new ListSwiper('#work'))

    }
    articlesPage(){
        new Msg(document);
        new ModalActivaror('tagsNav',
                           {
                               activateModalNavigation:true,
                               activateCRUD:{
                                    activateEdits:true,
                                    activateDeletes:true,
                                    activateCreate:true,
                                    activateSelectLists:true,
                                },
                           });

        new CRUDactivator(  null,
                            { activateDeletes:true },
                            document.querySelector('#articles'),
                         );

    }
    articlePage(){
        new CRUDactivator(  null,
                            { activateDeletes:true },
                            document,
                         );
    }
    articleCreatePage(){
        new CRUDactivator(null,
                            { activateCreate:true,
                              activateSelectList:true,
                            },
                            document,
                          );
        
    }
    articleEditPage(){
        new CRUDactivator(  null,
                            {   
                                activateEdits:true,
                                activateSelectList:true,
                            },
                           document,
                         );
    }
    servicesPage(){
        new ModalActivaror('service',
                           {
                               activateModalNavigation:true,
                                activateCRUD:{
                                    activateEdits:true,
                                    activateDeletes:true,
                                    activateCreate:true,
                                    activateInputLists: true,
                                },
                           });

    }
    contactsPage(){
        new ModalActivaror('contact',
                           {
                                activateCRUD:{
                                    activateEdit:[document.querySelector('.contact--modal--box .one--item')],
                                },
                           });
    }
}
export default Router;