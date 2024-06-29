const ItemInUse = {
    itemDOM: null,
    getItem() {
        return this.itemDOM;
    },
    updateItem(itemDOM) {
        this.itemDOM = itemDOM;
    },
    isOpenItem(){
        if(!this.itemDOM) return false;
        this.itemDOM.classList.add('border--warning');
        return true;
    }

};
export default ItemInUse;