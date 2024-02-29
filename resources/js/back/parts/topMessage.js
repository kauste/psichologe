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
        setTimeout(() => {
            this.messageDOM.innerHTML = '';
            this.messageDOM.style.display = 'none';
        }, 20000)
    }

}

export default TopMessage;