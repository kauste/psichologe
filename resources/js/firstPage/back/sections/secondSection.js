class SecondSection{
    constructor(selector){
        this.selector = selector;
        this.sectionDOM;
        this.headingDOM;
        this.paragraphBoxDOM;
        this.paragraphDOM;
        this.bambooDOM;
        this.init()
    }
    init(){
        this.setVariables()
        this.setBambooHeight()
        this.onAppear()
        this.resizeWindow()
        this.changeParagraph()
    }
    setVariables(){
        this.sectionDOM = document.querySelector(this.selector);
        this.headingDOM = this.sectionDOM.querySelector('.--heading > h2');
        this.paragraphBoxDOM = this.sectionDOM.querySelector('.--paragraph');
        this.paragraphDOM = this.sectionDOM.querySelector('.--paragraph p');
        this.bambooDOM = this.sectionDOM.querySelector('.--bamboo');
    }
    setBambooHeight(){
        const paragraphHeight = this.paragraphDOM.offsetHeight;
        this.bambooDOM.style.height = paragraphHeight + 150 + 'px';
    }
    onAppear(){
        const headingAppear = [
            {transform: 'translateY(0)', opacity: 0.7},
            {transform: 'translateY(-30px)', opacity: 1},
          ]
        const headingAppearOptions =  {
                            duration: 1000,
                            easing: 'ease',
                            iterations:1,
                            fill: 'forwards'
                        }
        const paragraphAppear = [
                    {transform: 'translateY(0)', opacity: 0.7},
                    {transform: 'translateY(-30px)', opacity: 1},
                    ]
        const paragraphAppearOptions =  {
                            duration: 1000,
                            easing: 'ease',
                            iterations:1,
                            fill: 'forwards',
                            delay:1000
                            }
        const scrolledToSeconSection = () => {
            if(window.scrollY >= window.innerHeight / 3){
              this.headingDOM.animate(headingAppear, headingAppearOptions)
              this.paragraphDOM.animate(paragraphAppear, paragraphAppearOptions)
              window.removeEventListener('scroll', scrolledToSeconSection);
            }
        }
        window.addEventListener('scroll', scrolledToSeconSection)
    }
    resizeWindow(){
        window.addEventListener("resize", () => {
            const paragraphHeight = this.paragraphDOM.offsetHeight;
            this.bambooDOM.style.height = paragraphHeight + 150 + 'px';
          });
    }
    changeParagraph(){
        this.paragraphDOM.addEventListener('input', () => {
            const paragraphHeight = this.paragraphDOM.offsetHeight;
            this.bambooDOM.style.height = paragraphHeight + 150 + 'px';
          });
    }
}

function secondSectionUpdate(){
    const section2DOM = document.querySelector('.section--2')
    const editDOM = section2DOM.querySelector('.--edit')
    const actionsDOM = section2DOM.querySelector('.update--actions')
    const cancelDOM =  actionsDOM.querySelector('.--cancel');
    const updateDOM =  actionsDOM.querySelector('.--update');
    const paragraphDOM = section2DOM.querySelector('.--paragraph p')
    const loadeBoxDOM = document.querySelector('.loader--box');

    editDOM.addEventListener('click', () => {
        actionsDOM.style.display = 'flex';
        paragraphDOM.setAttribute('contenteditable', true)
    })
    if(actionsDOM.style.display !== 'none'){
        cancelDOM.addEventListener('click', () => {
            actionsDOM.style.display = 'none';
            paragraphDOM.setAttribute('contenteditable', false)
        })
        updateDOM.addEventListener('click', () => {
            loadeBoxDOM.style.display = 'block';

            axios.put(editAboutRoute, {about:paragraphDOM.innerText})
            .then(_ => {
                paragraphDOM.innerText = paragraphDOM.innerText;
                actionsDOM.style.display = 'none';
                paragraphDOM.setAttribute('contenteditable', false)
                loadeBoxDOM.style.display = 'none';

            })
        })
    }
}

export { SecondSection, secondSectionUpdate };