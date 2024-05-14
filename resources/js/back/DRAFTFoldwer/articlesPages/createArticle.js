import TopMessage from "./topMessage";

class CreateArticle{
    constructor(){
        this.formDOM;
        this.inputsDOMS;
        this.submitDOM;
        this.cancelDOM;
        this.imgsDataDOMS;
        this.imgsInputBoxDOMS;
        this.errorsDOMS;
        this.setVariables();
        this.listenToClisks()
    }
    setVariables(){
        this.formDOM = document.querySelector('.--form');
        this.submitDOM = this.formDOM.querySelector('.store--actions .--store');
        this.cancelDOM = this.formDOM.querySelector('.store--actions .--cancel');
        this.imgsDataDOMS = this.formDOM.querySelectorAll('.img--data--box');
        this.imgsInputBoxDOMS = this.formDOM.querySelectorAll('.file--input--box');
        this.errorsDOMS = this.formDOM.querySelectorAll('.--error')
    }
    listenToClisks(){
        this.submitDOM.addEventListener('click', this.store)
        this.cancelDOM.addEventListener('click', this.cancel)

    }
    store = () => {
        let formData = new FormData;
        this.inputsDOMS = this.formDOM.querySelectorAll('input, textarea');
        this.inputsDOMS.forEach(input => {
            if(input.value !== ''){
                if(input.type !== 'file'){
                    formData.append(input.name, input.value)
                }
                else{
                    formData.append(input.name, input.files[0])

                }
            }
        })
        axios.post(articleStoreRoute, formData, {headers:{ "Content-Type": "multipart/form-data"}})
        .then(res => {
            if(res.data.errors){
                this.addErrors(res.data.errors)
            }
            else if(res.data.message){
                
                new TopMessage(res.data.message)
                window.location.href = articleRoute + '/' + res.data.url;

            }
        })
    }
    addErrors(errors){
        this.errorsDOMS.forEach(error => {
            error.innerText = '';
        })
        for(const [key, error] of Object.entries(errors)){
            const formatedKey = key.match(/[A-Za-z_\d]*/)[0]
            const errorDOM = this.formDOM.querySelector(`.${formatedKey}--error`);
            errorDOM.innerText = `* ${error}`
        }
    }
    cancel = () => {
        this.inputsDOMS.forEach(input => {
            if(input.value !== ''){
                input.value = ''
            }
        })
        this.errorsDOMS.forEach(error => {
            error.innerText = '';
        })
        this.imgsDataDOMS.forEach(imgDataDOM => {
            if(imgDataDOM.style.display === 'block'){
                imgDataDOM.style.display = 'none';
            }
        })
        this.imgsInputBoxDOMS.forEach(imgInputBoxDOM => {
            if(imgInputBoxDOM.style.display === 'none'){
                imgInputBoxDOM.style.display= 'flex';
            } 
        })
    }
}
export default CreateArticle;