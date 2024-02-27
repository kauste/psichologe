import { CRUDmodal } from "../parts/CRUDmodal";

class TagsNav extends CRUDmodal{
    constructor(cssStyles, selector, updateRoute, storeRoute, deleteRoute){
        super(cssStyles, selector)
        this.cssStyles = cssStyles;
        this.updateRoute = updateRoute;
        this.storeRoute = storeRoute;
        this.deleteRoute = deleteRoute;
        // create
        this.priorityCreateDOM;
        this.tagCreateDOM;
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
        this.deleteSvgDOMS;
        this.initialTaggedArticles = [];
        this.taggedArticles = [];
        this.addArticleDOM;
        this.addArticleSvgDOM;
        this.addArticleSelectDOM;
        this.addArticleOptionstDOMS;

        this.cancelEditBtnDOM;
        this.updateBtnDOM;
        // one tag section
        this.secItemDOM;
        this.secTagDOM;
    }
    borderWarningCSS(){
        this.scrollToItem = this.openItemDOM.offsetTop - this.openItemDOM.offsetHeight - 30;
        super.borderWarningCSS();
    }

    // create
    setCreateItemVariables (){
        this.tagCreateDOM = this.addBoxDOM.querySelector('.--tag');
        this.priorityCreateDOM = this.addBoxDOM.querySelector('.--priority');
        this.storeBtnDOM = this.addBoxDOM.querySelector('.store--actions .--store');
        this.cancelStoreBtnDOM = this.addBoxDOM.querySelector('.store--actions .--cancel');
        this.letCreateItem();
    }
    letCreateItem(){
        this.storeBtnDOM.addEventListener('click', () => { this.store() });
        this.cancelBtnDOM.addEventListener('click', () => { this.clearCreate() });
    }
    store (){
        this.loadeBoxDOM.style.display = 'block';
        const tagInnerText = this.tagCreateDOM.innerText;
        const priority = parseInt(this.priorityCreateDOM.innerText);
        const data = {tag:tagInnerText,
                      priority:priority};
        axios.post(this.storeRoute, {data:data})
        .then(res => {
            if(res.data.errors){  
                let errorsHTML = '';
                res.data.errors.forEach(error => {
                    errorsHTML += `<div>${error}</div>`
                })
                this.showMsg(errorsHTML)
            }
            else if(res.data.message){
                this.appendEditDeleteModal(res.data.modalHTML, res.data.itemId, priority)
                this.appendSection(res.data.sectionHTML, res.data.itemId, priority)
                this.clearCreate();
                this.showMsg(res.data.message);
            }
            this.loadeBoxDOM.style.display = 'none';
        })
    }

    appendEditDeleteModal(modalHTML, itemId, priority){
        let li = document.createElement('li')
        li.classList.add('one-tag');
        li.id = `tagsNav-edit-${itemId}`;
        li.dataset.priority = priority;
        li.innerHTML = modalHTML;
        this.insertItemInList(this.ulDOM, li)
        this.activateItemEditDeleteBtns(li)

    }
    appendSection(sectionHTML, itemId, priority){
        let li = document.createElement('li')
        li.id = `tagsNav-${itemId}`
        li.dataset.priority = priority;
        li.innerHTML = sectionHTML;
        this.insertItemInList(this.sectionUlDOM, li)
    }

    clearCreate(){
        this.tagCreateDOM.innerText = '';
        this.priorityCreateDOM.innerText = '';
        this.addBoxForm.style.border = 'none';
    }
    //edit
    letEditItemHandler(editItemBtn, e){
        e.preventDefault();
        if(this.openItemDOM){
            this.borderWarningCSS()
        }
        else{
            console.log(this.ulDOM)
            this.openItemDOM = editItemBtn.closest('li');
            this.setEditItemVariables();
            this.changeToEditButtons();
            this.borderOpenCSS()
            this.cancelEditBtnDOM.addEventListener('click', this.cancelEdit, {once:true})
            this.updateBtnDOM.addEventListener('click', this.update, {once:true})
        }
    }
    setEditItemVariables(){
        //modal
        this.openItemId = this.openItemDOM.id.replace(this.selector + '-edit-', '')
        this.liChildernDOMS = this.openItemDOM.querySelectorAll(':scope > div:not(.edit--actions, .update--actions, .delete--actions');
        // editable variables doms
        this.tagDOM = this.openItemDOM.querySelector('.--tag');
        this.articlesDOM = this.openItemDOM.querySelector('.--articles');
        this.priorityDOM = this.openItemDOM.querySelector('.--priority');
        //articles
        this.articlesUlDOM = this.articlesDOM.querySelector('ul');
        this.articlesDOMS = this.articlesDOM.querySelectorAll('li[data-article-id]');
        this.articlesDOMS.forEach(article => {
            this.taggedArticles.push(article.dataset.articleId);
            this.initialTaggedArticles.push(article.dataset.articleId);
            })
        this.deleteSvgDOMS = this.articlesDOM.querySelectorAll('.delete--article--svg')
        this.addArticleDOM = this.articlesDOM.querySelector('.add--article');
        this.addArticleSvgDOM = this.addArticleDOM.querySelector('svg');
        this.addArticleSelectDOM = this.addArticleDOM.querySelector('select');
        this.addArticleOptionstDOMS = this.addArticleSelectDOM.querySelectorAll('option')
        ;
        //buttons
        this.cancelEditBtnDOM = this.openItemDOM.querySelector('.update--actions > .--cancel');
        this.updateBtnDOM = this.openItemDOM.querySelector('.update--actions > .--update');
        //section
        this.secItemDOM = document.querySelector(`#${this.selector}-${this.openItemId}`);
        this.secTagDOM = this.secItemDOM.querySelector('.--tag');
        // save inner text for cancel
        this.tagInnerText = this.tagDOM.innerText;
        this.priorityInnerText = this.priorityDOM.innerText;
        this.articlesInnerHTML = this.articlesUlDOM.innerHTML

        this.editStyles();
        this.makeItemEditable();
    }
    editStyles(){
        this.deleteSvgDOMS.forEach(deleteSvgDOM => {
            deleteSvgDOM.style.display = deleteSvgDOM.style.display === 'flex' ? 'none' : 'flex';
        });
        this.addArticleDOM.style.display = this.addArticleDOM.style.display=== 'flex' ? 'none' : 'flex';
        this.articlesDOMS.forEach((art) => {
            art.style.paddingBottom = art.style.paddingBottom === '0px' ? '5px' : '0px';
        })
        this.articlesDOM.style.padding = this.articlesDOM.style.padding === '0px' ? '5px' : '0px';
    }

    makeItemEditable(){
        this.openItemDOM.classList.add('editable');
        this.tagDOM.setAttribute('contenteditable', true);
        this.priorityDOM.setAttribute('contenteditable', true);
        this.deleteSvgDOMS.forEach(deleteSvgDOM => {
            deleteSvgDOM.addEventListener('click', this.deleteArticleTagHandler(deleteSvgDOM))
        });

        this.addArticleDOM.querySelector('svg').addEventListener('click', this.addArticleHandler)

    }
    deleteArticleTagHandler =  (deleteSvgDOM) => () => {
        this.taggedArticles = this.taggedArticles.filter((articleId) => articleId != deleteSvgDOM.closest('li').dataset.articleId)
        deleteSvgDOM.closest('li').style.display = 'none';
    }
    addArticleHandler = () => {
        if(this.taggedArticles.includes(this.addArticleSelectDOM.value)){
            this.articlesDOMS.forEach(art => {
                if(art.dataset.articleId === this.addArticleSelectDOM.value){
                    art.animate(this.cssStyles.scaleKeyframes, this.cssStyles.scaleOptions)
                }
            })
        }
        else {
            this.taggedArticles.push(this.addArticleSelectDOM.value)
            //add element
            const optionDOM = Array.from(this.addArticleOptionstDOMS).find(option => option.value === this.addArticleSelectDOM.value);
            let li = document.createElement('li');
            li.dataset.articleId = this.addArticleSelectDOM.value;
            li.style.paddingBottom = '5px';
            const articleHTML = `<div class="svg-box delete-svg-box delete--article--svg" style="display:flex">
                                    <svg class="delete-svg">
                                        <use xlink:href="#delete"></use>
                                    </svg>
                                </div>
                                <div>${optionDOM.innerText}</div>`;
            li.innerHTML = articleHTML;
            this.articlesUlDOM.appendChild(li);
            const newDeleteSvgDOM = li.querySelector('svg');
            //add listeners
            newDeleteSvgDOM.addEventListener('click', this.deleteArticleTagHandler(newDeleteSvgDOM))          
            //change DOM
            this.articlesDOMS = this.articlesDOM.querySelectorAll('li[data-article-id]');
            this.deleteSvgDOMS = this.articlesDOM.querySelectorAll('.delete--article--svg')          
            
        }
    }
    update = () => {
        // this.loadeBoxDOM.style.display = 'block';
        const tagInnerText = this.tagDOM.innerText;
        const priorityInnerText = this.priorityDOM.innerText;

        const data = {tag:tagInnerText,
                      priority:priorityInnerText,
                      articles:this.taggedArticles}
        axios.put(`${this.updateRoute}/${this.openItemId}`, {data:data})
        .then(res => {
            if(res.data.errors){
                let errorsHTML = '';
                res.data.errors.forEach(error => {
                    errorsHTML += `<div>${error}</div>`
                })
                this.showMsg(errorsHTML)
                this.updateBtnDOM.addEventListener('click', this.update, {once:true})
            }
            else if(res.data.message){
                this.cancelEditBtnDOM.removeEventListener('click', this.cancel)
                this.secTagDOM.innerText = tagInnerText;
                this.changePositionInModal(priorityInnerText)
                this.changePositionInSec(priorityInnerText)
                this.closeItemEdit()
                this.showMsg(res.data.message)
                this.priorityDOM.style.fontStyle = parseInt(this.priorityDOM.innerText) ? 'normal' : 'italic';
                this.priorityDOM.style.color = parseInt(this.priorityDOM.innerText) ? '#000' : '#999';
                this.priorityDOM.style.fontSize = parseInt(this.priorityDOM.innerText) ? '16px' : '0.875rem';

                this.priorityDOM.innerText = parseInt(this.priorityDOM.innerText) ? parseInt(this.priorityDOM.innerText) : 'nesvarbu';

            }
            this.loadeBoxDOM.style.display = 'none';
        })
    }
    changePositionInSec(priority){
        this.sectionUlDOM.removeChild(this.secItemDOM);
        this.secItemDOM.dataset.priority = priority;
        this.insertItemInList(this.sectionUlDOM, this.secItemDOM)

    }
    changePositionInModal(priority){
        this.ulDOM.removeChild(this.openItemDOM)
        this.openItemDOM.dataset.priority = priority;
        this.insertItemInList(this.ulDOM, this.openItemDOM)
        // this.activateItemEditDeleteBtns(this.openItemDOM)
    }

    cancelEdit = () => {
        this.updateBtnDOM.removeEventListener('click', this.update);
        this.tagDOM.innerText = this.tagInnerText;
        this.priorityDOM.innerText = this.priorityInnerText;
        this.articlesUlDOM.innerHTML = this.articlesInnerHTML;
        this.taggedArticles = this.initialTaggedArticles;
        this.deleteSvgDOMS.forEach(deleteSvgDOM => {
            deleteSvgDOM.closest('li').style.display = 'flex';
        })
        this.closeItemEdit()
    }
    closeItemEdit(){
        this.changeToEditButtons();
        this.removeBorderCSS();
        // //remove editable
        this.makeNotEditable();
        this.editStyles();
        // //reset variables
        this.tagInnerText = '';
        this.priorityInnerText = '';
        this.liChildernDOMS = null;
        this.citationDOM = null;
        // // should be last
        this.openItemId = null;
        this.openItemDOM = null;

    }
    makeNotEditable(){
        this.openItemDOM.classList.remove('editable');
        this.tagDOM.setAttribute('contenteditable', false);
        this.priorityDOM.setAttribute('contenteditable', false);
        this.deleteSvgDOMS.forEach(deleteSvgDOM => {
            deleteSvgDOM.removeEventListener('click', this.deleteArticleTagHandler(deleteSvgDOM))
        });

        this.addArticleDOM.querySelector('svg').removeEventListener('click', this.addArticleHandler)

    }


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
            }
            else {
                this.deleteBtnDOM.addEventListener('click', this.delete, {once:true})
            }
            this.loadeBoxDOM.style.display = 'none';
        })
        this.cancelDeleteBtnDOM.removeEventListener('click', this.cancelDelete);
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