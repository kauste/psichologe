import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
class ThirdAndFourthSecAppear{
    constructor(selector){
        this.selector = selector;
        this.sectionDOM;
        this.secrionappearAnim;
        this.secrionappearOptions;
        this.setVariables();
        this.listenToScroll();

    }
    setVariables(){
        this.sectionDOM = document.querySelector(this.selector);

        this.secrionappearAnim = [
            {opacity:0.5},
            {opacity:1}
        ]
        this.secrionappearOptions = {
            duration: 2000,
            iterations: 1,
            easing: 'ease',
            fill:'forwards'
        }
    }
    onScrollHandler = () => {
        if((this.sectionDOM.getBoundingClientRect().top - window.innerHeight / 3 * 2  <=  0)){
            this.sectionDOM.animate(this.secrionappearAnim, this.secrionappearOptions)
            window.removeEventListener('scroll', this.onScrollHandler);
        }
    }
    listenToScroll(){
        window.addEventListener('scroll', this.onScrollHandler)
        this.onScrollHandler();

    }
}
class ListSwiper{
    constructor(section){
        this.section = section;
        this.swiper;
        this.nextBtn;
        this.prevBtn;
        this.setVariables();
        this.initialiseSwiper();
        this.onSlideChange();
    }
    setVariables(){
        this.nextBtn = document.querySelector(this.section + ' .swiper--button--next')
        this.prevBtn = document.querySelector(this.section + ' .swiper--button--prev')
    }
    initialiseSwiper(){
        this.swiper = new Swiper(this.section + ' .--swiper', {
            direction: 'vertical',
            speed: 900,
            modules: [ Navigation ],
            slidesPerView: 5,
            slidesPerGroup: 5,
            navigation: {
                nextEl: this.section + ' .swiper--button--next',
                prevEl: this.section + ' .swiper--button--prev',
            },
            allowTouchMove: true,
        
        })
    }
    onSlideChange(){
        this.swiper.on('slideChange', () => {
            if(this.swiper.isBeginning && !this.prevBtn.classList.contains('disabled')){
                this.prevBtn.classList.add('disabled')
            }
            else if(!this.swiper.isBeginning && this.prevBtn.classList.contains('disabled')){
                this.prevBtn.classList.remove('disabled');
            }
            if(this.swiper.isEnd && !this.nextBtn.classList.contains('disabled')){
                this.nextBtn.classList.add('disabled')
            }
            else if(!this.swiper.isEnd && this.nextBtn.classList.contains('disabled')){
                this.nextBtn.classList.remove('disabled');
            }
        });
    }
    update(){
        this.swiper.update();
    }
}

export { ListSwiper, ThirdAndFourthSecAppear};



