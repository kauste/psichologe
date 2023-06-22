const nav = document.querySelector('.--nav');
const navLinks = nav.querySelectorAll('a');

function setNavStyles(){
    navLinks.forEach(navLink => {
        if(navLink.classList.contains('active')){
            navLink.style.cssText =  "font-variation-settings: 'wght' 600; letter-spacing: 0.05px; font-size: 17.2px; color: #E9C1C8; "
    
        }else{
            navLink.style.cssText = "font-variation-settings: 'wght' 400; letter-spacing: 0; font-size: 17px; color: #fff; border-bottom: none";
        } 
        const linkWidth = navLink.offsetWidth;
        navLink.style.width = linkWidth + 20 + 'px';
    })
}

function navLinksAnimation(){
    const hoverFontWeight = [
        {  fontVariationSettings: "'wght' 400", letterSpacing: '0px', fontSize: '17px', color:'#fff'},
        { fontVariationSettings: "'wght' 500", letterSpacing: '0.05px', fontSize: '17.2px', color:'#E9C1C8'},
      ];
      const hoverOptions = {
        duration: 300,
        iterations: 1,
        easing   : 'ease',
        fill:'forwards',
      };
      const unHoverOptions = {
        duration: 300,
        iterations: 1,
        easing   : 'ease',
        direction: 'reverse',
        fill:'forwards'
    
      };
    navLinks.forEach(navLink => {
        navLink.addEventListener('mouseover', () => {
            if(!navLink.classList.contains('active')){
                navLink.animate(hoverFontWeight, hoverOptions);
            }
    
        })
        navLink.addEventListener('mouseout', () => {
            if(!navLink.classList.contains('active')){
                if(!navLink.classList.contains('active')){
                    navLink.animate(hoverFontWeight, unHoverOptions);
                }
    
            }
        })
    })
}

function navigation(){
    setNavStyles();
    navLinksAnimation();
}
export default navigation;