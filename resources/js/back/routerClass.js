import Msg from './msg';
import ModalActivaror from './modal/modalActivator';
import CRUDactivator from '../CRUD/CRUDactivator';
import CrossFadeSwiper from '../animations/firstPage/crossFadeSwiper';
import LimitedSwiper from '../animations/limitedSwiper';

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
        new ModalActivaror('citation',
                           {
                               activateModalNavigation:true,
                               activateCRUD:{
                                    CRUDactivations:{
                                        activateEdits:true,
                                        activateDeletes:true,
                                        activateCreate:true,
                                    },
                                    CRUDoptionalFeatures:null,
                               },
                           },
                           new CrossFadeSwiper('.citations--swiper'))
        

        new CRUDactivator(  'about',
                             document,
                            { activateEdit:[document.querySelector('#about .--item')] },
                         );
        new ModalActivaror('education', 
                            {
                                activateModalNavigation:true,
                                activateCRUD:{
                                    CRUDactivations:{
                                        activateEdits:true,
                                        activateDeletes:true,
                                        activateCreate:true,
                                    },
                                    CRUDoptionalFeatures:null,
                               },
                            },
                            new LimitedSwiper('#education', 'vertical', 5, 5));

        new ModalActivaror('work',
                           {
                               activateModalNavigation:true,
                               activateCRUD:{
                                    CRUDactivations:{
                                        activateEdits:true,
                                        activateDeletes:true,
                                        activateCreate:true,
                                    },
                                    CRUDoptionalFeatures:null,
                                },
                           },
                           new LimitedSwiper('#work', 'vertical', 5, 5))

    }
    articlesPage(){
        new Msg(document);
        new ModalActivaror('tagsNav',
                           {
                               activateModalNavigation:true,
                               activateCRUD:{
                                    CRUDactivations:{
                                        activateEdits:true,
                                        activateDeletes:true,
                                        activateCreate:true,
                                    },
                                    CRUDoptionalFeatures:{
                                        lists:true
                                    },
                                },


                           });

        new CRUDactivator(  null,
                            document.querySelector('#articles'),
                            { activateDeletes:true },
                         );

    }
    articlePage(){
        new CRUDactivator(  null,
                            document,
                            { activateDeletes:true },
                         );
    }
    articleCreatePage(){
        const imgRatio = 400 / 828;
        new CRUDactivator('article',
                           document,
                            { activateCreate:true },
                            {
                                lists:true,
                                images:imgRatio,
                            },
                            null,
                          );
        
    }
    articleEditPage(){
        const imgRatio = 400 / 828;

        new CRUDactivator( 'article',
                           document,
                           { activateEdits:true },
                           {
                               lists:true,
                               images:imgRatio,
                           }
                        );
    }
    servicesPage(){
        new ModalActivaror('service',
                            {activateModalNavigation:true,
                                activateCRUD:{
                                    CRUDactivations:{
                                        activateEdits:true,
                                        activateDeletes:true,
                                        activateCreate:true,
                                    },
                                    CRUDoptionalFeatures:{
                                        lists:true
                                    },
                                },
                            } );

    }
    contactsPage(){
        const imgRatio = 0.75 ;
        new ModalActivaror('contact',
                            {activateCRUD:
                                {
                                    CRUDactivations:{
                                        activateEdit:[document.querySelector('.contact--modal--box .one--item')],
                                    },
                                    CRUDoptionalFeatures:{
                                        images:imgRatio,
                                    }
                                },
                            } );
        
    }
}
export default Router;