import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

class LimitedSwiper{
    constructor(selector, direction, slidesPerView, slidesPerGroup, isResponsive){
        this.selector = selector;
        this.slidesPerView = slidesPerView;
        this.slidesPerGroup = slidesPerGroup;
        this.direction = direction;
        this.isResponsive = isResponsive;
        this.parentDOM;
        this.nextBtnDOM;
        this.prevBtnDOM;
        this.swiper = null;
        this.init();
    }
    init(){
        this.setDOMS();
        if(this.shouldSlide()){
            this.createSwiper();
        }
        else{
            this.nextBtnDOM.classList.add('d--none')
            this.prevBtnDOM.classList.add('d--none')
        }
    }
    setDOMS(){
        this.parentDOM = document.querySelector(this.selector);
        this.nextBtnDOM = this.parentDOM.querySelector('.swiper-button-next');
        this.prevBtnDOM = this.parentDOM.querySelector('.swiper-button-prev');
    }
    shouldSlide(){
        return this.parentDOM.querySelectorAll('.swiper-slide').length > this.slidesPerView

    }
    createSwiper(){
        this.swiper = new Swiper(this.selector + ' .--swiper', {
            direction: this.direction,
            // speed: 900,
            modules: [ Navigation ],
            initialSlide: 0,
            slidesPerView: this.isResponsive ? this.slidesPerView - 2 : this.slidesPerView,
            slidesPerGroup: this.isResponsive ? this.slidesPerGroup - 2 : this.slidesPerGroup,

            breakpoints:{
                900: {
                    slidesPerView: this.slidesPerView,
                    slidesPerGroup: this.slidesPerGroup,
                },
                540 :{
                    slidesPerView: this.isResponsive ? this.slidesPerView - 1 : this.slidesPerView,
                    slidesPerGroup: this.isResponsive ? this.slidesPerGroup - 1 : this.slidesPerGroup,
                }
            },
            // loop: false,
            spaceBetween:10,
            navigation: {
                nextEl: `${this.selector} .swiper-button-next`,
                prevEl: `${this.selector} .swiper-button-prev`,
                },
            on:{
                fromEdge: () => this.swiper.previousIndex && this.swiper.activeIndex < this.swiper.previousIndex ? this.prevBtnDOM.classList.remove('--disabled') : this.nextBtnDOM.classList.remove('--disabled'),
                reachEnd : () => this.nextBtnDOM.classList.add('--disabled'),
                reachBeginning : () => this.prevBtnDOM.classList.add('--disabled'),
            }
        });
    }
    update(){
        setTimeout(() => {
            if(this.swiper){
                this.swiper.update();
            }
            else if(this.shouldSlide()){
                this.nextBtnDOM.classList.remove('d--none')
                this.prevBtnDOM.classList.remove('d--none')
                this.createSwiper();
            }
        }, 0);

    }

}
export default LimitedSwiper;