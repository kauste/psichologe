class DOMmodifier{
    appendElement(parentDOM, tag, html, dataset, value){
        let el = document.createElement(tag)
        if(dataset) Object.entries(dataset).forEach(([key, value]) => el.dataset[key] = value);
        if(value) el.value = value
        el.innerHTML = html;
        parentDOM.appendChild(el);
        return el;
    }
    prependElement(parentDOM, tag, html, dataset, value){
        let el = document.createElement(tag)
        if(dataset) Object.entries(dataset).forEach(([key, value]) => el.dataset[key] = value);
        if(value) el.value = value
        el.innerHTML = html;
        parentDOM.prepend(el);
        return el;
    }
    insertElement(parentDOM, element){
        let priority = element.dataset.priority
        priority = priority && !isNaN(priority)? parseInt(priority) : null;
        const elementsList = Array.from( parentDOM.querySelectorAll(`:scope > li`))

        let afterElement = null;
        if(priority && priority > 0){
            for(let i = 0; i < elementsList.length; i++){
                let listElementPriority = parseInt(elementsList[i].dataset.priority)
                listElementPriority = listElementPriority ? listElementPriority : null;
                if (!listElementPriority || (listElementPriority && listElementPriority >= priority)) {
                    afterElement = elementsList[i];
                    break;
                }
            }
        }
        (afterElement || priority === 0) ? parentDOM.insertBefore(element, afterElement) : parentDOM.appendChild(element);
    }
}
export default DOMmodifier;