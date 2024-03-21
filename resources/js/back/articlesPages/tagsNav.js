import { CRUDmodal } from "../parts/CRUDmodal";
import AddSelectedItem from "../parts/addSelectedItem";

class TagsNav extends CRUDmodal{
    constructor(cssStyles, selector, updateRoute, storeRoute, deleteRoute){
        super(cssStyles, selector, storeRoute)
        this.cssStyles = cssStyles;
        this.updateRoute = updateRoute;
        this.storeRoute = storeRoute;
        this.deleteRoute = deleteRoute;
        //object
        this.createAddArticle;
        //edit delete
        //one tag
        this.tagDOM;
        this.tagInnerText;
        this.priorityDOM;
        this.priorityInnerText;
        //one tag articles
        this.articlesDOM;
        this.articlesDOMS;
        this.articlesUlDOM;
        this.taggedArticles = [];
        this.deleteSvgDOMS;
        this.addArticleDOM;
        this.addArticleSvgDOM;
        this.addArticleSelectDOM;
        this.addArticleOptionstDOMS;

        this.cancelEditBtnDOM;
        this.updateBtnDOM;
        // one tag section
        this.secItemDOM;
        this.secTagDOM;
        // this.letDeleteItemsLists()
    }
    borderWarningCSS(){
        this.scrollToItem = this.openItemDOM.offsetTop - this.openItemDOM.offsetHeight - 30;
        super.borderWarningCSS();
    }
    letCreateItem(){
        super.letCreateItem();
        this.createAddArticle = new AddSelectedItem(this.createListVarsDOMS[0]);
        this.createAddArticle.saveOptionsHTML()
    }
    clearCreate(){
        super.clearCreate();
        this.createAddArticle.fullOptions();
    }


    //edit


    // delete
    letDeleteItemHandler = (e) => {
        if(this.openItemDOM){
            this.borderWarningCSS()
        }
        else{
            this.openItemDOM = e.target.closest('li');                    
            this.changeToDeleteButtons();
            this.setDeleteItemVariables()
            this.borderOpenCSS()
            this.cancelDeleteBtnDOM.addEventListener('click', this.cancelDelete, {once:true})
            this.deleteBtnDOM.addEventListener('click', this.delete, {once:true})
        }
    }
    setDeleteItemVariables(){
        this.openItemId = this.openItemDOM.id.replace(this.selector + '-edit-', '')
        this.liChildernDOMS = this.openItemDOM.querySelectorAll(':scope > div:not(.edit--actions, .update--actions, .delete--actions');
        this.cancelDeleteBtnDOM = this.openItemDOM.querySelector('.delete--actions > .--cancel');
        this.deleteBtnDOM = this.openItemDOM.querySelector('.delete--actions > .--delete');
        this.secItemDOM = this.sectionDOM.querySelector(`#${this.selector}-${this.openItemId}`);
    }
    delete = () => {
        this.loadeBoxDOM.style.display = 'block';
        axios.delete(`${this.deleteRoute}/${this.openItemId}`)
        .then(res => {
            if(res.data.message){
                this.sectionUlDOM.removeChild(this.secItemDOM);
                this.ulDOM.removeChild(this.openItemDOM);
                this.openItemDOM = null;
                this.openItemId = null;
                this.showMsg(res.data.message);
                this.cancelDeleteBtnDOM.removeEventListener('click', this.cancelDelete);
            }
            else {
                this.deleteBtnDOM.addEventListener('click', this.delete, {once:true})
            }
            this.loadeBoxDOM.style.display = 'none';
        })
    }
    cancelDelete = () => {
        this.changeToDeleteButtons();
        this.removeBorderCSS();

        this.deleteBtnDOM.removeEventListener('click', this.delete)
        this.openItemDOM = null;
        this.openItemId = null;
    }
}
export default TagsNav;