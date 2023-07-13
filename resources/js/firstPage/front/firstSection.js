function firstSectionAnimation(){
    const imgOpacity = [
      {opacity:1},
      {opacity:0},
    ]
    const imgDisappearTiming = {
                  duration: 2000,
                  iterations: 1,
                  easing: 'ease',
                  fill: 'forwards'
                };
    const imgAppearTiming = {
              ...imgDisappearTiming,   
              direction: 'reverse', 
              delay:2000
            }
  
    const h1Opacity = [
        {opacity:1},
        {opacity:0, offset: 0.4},
        {opacity:0, offset: 0.7},
        {opacity:1},
      ]
    const h1Timing = {
        duration:4000,
        iteration:1,
        easing: 'ease',
        fill: 'forwards',
      }
    const h1 = document.querySelector('h1') || document.querySelector('.h1') ;
      
    const lastImg = document.querySelectorAll('.section--1 li').length;
    let visibleChild = 1;
    if(lastImg > 1){
      setInterval(() => {
          const visibleImg = document.querySelector(`.section--1 li:nth-of-type( ${visibleChild}) `)
          visibleChild = visibleChild >= lastImg ? 1 : ++visibleChild;
          const nextVisibleImg = document.querySelector(`.section--1 li:nth-of-type( ${visibleChild}) `)
    
          visibleImg.animate(imgOpacity, imgDisappearTiming);
          nextVisibleImg.animate(imgOpacity, imgAppearTiming);
    
          if(nextVisibleImg.classList.contains('left') && visibleImg.classList.contains('right') 
          || visibleImg.classList.contains('left') && nextVisibleImg.classList.contains('right')){
            setTimeout(() => {
              nextVisibleImg.classList.contains('left') ? h1.style.cssText = 'right:150px; left:unset' : h1.style.cssText = 'left:150px; right:unset';
            }, 3000)
            h1.animate(h1Opacity, h1Timing)
          }
      }, 20000)
    }
  }
  export default firstSectionAnimation;