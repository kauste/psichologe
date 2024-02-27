class Positioner{
    constructor(selector, imgBoxDOM,secImgDOM){
        this.selector = selector;
        this.imgBoxDOM = imgBoxDOM;
        this.secImgDOM = secImgDOM;
        this.boxHeight;
        this.imgsBoxesDOMS;
        this.imgDOM;
        this.prevPicPos;
        this.imgHeigh;
        this.marginHeight;
        this.additionalHeight;
        this.setBoxesSize();
    }

    setBoxesSize(){
        this.imgsBoxesDOMS = document.querySelectorAll(this.selector);
        const imgDOM = this.imgsBoxesDOMS[0].querySelector('img')
        setTimeout(() => {
            const imgsWidth = imgDOM.clientWidth;
            this.boxHeight = 10 * imgsWidth / 21;

            this.init();
        }, 300)

        const secHeight = window.innerHeight;
        const screenWith = parseInt(window.screen.width);
    }
    doSetBoxesSize(){
        this.imgsBoxesDOMS.forEach(imgBoxDOM => {
            this.doSetBoxSize(imgBoxDOM)
        });
    }
    doSetBoxSize(imgBoxDOM){
        imgBoxDOM.style.height = this.boxHeight + 'px';
    }
    init(){
        this.imgDOM = this.imgBoxDOM.querySelector('img')
        this.imgDOM.style.height = 'auto'
        setTimeout(() => {
            this.imgHeight = this.imgDOM.offsetHeight;
            this.additionalHeight = this.imgHeight - this.boxHeight;
            const objectPos = this.imgDOM.style.objectPosition.trim();
            this.objectYposition =  parseInt(objectPos.substr(objectPos.indexOf(' ') + 1).replace(['%', 'px'], ''))
            this.marginHeight = ((100 - this.objectYposition) * this.additionalHeight ) / 100;
            this.setStyles();
            this.letDrag();
        }, 250)
    }

    setStyles(){
        this.imgBoxDOM.style.height = this.imgHeight + this.additionalHeight + 'px'
        this.imgBoxDOM.style.setProperty('--borderHeight', this.additionalHeight + 'px');
        this.imgBoxDOM.style.setProperty('--marginHeight', this.marginHeight + 'px');
        this.imgDOM.style.objectPosition = '0px 0px';
    }
    letDrag(){
        this.imgDOM.setAttribute('drabable', true);

        this.imgDOM.addEventListener('dragstart', (e) => {
            console.log('dragstart')
            this.prevPicPos = e.clientY;
        })
        this.imgDOM.addEventListener('dragover', (e) => {
            e.preventDefault();
            if((this.marginHeight + e.clientY - this.prevPicPos) > this.additionalHeight){
                 this.marginHeight = this.additionalHeight;
            }
            else if((this.marginHeight + e.clientY - this.prevPicPos) < 0){
                this.marginHeight = 0;
            }
            else{
                this.marginHeight += (e.clientY - this.prevPicPos);
            }
            this.imgBoxDOM.style.setProperty('--marginHeight', this.marginHeight + 'px');
            this.prevPicPos = e.clientY;
        })
        
        this.imgDOM.addEventListener('dragend', (e) => {
            e.preventDefault();
        })

    }
    returnObjectPosition(){
        this.objectYposition = parseFloat(100 - (100  / this.additionalHeight * this.marginHeight)).toFixed(2);
        return this.objectYposition;
    }
    closeStyles(){
        this.imgDOM.style.height = '100%';
        this.imgBoxDOM.style.height = this.boxHeight + 'px'
        this.imgBoxDOM.style.setProperty('--borderHeight', 0);
        this.imgBoxDOM.style.setProperty('--marginHeight', 0);
        this.imgDOM.style.objectPosition = '0px ' + this.objectYposition + '%';
        if(this.secImgDOM){
           this.secImgDOM.style.objectPosition = '0px ' + this.objectYposition + '%';
        }
        this.imgBoxDOM.style.outline = 'none';
    }
}
export default Positioner;