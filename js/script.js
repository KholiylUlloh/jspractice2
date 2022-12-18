window.addEventListener("DOMContentLoaded", () => {
    let tabParent = document.querySelector(".tabheader__items"),
        tabItems = document.querySelectorAll(".tabheader__item"),
        tabContents = document.querySelectorAll(".tabcontent"),
        loader = document.querySelector(".loader"),
        promDescr = document.querySelector(".promotion__descr"),
        returnBtn = document.querySelector(".return_btn")
        
        window.addEventListener("scroll", () => {
            if(document.body.scrollTop > 500 || document.documentElement.scrollTop > 500){
                returnBtn.style.display = "block"
            }else{
                returnBtn.style.display = "none"
            }
        })

        returnBtn.addEventListener("click", () => {
             window.scrollTo({top: 0, behavior: "smooth"})
        })

        //Loader
        setTimeout(() => {
            loader.style.opacity = "0"
            setTimeout(()=>{
                loader.style.opacity = "none"
                loader.style.display = "none"
            },500)
        },1500)

        //hideTabs
    const hideTabContent = () => {
        tabContents.forEach(item => {
            item.classList.remove("show", "fade")
            item.classList.add("hide")
        })
        tabItems.forEach(item => {
            item.classList.remove("tabheader__item_active")
        })
    }
    

    //showTabs
    const showTabContent = (i = 0) => {
        tabContents[i].classList.remove("hide")
        tabContents[i].classList.add("show", "fade")
        tabItems[i].classList.add("tabheader__item_active")
    }

    hideTabContent()
    showTabContent()

    tabParent.addEventListener("click", (e) => {
        let target = e.target
        tabItems.forEach((item, idx) => {
            if(target == item ){
                hideTabContent()
                showTabContent(idx)
            }
        })
    })

    // Timer
    let deadline = "2023-03-15"
    const getRemainingTime = (time) => {
        let timer = Date.parse(time) - Date.parse(new Date())
        let days, hours, minutes, seconds;
            if(timer < 0){
                days = 0
                hours = 0
                minutes = 0
                seconds = 0
                promDescr.children[3].innerHTML = "The promotion deadline has exceeded"
            } else{
                days = Math.floor(timer / (1000 * 60 * 60 * 24))
                hours = Math.floor((timer / (1000 * 60 * 60 * 24)) % 24)
                minutes = Math.floor((timer / 1000 / 60) % 60)
                seconds = Math.floor((timer / 1000) % 60)
            }
        return{
            timer,
            days,
            hours,
            minutes,
            seconds
        }
    }

    const setZero = (num) => {
        if(num >= 0 && num < 10){
            return `0${num}`
        } else{
            return num
        }
    }

    const setClock = (selector, endtime =0 ) => {
        let timer = document.querySelector(selector),
            days = timer.querySelector("#days"),
            hours = timer.querySelector("#hours"),
            minutes = timer.querySelector("#minutes"),
            seconds = timer.querySelector("#seconds")
            let timeInterval = setInterval(updateTime, 1000)
            updateTime()
            function updateTime () {
                const time = getRemainingTime(endtime)

                days.innerHTML = setZero(time.days)
                hours.innerHTML = setZero(time.hours)
                minutes.innerHTML = setZero(time.minutes)
                seconds.innerHTML = setZero(time.seconds)
                if(time.timer < 0){
                    clearInterval(timeInterval)
                }
            }
    }

    setClock(".timer", deadline)

    let modalTrigger = document.querySelector("[data-modal]"),
        modal = document.querySelector(".modal"),
        closeModalBtn = document.querySelector(".modal__close")

        const openModal = () => {
            modal.classList.add("show")
            modal.classList.remove("hide")
            modal.classList.add("modal_animation")
            document.body.style.overflow = "hidden"
            clearInterval(modalTimer)
        }
        modalTrigger.addEventListener("click",  openModal)

        const closeModal = () => {
            modal.classList.add("hide")
            modal.classList.remove("show")
            modal.classList.remove("modal_animation")
            document.body.style.overflow = "scroll"
        }
        closeModalBtn.addEventListener("click", closeModal)

        modal.addEventListener("click", (e) => {
            if(e.target.classList.contains("modal")){
                closeModal()
            }
        })

        document.addEventListener("keydown", (e) => {
            if(e.key == "Escape" && modal.classList.contains("show")){
                closeModal()
            }
        })
        
         const modalTimer = setTimeout(openModal,4000)

         const openModalByScroll = () => {
            if(window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
                openModal()
                window.removeEventListener("scroll", openModalByScroll)
            }
         }

        window.addEventListener("scroll", openModalByScroll)
})
