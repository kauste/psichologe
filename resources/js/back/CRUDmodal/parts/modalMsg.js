class ModalMsg{
    constructor(modalDOM){
        this.messageDOM;
        this.modalDOM = modalDOM;
        this.setDOMS();
    }
    setDOMS(){
        this.messageDOM = this.modalDOM.querySelector('.--message');

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
export default ModalMsg;