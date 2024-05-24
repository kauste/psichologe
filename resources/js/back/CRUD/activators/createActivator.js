import ItemActivationManager from "./itemActivationManager";
// import ItemContentManager from "../parts/itemContentManager";

class CreateActivator extends ItemActivationManager {
    constructor(selector, parentDOM, itemDOM, actionsSelectors, swiper) {
        super(selector, parentDOM, itemDOM, actionsSelectors, swiper);
        this.action = 'store';
        this.dataDOM;
        this.varDOMS;
        this.listsDOMS;
        this.initialHTML;
        this.setVariables();
        this.activate();
    }

    activate() {
        if (this.cancelBtnDOM) this.cancelBtnDOM.addEventListener('click', this.cancel);
        if (this.actionBtnDOM) this.actionBtnDOM.addEventListener('click', this.modify);
    }

    cancel = () => this.restoreHTML();

    getArgs = () => {
        return  [
                    this.getData(),
                    this.cancel,
                    this.swiper,
                ]
    }
}
export default CreateActivator;
