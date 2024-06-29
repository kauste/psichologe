class AppendSlots{
    constructor(registrationSwiper, createActivator){
       this.registrationSwiper = registrationSwiper.swiper;
       this.createActivator = createActivator;
       this.slotsBoxDOM;
       this.buttonsDOMS;
       this.activeButtonDOM;
       this.slots;
       this.setDOMS();
       this.activate();
    }
    setDOMS(){
        const slotsJson = document.querySelector('.availibe--slots').value;
        this.slots = JSON.parse(slotsJson);
        this.slotsBoxDOM = document.querySelector('.slots--box');
        this.buttonsDOMS = document.querySelectorAll('.--callendar .availible--day');
        this.activeButtonDOM = Array.from(this.buttonsDOMS).filter(btnDOM => btnDOM.classList.contains('--active'))[0]

    }
    activate(){
        this.listenToRadio()
        this.buttonsDOMS.forEach(btnDOM => {
            btnDOM.addEventListener('click', this.getDaySlots)
        })
    }
    getDaySlots = (e) =>{
        if(e.target === this.activeButtonDOM ) return;
        const date = e.target.dataset.date;
        for (const [key, value] of Object.entries(this.slots)) {
            if(key === date){
                this.apendSlots(key, value);
                this.changeDayButton(e.target);
                if(this.registrationSwiper.activeIndex !== 0) this.registrationSwiper.slideTo(0)
                this.listenToRadio()
                break;
            }
        }
    }
    apendSlots(date, daySlots){
        let innerHTML = `<div class="card-header">
                                <div>${date}</div>
                          </div>
                          <div class="slots radio--box">`
        daySlots.forEach(appointment => {
            innerHTML += `<div>
                            <input type="radio" id="time-${appointment.start}-${appointment.end}" data-name="event_id" value="${appointment.event_id}">
                            <label for="time-${appointment.start}-${appointment.end}">${appointment.start} - ${appointment.end}</label>
                        </div>`
        });

        innerHTML += '</div>'
        this.slotsBoxDOM.innerHTML = innerHTML;
        this.createActivator.setVariables();

    }
    changeDayButton(activeBtn){
        this.activeButtonDOM.classList.remove('--active')
        activeBtn.classList.add('--active');
        this.activeButtonDOM = activeBtn;
    }
    listenToRadio(){
        this.registrationSwiper.disable()
        const radioInputs = this.slotsBoxDOM.querySelectorAll('input[type="radio"]');
        radioInputs.forEach(radio =>  radio.addEventListener('click', () =>  this.registrationSwiper.enable(), {once:true}))
    }


}
export default AppendSlots;