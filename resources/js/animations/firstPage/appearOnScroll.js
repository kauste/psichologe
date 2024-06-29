class AppearOnScroll{
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


export default AppearOnScroll;
