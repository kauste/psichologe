class BambooAnim{
    constructor(selector){
        this.selector = selector;
        this.sectionDOM;
        this.headingDOM;
        this.paragraphBoxDOM;
        this.dataDOM;
        this.bambooDOM;
        this.cancelBtnDOM;
        this.initalBambooHeight;
        this.init()
    }
    init(){
        this.setVariables()
        this.setBambooHeight()
        this.listenToScroll()
        this.resizeWindow()
    }
    setVariables(){
        this.sectionDOM = document.querySelector(this.selector);
        this.headingDOM = this.sectionDOM.querySelector('.--heading > h2');
        this.dataDOM = this.sectionDOM.querySelector('.--data');
        this.bambooDOM = this.sectionDOM.querySelector('.--bamboo');
        this.cancelBtnDOM = this.sectionDOM.querySelector('.--cancel');
        if(this.cancelBtnDOM){
            this.changeParagraph();
        }
    }
    setBambooHeight(){
        this.initalBambooHeight = this.dataDOM.offsetHeight;
        this.bambooDOM.style.height = this.initalBambooHeight + 150 + 'px';
    }
    onAppearHandler = () => {
            if(window.scrollY >= window.innerHeight / 3){
                this.headingDOM.style.animation = 'onAppear 1s ease forwards';
                this.dataDOM.style.animation = 'onAppear 1s 1s ease forwards';      
              window.removeEventListener('scroll', this.onAppearHandler);
            }
    }
    listenToScroll(){
        window.addEventListener('scroll', this.onAppearHandler)
        this.onAppearHandler();
    }
    resizeWindow(){
        window.addEventListener("resize", () => {
            const paragraphHeight = this.dataDOM.offsetHeight;
            this.bambooDOM.style.height = paragraphHeight + 150 + 'px';
          });
    }
    changeParagraph(){
        this.dataDOM.addEventListener('input', () => {
            const paragraphHeight = this.dataDOM.offsetHeight;
            this.bambooDOM.style.height = paragraphHeight + 150 + 'px';
          });
        this.cancelBtnDOM.addEventListener('click', () => this.bambooDOM.style.height = this.initalBambooHeight + 150 + 'px');   }
}
export default BambooAnim;