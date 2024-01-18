class FirstSecAnimation{
  constructor(){
    this.imgOpacity;
    this.imgDisappearTiming;
    this.imgAppearTiming;
    this.h1Opacity;
    this.h1Timing;
    this.h1;
    this.visibleChild = 1;
    this.visibleImg;
    this.nextVisibleImg;
    this.intervalId
    this.setVariables();
    this.animation();
  }
  setVariables(){
    this.nextVisibleImg = document.querySelector(`.section--1 li:nth-of-type( ${this.visibleChild}) `)
    this.imgOpacity = [
      {opacity:1},
      {opacity:0},
    ]
    this.imgDisappearTiming = {
                  duration: 2000,
                  iterations: 1,
                  easing: 'ease',
                  fill: 'forwards',
                };
    this.imgAppearTiming = {
              ...this.imgDisappearTiming,   
              direction: 'reverse', 
            };
  
    this.h1Opacity = [
        {opacity:1},
        {opacity:0, offset: 0.4},
        {opacity:0, offset: 0.7},
        {opacity:1},
      ]
    this.h1Timing = {
        duration:4000,
        iterations:1,
        easing: 'ease',
        fill: 'forwards',
      }
      this.h1 = document.querySelector('h1') || document.querySelector('.h1') ;
  }
  animation(){
    const lastImg = document.querySelectorAll('.section--1 li').length;

    clearInterval(this.intervalId);
    if(lastImg > 1){

      this.intervalId = setInterval(() => {
          this.visibleImg = this.nextVisibleImg;
          this.visibleChild = this.visibleChild >= lastImg ? 1 : ++this.visibleChild;
          this.nextVisibleImg = document.querySelector(`.section--1 li:nth-of-type( ${this.visibleChild}) `)

          this.visibleImg.animate(this.imgOpacity, this.imgDisappearTiming);
          this.nextVisibleImg.animate(this.imgOpacity, this.imgAppearTiming);
          if((this.nextVisibleImg.classList.contains('left') && this.visibleImg.classList.contains('right')) 
          || (this.visibleImg.classList.contains('left') && this.nextVisibleImg.classList.contains('right'))){
            setTimeout(() => {
              this.nextVisibleImg.classList.contains('left') ? this.h1.style.cssText = 'right:150px; left:unset' : this.h1.style.cssText = 'left:150px; right:unset';
            }, 2000)
            this.h1.animate(this.h1Opacity, this.h1Timing)
          }
      }, 20000)
    }
  }
}
export default FirstSecAnimation;
