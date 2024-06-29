import ItemActivationManager from "./itemActivationManager";
import FormDataManager from "../parts/formDataManager";

class CreateActivator extends ItemActivationManager {
    constructor(selector, parentDOM, itemDOM, actionsSelectors, optionalFeatures,swiper) {
        super(selector, parentDOM, itemDOM, actionsSelectors, optionalFeatures, swiper);
        this.action = 'store';
        this.initialHTML;
        this.setVariables();
        this.activateOptionalFeatures();
        this.activateListeners();
        console.log('patekau')
    }

    activateListeners() {
        if (this.cancelBtnDOM) this.cancelBtnDOM.addEventListener('click', this.cancel);
        if (this.actionBtnDOM) this.actionBtnDOM.addEventListener('click', this.modify);
    }

    cancel = () => this.restoreHTML();

    getArgs = () => {
        const formDataManager = new FormDataManager(this.varDOMS, this.listsDOMS, this.radioBoxesDOMS);
        return  [
                    formDataManager.getFormData(),
                    this.optionalFeatures,
                    this.cancel,
                ]
    }
}
export default CreateActivator;
