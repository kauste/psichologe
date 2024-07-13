import { MobileNav, NavStyles }from './nav';
import AppearOnScroll from './firstPage/appearOnScroll';
import BambooAnim from './firstPage/bambooAnim';
import LimitedSwiper from './limitedSwiper';


class AnimationRouter{
    constructor(){
        this.route();
        new MobileNav('.--nav', '.nav--toggle');
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
            case(this.currentPage('.services--list')):
                this.servicesPage();
                break;
            case(this.currentPage('.contacts--page')):
                this.contactsPage();
                break;
            case(this.currentPage('.registration--page')):
                this.registrationPage();
                break;
            case(this.currentPage('.registration--unable--page') || this.currentPage('.registered--page')):
                this.registeredOrUnablePage();
                break;
            case(this.currentPage('.article--edit')):
                this.articleEditPage();
                break;
            case(this.currentPage('.article--create')):
                this.articleCreatePage();
                break;

        }
    }
   darkFooterAnimation (){
        const footerNavAnimation = new NavStyles('.footer--nav', '#161616', '#17453F', '18px', '20.2px', '0');
        footerNavAnimation.setNavStyles();
        footerNavAnimation.animation();
    }
    lightFooterAnimation (){
        const footerNavAnimation = new NavStyles('.footer--nav', '#E8E3D7', '#E9C1C8', '18px', '20.2px', '0');
        footerNavAnimation.setNavStyles();
        footerNavAnimation.animation();
    }
    darkContactsAnimation(){
        const contactAnimation = new NavStyles('.--contacts', '#161616', '#161616',  '16px', '16px', '3px');
        contactAnimation.animation();
    }
    lightContactsAnimation(){
        const contactAnimation = new NavStyles('.--contacts', '#E8E3D7', '#E8E3D7',  '16px', '16px', '3px');
        contactAnimation.animation();
    }
    navAnimation(fromHex, toHex){
        const navAnimation = new NavStyles('.--nav', fromHex, toHex,  '22px', '18.2px', '0');
        navAnimation.setNavStyles();
        navAnimation.animation();
    }
    greenNavAnimation = () => this.navAnimation('#17453F', '#17453F')

    whitePinkNavAnimation = () => this.navAnimation('#EFEFEF', '#E9C1C8')

    articlesTagsAnimation () {
        const articlesTagsNav = new NavStyles('.tags--nav', '#EFEFEF', '#E9C1C8', '19px', '19.2px', '0')
        articlesTagsNav.animation();
    }
    mediaLinkAnimation () {
        const articlesToMedia = new NavStyles('.media--link--box', '#17453F', '#17453F', '18px', '18px', '0')
        articlesToMedia.setNavStyles();
        articlesToMedia.animation();
    }
    firstPage(){
        this.greenNavAnimation();
        new BambooAnim('#about')
        new AppearOnScroll('#education')
        new AppearOnScroll('#work')
        this.darkFooterAnimation();
        this.darkContactsAnimation();
    }
    articlesPage(){
        this.whitePinkNavAnimation();
        this.articlesTagsAnimation();
        this.lightFooterAnimation();
        this.lightContactsAnimation();
        new MobileNav('.tags--nav--box', '.toggle--btn');

    }
    articlePage(){
        this.greenNavAnimation();
        this.articlesTagsAnimation();
        if(document.querySelector('.media--link--box')) this.mediaLinkAnimation();
        this.lightFooterAnimation();
        this.lightContactsAnimation();
        new MobileNav('.tags--nav--box', '.toggle--btn');

    }
    servicesPage(){
        this.greenNavAnimation();
        this.darkFooterAnimation();
        this.darkContactsAnimation();
    }
    contactsPage(){
        this.greenNavAnimation();
        this.darkFooterAnimation();
        this.darkContactsAnimation();
    }
    registrationPage(){
        this.greenNavAnimation();
        this.darkFooterAnimation();
        new LimitedSwiper('.--callendar', 'horizontal', 1, 1);
        this.darkContactsAnimation();
    }
    registeredOrUnablePage(){
        this.greenNavAnimation();
        this.darkFooterAnimation();
        this.darkContactsAnimation();
    }
    articleEditPage(){
        this.whitePinkNavAnimation();
        this.lightFooterAnimation();
        this.lightContactsAnimation();
    }
}
export default AnimationRouter;