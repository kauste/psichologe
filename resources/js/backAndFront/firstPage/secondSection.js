class SecondSection{
    constructor(selector){
        this.selector = selector;
        this.sectionDOM;
        this.headingDOM;
        this.paragraphBoxDOM;
        this.paragraphDOM;
        this.bambooDOM;
        this.headingAppearAnimation;
        this.headingAppearOptions;
        this.paragraphAppearAnimation;
        this.paragraphAppearOptions;
        this.init()
    }
    init(){
        this.setVariables()
        this.setBambooHeight()
        this.listenToScroll()
        this.resizeWindow()
        this.changeParagraph()
    }
    setVariables(){
        this.sectionDOM = document.querySelector(this.selector);
        this.headingDOM = this.sectionDOM.querySelector('.--heading > h2');
        this.paragraphBoxDOM = this.sectionDOM.querySelector('.--paragraph');
        this.paragraphDOM = this.sectionDOM.querySelector('.--paragraph p');
        this.bambooDOM = this.sectionDOM.querySelector('.--bamboo');
        this.headingAppearAnimation = [
            {transform: 'translateY(0)', opacity: 0.7},
            {transform: 'translateY(-30px)', opacity: 1},
          ]
        this.headingAppearOptions =  {
                            duration: 1000,
                            easing: 'ease',
                            iterations:1,
                            fill: 'forwards'
                        }
        this.paragraphAppearAnimation = [
                    {transform: 'translateY(0)', opacity: 0.7},
                    {transform: 'translateY(-30px)', opacity: 1},
                    ]
        this.paragraphAppearOptions =  {
                            duration: 1000,
                            easing: 'ease',
                            iterations:1,
                            fill: 'forwards',
                            delay:1000
                            }
    }
    setBambooHeight(){
        const paragraphHeight = this.paragraphDOM.offsetHeight;
        this.bambooDOM.style.height = paragraphHeight + 150 + 'px';
    }
    onAppearHandler = () => {
            if(window.scrollY >= window.innerHeight / 3){
              this.headingDOM.animate(this.headingAppearAnimation, this.headingAppearOptions)
              this.paragraphDOM.animate(this.paragraphAppearAnimation, this.paragraphAppearOptions)
              window.removeEventListener('scroll', this.onAppearHandler);
            }
    }
    listenToScroll(){
        window.addEventListener('scroll', this.onAppearHandler)
        this.onAppearHandler();
    }
    resizeWindow(){
        window.addEventListener("resize", () => {
            const paragraphHeight = this.paragraphDOM.offsetHeight;
            this.bambooDOM.style.height = paragraphHeight + 150 + 'px';
          });
    }
    changeParagraph(){
        this.paragraphDOM.addEventListener('input', () => {
            const paragraphHeight = this.paragraphDOM.offsetHeight;
            this.bambooDOM.style.height = paragraphHeight + 150 + 'px';
          });
    }
}
export default SecondSection;