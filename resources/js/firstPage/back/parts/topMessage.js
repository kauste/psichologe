class TopMessage{
    constructor(){
        this.messageDOM;
        this.navDOM;
        this.navHeight;
        this.setDOMS();
    }
    setDOMS(){
        this.messageDOM = document.querySelector('.top--message');
        this.navDOM = document.querySelector('nav');
        this.navHeight = this.navDOM.offsetHeight;
    }
    showMsg(msgHTML){
        this.messageDOM.innerHTML = msgHTML;;
        this.messageDOM.style.display = 'block';
        this.topStyle();
        window.addEventListener('scroll', this.topStyle.bind(this));
        setTimeout(() => {
            this.messageDOM.innerHTML = '';
            this.messageDOM.style.display = 'none';
            window.removeEventListener('scroll', this.topStyle.bind(this));

        }, 20000)
    }
    topStyle(){
        this.messageDOM.style.top = window.scrollY > this.navHeight ? 0 : this.navHeight + 'px'
    }
}

export default TopMessage;