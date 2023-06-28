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
            transformTo = -1 * (this.ulHeight - this.ulBoxHeight);
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
            if(this.touchPose > e.changedTouches[0].clientY
            && -1* this.currTransform - 1 <= this.ulHeight - this.ulBoxHeight){
                -1* this.currTransform - 1 === this.ulHeight - this.ulBoxHeight ? this.currTransform -= 1 : this.currTransform -= 2;
                this.ulDOM.style = `transform: translateY(${ this.currTransform}px)`;
                if(this.upBtnDOM.classList.contains('disabled')){
                    this.upBtnDOM.classList.remove('disabled');
                    this.upBtnDOM.addEventListener('click', this.scrollUp)
                }
                if(-1 * this.currTransform === this.ulHeight - this.ulBoxHeight){
                    this.downBtnDOM.removeEventListener('click', this.scrollDown)
                    this.downBtnDOM.classList.add('disabled')
                }
                this.isGoingDown = true;

            }
            else if(this.touchPose < e.changedTouches[0].clientY
            &&  this.currTransform + 1 <= 0){
                -1* this.currTransform - 1 === 0 ? this.currTransform += 1 : this.currTransform += 2;
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
                transformTo = Math.floor(this.currTransform / this.liHeight ) * this.liHeight;
            }
            else {
                transformTo = Math.ceil(this.currTransform / this.liHeight ) * this.liHeight;
            }
            this.ulDOM.style.transform = `translateY(${ transformTo  }px)`;

        }
        this.ulBoxDOM.addEventListener("touchstart", touchStart, false);
        this.ulBoxDOM.addEventListener("touchmove", touchMove, false);
        this.ulBoxDOM.addEventListener("touchend", touchEnd, false);



    }



}
export { ThirdAndFourthSec}