class Msg{
    constructor(parentDOM){
        this.parentDOM = parentDOM;
        this.messageDOM;
        this.setDOMS();
    }
    setDOMS(){
        this.messageDOM = this.parentDOM.querySelector('.--message');

    }
    showMsg(msg){
        let msgHTML = '';
        msg.forEach(error => {
            msgHTML += `<div>${error}</div>`
        })
        this.messageDOM.innerHTML = msgHTML;;
        this.messageDOM.style.display = 'block';
        this.removeMsg();

    }
    removeMsg(){
        if(this.messageDOM.innerHTML !== ''){
            setTimeout(() => {
                this.messageDOM.innerHTML = '';
                this.messageDOM.style.display = 'none';
            }, 20000)
        }
    }
}


export default Msg;

