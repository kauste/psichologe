class TopMessage{
    constructor(){
        this.messageDOM;
        this.navDOM;
        this.navHeight;
        this.setDOMS();
    }
    setDOMS(){
        this.messageDOM = document.querySelector('.top--message');
    }
    showMsg(msgHTML){
        this.messageDOM.innerHTML = msgHTML;;
        this.messageDOM.style.display = 'block';
        this.removeMsg();
    }
    showLaraMsg(){
        if(this.messageDOM.innerHTML !== ''){
            this.messageDOM.style.display = 'block';
            this.removeMsg();
        }

    }
    removeMsg(){
        setTimeout(() => {
            this.messageDOM.innerHTML = '';
            this.messageDOM.style.display = 'none';
        }, 20000)
    }
}

export default TopMessage;