class Msg{
    constructor(parentDOM){
        this.parentDOM = parentDOM;
        this.messageDOM;
        this.setDOMS();
    }
    setDOMS(){
        console.log(this.parentDOM)
        this.messageDOM = this.parentDOM.querySelector('.--message');

    }
    showMsg(errors){
        let msgHTML = '';
        errors.forEach(error => {
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