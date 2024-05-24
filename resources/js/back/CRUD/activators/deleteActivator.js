import ItemActivationManager from "./itemActivationManager";

class DeleteActivator extends ItemActivationManager {
    constructor(selector, parentDOM, itemDOM, actionsSelectors, swiper) {
        super(selector, parentDOM, itemDOM, actionsSelectors, swiper);
        this.action = 'delete';
        this.activate();
    }

    activate() {
        if (this.openBtnDOM) this.openBtnDOM.addEventListener('click', this.open);
        if (this.cancelBtnDOM) this.cancelBtnDOM.addEventListener('click', this.cancel);
        if (this.actionBtnDOM) this.actionBtnDOM.addEventListener('click', this.modify);
    }
    open = () => {
        if(this.addItemInUse()) this.openStyles()
    }

    cancel = () => {
        this.closeStyles();
        this.removeItemInUse();
    }

    getArgs = () => {
        return  [
                    this.itemDOM,
                ]
    }
}
export default DeleteActivator;