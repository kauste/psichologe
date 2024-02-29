import TopMessage from "../parts/topMessage";

class DeleteItems{
    constructor(parentSelector, itemSelector, deleteRoute){
        this.parentSelector = parentSelector;
        this.itemSelector = itemSelector;
        this.deleteRoute = deleteRoute;
        this.loadeBoxDOM;
        this.parentDOM;
        this.deleteBtnsDOMS;
        this.doDeleteBtnsDOMS;
        this.cancelBtnsDOMS;
        this.message
        this.setVariables();
        this.listenToClick();
    }
    setVariables(){
        this.loadeBoxDOM = document.querySelector('.loader--box');
        this.parentDOM = document.querySelector(this.parentSelector);
        this.deleteBtnsDOMS = this.parentDOM.querySelectorAll('.--delete');
        this.doDeleteBtnsDOMS = this.parentDOM.querySelectorAll('.do--delete');
        this.cancelBtnsDOMS = this.parentDOM.querySelectorAll('.--cancel');
        this.message = new TopMessage;
    }
    listenToClick(){
        this.deleteBtnsDOMS.forEach(deleteBtnDOM => {
            deleteBtnDOM.addEventListener('click', this.showDeleteActions(deleteBtnDOM))
        });
        this.cancelBtnsDOMS.forEach(cancelBtnDOM => {
            cancelBtnDOM.addEventListener('click', this.dontShowDeleteActions(cancelBtnDOM))
        });
        this.doDeleteBtnsDOMS.forEach(doDeleteBtnDOM => {
            doDeleteBtnDOM.addEventListener('click', this.delete(doDeleteBtnDOM))
        });
        
        
        
    }
    showDeleteActions = (deleteBtnDOM) => () =>{
        const deleteActionsDOM = deleteBtnDOM.nextElementSibling;
        deleteActionsDOM.style.display = 'flex'
        deleteBtnDOM.style.display = 'none';
    }
    dontShowDeleteActions = (cancelBtnDOM) => () => {
        const deleteActionsDOM = cancelBtnDOM.closest('.delete--actions');
        const deleteBtnDOM = deleteActionsDOM.previousElementSibling;
        deleteActionsDOM.style.display = 'none';
        deleteBtnDOM.style.display = 'flex'
    }
    delete= (doDeleteBtnDOM) => () => {
        this.loadeBoxDOM.style.display = 'block';

        const itemBox = doDeleteBtnDOM.closest('.articles--delete--box');
        const itemId = itemBox.dataset.itemId;
        axios.delete(this.deleteRoute + '/' + itemId)
        .then(res => {
            if(res.data.message){
                this.message.showMsg(res.data.message)
                this.parentDOM.removeChild(itemBox);
            }
            this.loadeBoxDOM.style.display = 'none';

        })
    }
}
export default DeleteItems;