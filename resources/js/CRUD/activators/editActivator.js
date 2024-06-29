import ItemActivationManager from "./itemActivationManager";
import FormDataManager from "../parts/formDataManager";

class EditActivator extends ItemActivationManager {
    constructor(selector, parentDOM, itemDOM, actionsSelectors, optionalFeatures, swiper) {
        super(selector, parentDOM, itemDOM, actionsSelectors, optionalFeatures, swiper);
        this.action = 'update';
        this.initialHTML;
        this.setVariables();
        this.activateOptionalFeatures();
        this.activateListeners();
    }

    activateListeners() {
        if (this.openBtnDOM) this.openBtnDOM.addEventListener('click', this.open);
        if (this.cancelBtnDOM) this.cancelBtnDOM.addEventListener('click', this.cancel);
        if (this.actionBtnDOM) this.actionBtnDOM.addEventListener('click', this.modify);
    }

    open = () =>{
        if(this.addItemInUse()){
            this.openStyles();
            this.enableEditing();
        }
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
        const formDataManager = new FormDataManager(this.varDOMS, this.listsDOMS, this.radioBoxesDOMS);
            return  [
                        formDataManager.getFormData(),
                        this.itemDOM,
                        this.close.bind(this),
                    ]
    }
}
export default EditActivator;
