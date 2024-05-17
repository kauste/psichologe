const ItemInUse = {
    itemDOM: null, // Initialize the variable
    updateItem(itemDOM) {
        this.itemDOM = itemDOM;
    },
    getItem() {
        return this.itemDOM;
    },
    checkFilled(modalDOM){
        let filled = false;
        const formDOM = modalDOM.querySelector('.--form')
        const variablesDOMS = formDOM.querySelectorAll('.--var, .--priority')
        variablesDOMS.forEach(varDOM => {
            if(varDOM.innerText.trim() !== ''){
                filled = true;
                return;
            } 
        })
        const listsDOMS = formDOM.querySelector('.list--box')
        if(listsDOMS)listsDOMS.forEach(listDOM => {
            if(listDOM !== '') {
                filled = true;
                return;
            } 
        })
        if(filled){
            this.updateItem(formDOM)
        }
        else this.updateItem(null)
        return filled;
    }
};
export default ItemInUse;