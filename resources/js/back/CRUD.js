class CRUD {
    constructor(parentDOM){
        this.parentDOM = parentDOM;
        this.loadeBoxDOM;
        this.msgObj;
    }
    setDOMS(){
        this.loadeBoxDOM = document.querySelector('.loader--box');
        this.msgObj = new ModalMsg(this.parentDOM)
    }
    store = (data) => () => {
        this.loadeBoxDOM.style.display = 'block';
        axios.post(this.storeRoute, {data:data})
        .then(res => {
            if(res.data.errors){  
                this.msgObj.showMsg(res.data.errors)
            }
            else if(res.data.message){
                this.appendEditDeleteModal(res.data.modalHTML, res.data.itemId, data.priority)
                this.appendSection(res.data.sectionHTML, res.data.itemId, data.priority)
                this.clearCreate();
                this.msgObj.showMsg([res.data.message]);
            }
            this.loadeBoxDOM.style.display = 'none';
        })
    }
    update = (data)  => () => {
        this.loadeBoxDOM.style.display = 'block';
        axios.put(`${this.updateRoute}/${this.openItemId}`, {data:data})
        .then(res => {
            if(res.data.errors){
                this.msgObj.showMsg(res.data.errors)
            }
            else if(res.data.message){
                this.updateSection(data);
                if(this.editPriorityDOM && this.initialPriority !== data.priority){
                    this.changePositionInSec(data.priority)
                    this.changePositionInModal(data.priority)
                }
                this.changeToEditButtons();
                this.closeItemEdit()
                this.msgObj.showMsg([res.data.message])
            }
            this.loadeBoxDOM.style.display = 'none';
        })
    }
    delete = (openItemId)  => () => {
        this.loadeBoxDOM.style.display = 'block';
        axios.delete(`${this.deleteRoute}/${openItemId}`)
        .then(res => {
            if(res.data.message){
                this.sectionUlDOM.removeChild(this.secItemDOM);
                this.ulDOM.removeChild(this.openItemDOM);
                this.openItemDOM = null;
                openItemId = null;
                if(this.swiper){
                    this.swiper.update();
                }
                this.msgObj.showMsg(res.data.message);
            }
            else {
                this.msgObj.showMsg('Duomenys nebuvo ištrinti.');
            }
            this.loadeBoxDOM.style.display = 'none';
        })
    }

}
export default CRUD;