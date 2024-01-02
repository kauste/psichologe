class ThirdAndFourthSec{
    constructor(selector){
        this.selector = selector;
        this.sectionDOM;
        this.ulBoxDOM;
        this.ulDOM;
        this.downBtnDOM;
        this.upBtnDOM;
        this.transformOptions;
        this.ulBoxHeight;
        this.ulHeight;
        this.maxTransform;
        this.liHeight;
        this.currTransform = 0;
        this.isGoingDown = true;
        this.touchPose;
        this.init()
    }
    init(){
        this.setVariables()
        this.resizeWindow()
        this.sectionAppear()
        this.setScroll()
    }
    setVariables(){
        this.sectionDOM = document.querySelector(this.selector);
        this.ulBoxDOM = this.sectionDOM.querySelector('.ul--box');
        this.ulDOM = this.ulBoxDOM.querySelector('ul');
        this.downBtnDOM = this.sectionDOM.querySelector('.ch--down');
        this.upBtnDOM = this.sectionDOM.querySelector('.ch--up');
        this.ulBoxHeight = this.ulBoxDOM.offsetHeight;
        this.ulHeight = this.ulDOM.offsetHeight;
        this.maxTransform =  this.ulHeight - this.ulBoxHeight
        this.liHeight = this.ulDOM.querySelector('li').offsetHeight;
        this.transformOptions = {
            duration: 1200,
            easing: 'ease',
            iterations:1,
        }
    }
    resizeWindow(){
        window.addEventListener('resize', () => {
            this.liHeight = this.ulDOM.querySelector('li').offsetHeight;
            if(this.currTransform !== 0){
                this.currTransform = 0;
                this.ulDOM.style = `transform:translateY(0)`;

            }
        })
    }
    sectionAppear(){
        const secrionappearAnim = [
            {opacity:0.5},
            {opacity:1}
        ]
        const secrionappearOptions = {
            duration: 2000,
            iterations: 1,
            easing: 'ease',
            fill:'forwards'
        }
        const onScrollHandler = () => {
            if((this.sectionDOM.getBoundingClientRect().top - window.innerHeight / 3 * 2  <=  0)){
                this.sectionDOM.animate(secrionappearAnim, secrionappearOptions)
                window.removeEventListener('scroll', onScrollHandler);
            }
        }
        window.addEventListener('scroll', onScrollHandler)
    }
    setScroll(){
        if(this.ulBoxHeight === this.ulHeight){
            this.downBtnDOM.style.display = 'none';
            this.upBtnDOM.style.display = 'none';
        }
        else {
            this.downBtnDOM.addEventListener('click', this.scrollDown)
            this.touch()
        }
    }

    scrollDown = () => {
        this.upBtnDOM.addEventListener('click', this.scrollUp)
        this.upBtnDOM.classList.remove('disabled');
        let transformTo;
        if(this.ulHeight + this.currTransform - this.ulBoxHeight > this.ulBoxHeight){
            transformTo = this.currTransform - this.ulBoxHeight;
        }
        else{
            transformTo = -1 * (this.maxTransform);
            this.downBtnDOM.removeEventListener('click', this.scrollDown)
            this.downBtnDOM.classList.add('disabled')
        }
        const transformAnim = [
            {transform: `translateY(${ this.currTransform }px)`},
            {transform: `translateY(${ transformTo }px)`},
        ]
        this.ulDOM.animate(transformAnim, this.transformOptions)
        setTimeout(() => {
            this.ulDOM.style = `transform:translateY(${ transformTo }px)`;
        }, this.transformOptions.duration)

        this.currTransform = transformTo;
    }
    scrollUp = () => {
        this.downBtnDOM.addEventListener('click', this.scrollDown)
        this.downBtnDOM.classList.remove('disabled');
        let transformTo;
        if(this.currTransform < -1 * this.ulBoxHeight){
            transformTo = this.currTransform + this.ulBoxHeight;
        }
        else{
            transformTo = 0;
            this.upBtnDOM.removeEventListener('click', this.scrollUp)
            this.upBtnDOM.classList.add('disabled')
        }
        const transformAnim = [
            {transform: `translateY(${ this.currTransform }px)`},
            {transform: `translateY(${ transformTo }px)`},
        ]
        this.ulDOM.animate(transformAnim, this.transformOptions)
        setTimeout(() => {
            this.ulDOM.style = `transform:translateY(${ transformTo }px)`;
        }, this.transformOptions.duration)

        this.currTransform = transformTo;
    }
    touch(){
        const touchStart = (e) => {
            e.preventDefault();
            this.touchPose = e.changedTouches[0].clientY;
            this.ulBoxDOM.removeEventListener("touchstart", touchStart);
        }
        const touchMove = (e) => {
            e.preventDefault();
            this.isGoingDown = this.touchPose > e.changedTouches[0].clientY;
            console.log(this.isGoingDown)
            if(this.isGoingDown
            && -1* this.currTransform < this.maxTransform){
                this.currTransform -= 3;
                this.ulDOM.style = `transform: translateY(${ this.currTransform}px)`;
                if(this.upBtnDOM.classList.contains('disabled')){
                    this.upBtnDOM.classList.remove('disabled');
                    this.upBtnDOM.addEventListener('click', this.scrollUp)
                }
                if(-1 * this.currTransform === this.maxTransform){
                    this.downBtnDOM.removeEventListener('click', this.scrollDown)
                    this.downBtnDOM.classList.add('disabled')
                }
                this.isGoingDown = true;

            }
            else if(!this.isGoingDown
            &&  this.currTransform <= 0){
                this.currTransform += 3;
                this.ulDOM.style = `transform: translateY(${ this.currTransform}px)`;
                if(this.currTransform === 0){
                    this.upBtnDOM.removeEventListener('click', this.scrollUp)
                    this.upBtnDOM.classList.add('disabled')
                }
                if(this.downBtnDOM.classList.contains('disabled')){
                    this.downBtnDOM.classList.remove('disabled');
                    this.downBtnDOM.addEventListener('click', this.scrollDown)
                }
                this.isGoingDown = false;
            }
            this.touchPose = e.changedTouches[0].clientY;
           
        }
        const touchEnd = (e) => {
            e.preventDefault();
            let transformTo;
            if(this.isGoingDown){
                this.currTransform -= (5 * 3);

                // transformTo = Math.floor(this.currTransform / this.liHeight ) * this.liHeight;
            }
            else {
                this.currTransform += (5 * 3);

                // transformTo = Math.ceil(this.currTransform / this.liHeight ) * this.liHeight;
            }
            this.ulDOM.style.transform = `translateY(${  this.currTransform  }px)`;

        }
        this.ulBoxDOM.addEventListener("touchstart", touchStart,  { passive: false });
        this.ulBoxDOM.addEventListener("touchmove", touchMove,  { passive: false });
        this.ulBoxDOM.addEventListener("touchend", touchEnd,  { passive: false });
    }
}
export { ThirdAndFourthSec}