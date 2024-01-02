class FirstSecAnimation{
  constructor(){
    this.visibleChild = 1;
    this.visibleImg;
    this.nextVisibleImg;
    this.setVariables();
    this.animation();
  }
  setVariables(){
    this.nextVisibleImg = document.querySelector(`.section--1 li:nth-of-type( ${this.visibleChild}) `)
  }
  animation(){
    const imgOpacity = [
      {opacity:1},
      {opacity:0},
    ]
    const imgDisappearTiming = {
                  duration: 2000,
                  iterations: 1,
                  easing: 'ease',
                  fill: 'forwards',
                };
    const imgAppearTiming = {
              ...imgDisappearTiming,   
              direction: 'reverse', 
            };
  
    const h1Opacity = [
        {opacity:1},
        {opacity:0, offset: 0.4},
        {opacity:0, offset: 0.7},
        {opacity:1},
      ]
    const h1Timing = {
        duration:4000,
        iterations:1,
        easing: 'ease',
        fill: 'forwards',
      }
    const h1 = document.querySelector('h1') || document.querySelector('.h1') ;
      
    const lastImg = document.querySelectorAll('.section--1 li').length;

    if(lastImg > 1){
      setInterval(() => {
          this.visibleImg = this.nextVisibleImg;
          this.visibleChild = this.visibleChild >= lastImg ? 1 : ++this.visibleChild;
          this.nextVisibleImg = document.querySelector(`.section--1 li:nth-of-type( ${this.visibleChild}) `)

          this.visibleImg.animate(imgOpacity, imgDisappearTiming);
          this.nextVisibleImg.animate(imgOpacity, imgAppearTiming);
          if((this.nextVisibleImg.classList.contains('left') && this.visibleImg.classList.contains('right')) 
          || (this.visibleImg.classList.contains('left') && this.nextVisibleImg.classList.contains('right'))){
            setTimeout(() => {
              this.nextVisibleImg.classList.contains('left') ? h1.style.cssText = 'right:150px; left:unset' : h1.style.cssText = 'left:150px; right:unset';
            }, 2000)
            h1.animate(h1Opacity, h1Timing)
          }
      }, 20000)
    }
  }
}
export default FirstSecAnimation;
