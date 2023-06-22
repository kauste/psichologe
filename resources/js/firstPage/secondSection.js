
function secondSectionAppearAnimation(){
  const section2 = document.querySelector('.section--2');
  const heading = section2.querySelector('.--heading > h2');
  const paragraph = section2.querySelector('.--paragraph > p');
    const headingAppear = [
                            {transform: 'translateY(0)', opacity: 0.7},
                            {transform: 'translateY(-30px)', opacity: 1},
                          ]
    const headingAppearOptions =  {
                                    duration: 1000,
                                    easing: 'ease',
                                    iterations:1,
                                    fill: 'forwards'
                                  }
    const paragraphAppear = [
                              {transform: 'translateY(0)', opacity: 0.7},
                              {transform: 'translateY(-30px)', opacity: 1},
                            ]
    const paragraphAppearOptions =  {
                                      duration: 1000,
                                      easing: 'ease',
                                      iterations:1,
                                      fill: 'forwards',
                                      delay:1000
                                    }
    window.addEventListener('scroll', function scrolledToSeconSection() {

      if(window.scrollY >= window.innerHeight / 3){
        heading.animate(headingAppear, headingAppearOptions)
        paragraph.animate(paragraphAppear, paragraphAppearOptions)
        window.removeEventListener('scroll', scrolledToSeconSection);
      }
    })
}
function setBambooHeight(){
  const section2 = document.querySelector('.section--2');
  const paragraphBox = section2.querySelector('.--paragraph');
  const paragraph = paragraphBox.querySelector('p');
  const paragraphHeight = paragraph.offsetHeight;
  paragraphBox.style.height = paragraphHeight + 50 + 'px';
  const bamboo = section2.querySelector('.--bamboo');
  bamboo.style.height = paragraphHeight + 150 + 'px';
}
function watchResize(){
  const section2 = document.querySelector('.section--2');
  const paragraphBox = section2.querySelector('.--paragraph');
  const paragraph = section2.querySelector('p');
  const bamboo = section2.querySelector('.--bamboo');
    window.addEventListener("resize", () => {
        const paragraphHeight = paragraph.offsetHeight;
        paragraphBox.style.height = paragraphHeight + 50 + 'px';
        bamboo.style.height = paragraphHeight + 150 + 'px';
      });
}
function secondSection(){
    secondSectionAppearAnimation()
    setBambooHeight()
    watchResize()
}
export default secondSection;
