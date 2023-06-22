const section3 = document.querySelector('.section--3');
const section4 = document.querySelector('.section--4');
let lastScrollPos;

function appearSection(section){
    const secrionappearAnim = [
        {opacity:0.5},
        {opacity:1}
    ]
    const secrionappearOptions = {
        duration: 2000,
        iterations: 1,
        easing: 'ease',
        fill:'forwards'
    }
    window.addEventListener('scroll', function scrolledToSection() {
        if((section.getBoundingClientRect().top - window.innerHeight / 3 * 2  <=  0)){
            section.animate(secrionappearAnim, secrionappearOptions)
            window.removeEventListener('scroll', scrolledToSection);
        }
    })
}

function setScroll(section){
    const downBtn = section.querySelector('.ch--down');
    const upBtn = section.querySelector('.ch--up');    
    const ul = section.querySelector('ul');
    const ulBoxHeight = ul.closest('div').offsetHeight;
    const ulHeight = ul.offsetHeight;

    const transformOptions = {
        duration: 1000,
        easing: 'ease',
        iterations:1,
        fill: 'forwards'
    }
    downBtn.addEventListener('click', () => {
        const currTransform = ul.style.transform ? +ul.style.transform.match(/(-?[0-9\.]+)/g)[0] : 0;

        let transformTo;
        if((-1 * currTransform + 2 * ulBoxHeight) >= ulHeight){
            transformTo = -1 *(ulHeight - ulBoxHeight)
        }
        else transformTo = currTransform - ulBoxHeight;
        
        const transformAnim = [
            {transform: `translateY(${ currTransform }px)`},
            {transform: `translateY(${ transformTo }px)`},
          ]

        if(ulBoxHeight < ulHeight 
        && ulBoxHeight - ulHeight <= currTransform){
            ul.animate(transformAnim, transformOptions)
            ul.style.transform = `translateY(${ transformTo }px)`;
            upBtn.classList.remove('disabled');
            if(ulBoxHeight - ulHeight === currTransform) downBtn.classList.add('disabled');
            lastScrollPos = transformTo;
        }
    })
    upBtn.addEventListener('click', () => {
        let currTransform = ul.style.transform ? +ul.style.transform.match(/(-?[0-9\.]+)/g)[0] : 0;
        let transformTo;
        if(currTransform  <= ulHeight){
            transformTo = 0;
        }
        else transformTo = currTransform - ulBoxHeight;
        const transformAnim = [
            {transform: `translateY(${currTransform}px)`},
            {transform: `translateY(${ transformTo }px)`},
          ]
        if(ulBoxHeight < ulHeight ){
            ul.animate(transformAnim, transformOptions)
            ul.style.transform = `translateY(${ transformTo }px)`;
            downBtn.classList.remove('disabled');
            if(currTransform === 0) upBtn.classList.add('disabled');
            lastScrollPos = transformTo;
        }
    })
}
function touch(section){
    const downBtn = section.querySelector('.ch--down');
    const upBtn = section.querySelector('.ch--up');    
    const ulBox = section.querySelector('.ul--box');
    const ul = ulBox.querySelector('ul');
    const ulBoxHeight = ul.closest('div').offsetHeight;
    const ulHeight = ul.offsetHeight;
    let isGoingDown = true;

    function touchstart(ev){
        ev.preventDefault();
        lastScrollPos = ev.changedTouches[0].clientY;
        ulBox.removeEventListener("touchstart", touchstart);

    }
    function touchmove(ev){
        ev.preventDefault();
        [...ev.changedTouches].forEach(touch => {
            let currTransform = ul.style.transform ? +ul.style.transform.match(/(-?[0-9\.]+)/g)[0] : 0;
            if(lastScrollPos > touch.clientY && -1* currTransform + 2 <= ulHeight - ulBoxHeight){
                ul.style = `transform: translateY(${ currTransform - 2  }px) !important`;
                // ul.style.transform = `translateY(${ currTransform - 2  }px)`;

                // ul.style.setProperty('transform', `translateY(${ currTransform - 2  }px)`, 'important');
                upBtn.classList.remove('disabled');
                if(-1* currTransform + 2 >= ulHeight - ulBoxHeight) downBtn.classList.add('disabled');
                isGoingDown = true;
            }
            else if(lastScrollPos < touch.clientY && currTransform + 2 <= 0){
                // ul.style.transform = `translateY(${ currTransform + 2  }px)`;
                ul.style = `transform:translateY(${ currTransform + 2  }px) !important`;

                downBtn.classList.remove('disabled');
                if(currTransform + 2 >= ulHeight - ulBoxHeight) upBtn.classList.add('disabled');
                isGoingDown = false;
            }
            lastScrollPos = touch.clientY;

        })
    }
    function touchend(ev){
        ev.preventDefault();
        const oneLineHeight = ulBoxHeight/ 5;
        const currTransform = ul.style.transform ? +ul.style.transform.match(/(-?[0-9\.]+)/g)[0] : 0;
        let transform;
        if(isGoingDown){
            transform = Math.floor(currTransform / oneLineHeight ) * oneLineHeight;
        }
        else{
            transform = Math.ceil(currTransform / oneLineHeight ) * oneLineHeight;

        }
        ul.style.transform = `translateY(${ transform  }px)`;
        ulBox.addEventListener("touchstart", touchstart, false);
    }
    ulBox.addEventListener("touchstart", touchstart, false);
    ulBox.addEventListener("touchmove", touchmove, false);
    ulBox.addEventListener("touchend", touchend, false);

}

function thirdAndFourthSection(){
    appearSection(section3)
    appearSection(section4)
    touch(section3)
    setScroll(section3);
    setScroll(section4);
}
export default thirdAndFourthSection;