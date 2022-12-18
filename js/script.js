window.addEventListener("DOMContentLoaded", () => {
    let tabParent = document.querySelector(".tabheader__items"),
        tabItems = document.querySelectorAll(".tabheader__item"),
        tabContents = document.querySelectorAll(".tabcontent"),
        loader = document.querySelector(".loader")

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
})