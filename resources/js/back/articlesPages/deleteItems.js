import TopMessage from "../parts/topMessage";

class DeleteItems{
    constructor(parentSelector){
        this.parentSelector = parentSelector;
        this.parentDOM;
        this.deleteBtnsDOMS;
        this.cancelBtnsDOMS;
        this.message
        this.setVariables();
        this.listenToClick();
    }
    setVariables(){
        this.parentDOM = document.querySelector(this.parentSelector);
        this.deleteBtnsDOMS = this.parentDOM.querySelectorAll('.--delete');
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
}
export default DeleteItems;