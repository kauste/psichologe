import Swiper from 'swiper';
import { Navigation, Autoplay, EffectFade } from 'swiper/modules';

class CrossFadeSwiper{
    constructor(selector){
        this.selector = selector;
        this.activate()
    }
    activate(){
        new Swiper(this.selector, {
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
    }
}
export default CrossFadeSwiper;