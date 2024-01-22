

class NavStyles{
    constructor(selector, color, activeColor){
        this.selector = selector;
        this.color = color;
        this.activeColor = activeColor;
        this.navDOM;
        this.navLinksDOMS;
        this.setDOMS;;
        this.hoverFontWeight;
        this.hoverOptions;
        this.unHoverOptions;
        this.setVariables();
        this.setNavStyles();
        this.animation();
    }
    setVariables(){
        this.navDOM = document.querySelector(this.selector);
        this.navLinksDOMS = this.navDOM.querySelectorAll('a');
        this.hoverFontWeight = [
            {  fontVariationSettings: "'wght' 400", letterSpacing: '0px', fontSize: '17px', color:this.color},
            { fontVariationSettings: "'wght' 500", letterSpacing: '0.05px', fontSize: '17.2px', color:this.activeColor},
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
                navLink.style.cssText =  `font-variation-settings: 'wght' 600; letter-spacing: 0.05px; font-size: 17.2px; color: ${this.activeColor}; `
        
            }else{
                navLink.style.cssText = `font-variation-settings: 'wght' 400; letter-spacing: 0; font-size: 17px; color: ${this.color}; border-bottom: none`;
            } 
            const linkWidth = navLink.offsetWidth;
            navLink.style.width = linkWidth + 20 + 'px';
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

export default NavStyles;