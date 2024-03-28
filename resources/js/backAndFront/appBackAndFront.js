
import NavStyles from './nav';
import ThirdAndFourthSecAppear from './firstPage/thirdAndFourthSecAppear';
import SecondSection from './firstPage/secondSection';

// footer animations
const footerNavAnimation = new NavStyles('.footer--nav', '#161616', '#17453F', '22px', '18.2px', '0');
footerNavAnimation.setNavStyles();
footerNavAnimation.animation();
// contact animation
const contactAnimation = new NavStyles('.--contacts', '#161616', '#161616',  '16px', '16px', '3px');
contactAnimation.animation();

// firt page
if(document.querySelector('.about--me--page')){
    //sec 2
    new SecondSection('#about')
    // sec 3
    new ThirdAndFourthSecAppear('#education')
    // sec 4
    new ThirdAndFourthSecAppear('#work')
}

// nav styles
//first mage
if(document.querySelector('.about--me--page') || document.querySelector('.services--list') || document.querySelector('.contacts--page')){
    const navAnimation = new NavStyles('.--nav', '#17453F', '#17453F',  '22px', '18.2px', '0');
    navAnimation.setNavStyles();
    navAnimation.animation();
}
// articles page

if(document.querySelector('.articles--page') 
|| document.querySelector('.article--page')
){
    const navAnimation = new NavStyles('.--nav', '#EFEFEF', '#E9C1C8',  '22px', '18.2px', '0');
    navAnimation.setNavStyles();
    navAnimation.animation();

    const articlesTagsNav = new NavStyles('.tags--nav', '#EFEFEF', '#E9C1C8', '19px', '19.2px', '0')
    articlesTagsNav.animation();

}
if(document.querySelector('.article--page')){
    if(document.querySelector('.media--link--box')){
        const articlesToMedia = new NavStyles('.media--link--box', '#17453F', '#17453F', '18px', '18px', '0')
        articlesToMedia.setNavStyles();
        articlesToMedia.animation();
    }
}
if(document.querySelector('.article--create') || document.querySelector('.article--edit')){
    const navAnimation = new NavStyles('.--nav', '#EFEFEF', '#E9C1C8',  '22px', '18.2px', '0');
    navAnimation.setNavStyles();
    navAnimation.animation();
}

