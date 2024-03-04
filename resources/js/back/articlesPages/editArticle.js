import TopMessage from "../parts/topMessage";

class EditArticle{
    constructor(){
        this.articleId;
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
        this.articleId = window.location.href.split('/').pop();
        this.formDOM = document.querySelector('.--form');
        this.submitDOM = this.formDOM.querySelector('.update--actions .--update');
        this.cancelDOM = this.formDOM.querySelector('.update--actions .--cancel');
        this.imgsDataDOMS = this.formDOM.querySelectorAll('.img--data--box');
        this.imgsInputBoxDOMS = this.formDOM.querySelectorAll('.file--input--box');
        this.errorsDOMS = this.formDOM.querySelectorAll('.--error')
    }
    listenToClisks(){
        this.submitDOM.addEventListener('click', this.update)
        this.cancelDOM.addEventListener('click', this.cancel)

    }
    update = () => {
        let formData = new FormData();
        formData.append('_method', 'put');
        this.inputsDOMS = this.formDOM.querySelectorAll('input, textarea');
        this.inputsDOMS.forEach(input => {
            if(input.value.trim() !== ''){
                if(input.type !== 'file'){
                    formData.append(input.name, input.value.trim())
                    // console.log(formData)
                    // console.log(input.name, input.value)

                }
                else{
                    formData.append(input.name, input.files[0])

                }
            }
        })
        console.log(formData)
        axios.post(articleUpdateRoute + '?id=' + this.articleId, formData, {headers:{ "Content-Type": "multipart/form-data"}})
        .then(res => {
            if(res.data.errors){
                this.addErrors(res.data.errors)
            }
            else if(res.data.message){
                
                new TopMessage(res.data.message)
                window.location.href = articleRoute + '?id=' + res.data.id;

            }
        })
    }
    addErrors(errors){
        this.errorsDOMS.forEach(error => {
            error.innerText = '';
        })
        console.log(errors)
        for(const [key, error] of Object.entries(errors)){
            const keyLetters = key.match(/[A-Za-z_]*/)
            const errorDOM = this.formDOM.querySelector(`.${keyLetters}--error`);
            errorDOM.innerText = `* ${error}`
        }
    }
    // cancel = () => {
    //     this.inputsDOMS.forEach(input => {
    //         if(input.value !== ''){
    //             input.value = ''
    //         }
    //     })
    //     this.errorsDOMS.forEach(error => {
    //         error.innerText = '';
    //     })
    //     this.imgsDataDOMS.forEach(imgDataDOM => {
    //         if(imgDataDOM.style.display === 'block'){
    //             imgDataDOM.style.display = 'none';
    //         }
    //     })
    //     this.imgsInputBoxDOMS.forEach(imgInputBoxDOM => {
    //         if(imgInputBoxDOM.style.display === 'none'){
    //             imgInputBoxDOM.style.display= 'flex';
    //         } 
    //     })
    // }
}
export default EditArticle;