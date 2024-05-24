const ItemInUse = {
    itemDOM: null,
    updateItem(itemDOM) {
        this.itemDOM = itemDOM;
    },
    getItem() {
        return this.itemDOM;
    }
};
export default ItemInUse;