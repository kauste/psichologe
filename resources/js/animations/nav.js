

class NavStyles{
    constructor(selector, color, activeColor, fontSize, activeFontSize, activeTransform){
        this.selector = selector;
        this.color = color;
        this.activeColor = activeColor;
        this.fontSize = fontSize;
        this.activeFontSize = activeFontSize;
        this.activeTransform = activeTransform
        this.navDOM;
        this.navLinksDOMS;
        this.setDOMS;;
        this.hoverFontWeight;
        this.hoverOptions;
        this.unHoverOptions;
        this.setVariables();
    }
    setVariables(){
        this.navDOM = document.querySelector(this.selector);
        this.navLinksDOMS = this.navDOM.querySelectorAll('a');
        this.hoverFontWeight = [
            {  fontVariationSettings: "'wght' 400", letterSpacing: '0px', fontSize: this.fontSize, color:this.color, transform:'translate(0)'},
            { fontVariationSettings: "'wght' 500", letterSpacing: '0.05px', fontSize: this.activeFontSize, color:this.activeColor, transform:`translate(${this.activeTransform})`},
        ];
        this.hoverOptions = {
            duration: 300,
            iterations: 1,
            easing   : 'ease',
            fill:'forwards',
        };
        this.unHoverOptions = {
            duration: 300,
            iterations: 1,
            easing   : 'ease',
            direction: 'reverse',
            fill:'forwards'
        
        };
    }
    setNavStyles(){
        this.navLinksDOMS.forEach(navLink => {
            if(navLink.classList.contains('active')){
                navLink.style.cssText =  `font-variation-settings: 'wght' 600; letter-spacing: 0.05px; font-size: ${this.fontSize}; color: ${this.activeColor}; `
        
            }else{
                navLink.style.cssText = `font-variation-settings: 'wght' 400; letter-spacing: 0; font-size: ${this.fontSize}; color: ${this.color}; border-bottom: none`;
            } 
            navLink.style.width = navLink.offsetWidth + 20 + 'px';
        })
    }
    animation(){
        this.navLinksDOMS.forEach(navLink => {
            navLink.addEventListener('mouseover', this.linkMouseoverHandle(navLink))
            navLink.addEventListener('mouseout', this.linkMouseoutHandle(navLink))
        })
    }
    linkMouseoverHandle = (navLink) => () => {
        if(!navLink.classList.contains('active')){
            navLink.animate(this.hoverFontWeight, this.hoverOptions);
        }
    }
    linkMouseoutHandle = (navLink) => () => {
        if(!navLink.classList.contains('active')){
            if(!navLink.classList.contains('active')){
                navLink.animate(this.hoverFontWeight, this.unHoverOptions);
            }
        }
    }
}
class MobileNav{
    constructor(navSelector, btnSelector){
        this.navSelector = navSelector;
        this.btnSelector = btnSelector;
        this.bodyDOM;
        this.navDOM;
        this.toggleBtnDOM;
        this.init();
    }
    init(){
        this.bodyDOM = document.querySelector('body');

        this.navDOM = this.bodyDOM.querySelector(this.navSelector);
        this.toggleBtnDOM = this.navDOM.querySelector(this.btnSelector);
        this.navDOM.addEventListener('click', this.openNav, {once:true})
    }

    openNav = (e) => {
        e.stopImmediatePropagation()
        this.navDOM.classList.add('--open')
        console.log('open');
        this.bodyDOM.addEventListener('click', this.removeClass);
    }
    removeClass = (e) => {
        if(this.navDOM.contains(e.target) && !this.toggleBtnDOM.contains(e.target)) return;
        this.navDOM.classList.remove('--open');
        this.bodyDOM.removeEventListener('click', this.removeClass);
        this.navDOM.addEventListener('click', this.openNav, {once:true})
    }

}

export { NavStyles, MobileNav };