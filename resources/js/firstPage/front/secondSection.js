class SecondSection{
    constructor(selector){
        this.selector = selector;
        this.sectionDOM;
        this.headingDOM;
        this.paragraphBoxDOM;
        this.paragraphDOM;
        this.bambooDOM;
        this.init()
    }
    init(){
        this.setVariables()
        this.setBambooHeight()
        this.onAppear()
        this.resizeWindow()
        this.changeParagraph()
    }
    setVariables(){
        this.sectionDOM = document.querySelector(this.selector);
        this.headingDOM = this.sectionDOM.querySelector('.--heading > h2');
        this.paragraphBoxDOM = this.sectionDOM.querySelector('.--paragraph');
        this.paragraphDOM = this.sectionDOM.querySelector('.--paragraph p');
        this.bambooDOM = this.sectionDOM.querySelector('.--bamboo');
    }
    setBambooHeight(){
        const paragraphHeight = this.paragraphDOM.offsetHeight;
        this.bambooDOM.style.height = paragraphHeight + 150 + 'px';
    }
    onAppear(){
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
        const scrolledToSeconSection = () => {
            if(window.scrollY >= window.innerHeight / 3){
              this.headingDOM.animate(headingAppear, headingAppearOptions)
              this.paragraphDOM.animate(paragraphAppear, paragraphAppearOptions)
              window.removeEventListener('scroll', scrolledToSeconSection);
            }
        }
        window.addEventListener('scroll', scrolledToSeconSection)
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