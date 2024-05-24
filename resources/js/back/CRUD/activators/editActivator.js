import ItemActivationManager from "./itemActivationManager";
import ItemContentManager from "../parts/itemContentManager";

class EditActivator extends ItemActivationManager {
    constructor(selector, parentDOM, itemDOM, actionsSelectors, swiper) {
        super(selector, parentDOM, itemDOM, actionsSelectors, swiper);
        this.itemContentManagerOBJ = new ItemContentManager(this.itemDOM);
        this.action = 'update';
        this.dataDOM;
        this.varDOMS;
        this.listsDOMS;
        this.initialHTML;
        this.setVariables();
        this.activate();
    }

    activate() {
        if (this.openBtnDOM) this.openBtnDOM.addEventListener('click', this.open);
        if (this.cancelBtnDOM) this.cancelBtnDOM.addEventListener('click', this.cancel);
        if (this.actionBtnDOM) this.actionBtnDOM.addEventListener('click', this.modify);
    }



    open = () =>{
        if(!this.addItemInUse()) return;
        this.openStyles();
        this.enableEditing();
    }
    close = () => {
        this.closeStyles();
        this.disableEditing();
    }
    cancel = () => {
        this.closeStyles();
        this.restoreHTML();
        this.removeItemInUse();
    }


    getArgs = () => {
            return  [
                        this.getData(),
                        this.itemDOM,
                        this.close.bind(this),
                    ]
    }
}
export default EditActivator;
