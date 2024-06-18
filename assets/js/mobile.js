/* AÇÕES BOTÃO MENU */
function menuShow() {
    let menuMobile = document.querySelector('.menu--mobile');
    if (menuMobile.classList.contains('open')) {
        menuMobile.classList.remove('open');
        document.querySelector('.icon').src = "../img/menu.svg"
    }else {
        menuMobile.classList.add('open')
        document.querySelector('.icon').src = "../img/close.svg"
    }
    let hideButton = document.querySelector('#btn--2');
    hideButton.classList.toggle('hide');
}

/* ACÕES BOTÃO CADASTRAR */
window.addEventListener("scroll", function() {
    let btnScroll = document.querySelector('#btn--2');
    btnScroll.classList.toggle('btn--scroll', window.scrollY > 0);
    }
)

/* Açoões botões scroll, rolagem imagens */

const initSlider = () => {
    const imageList= document.querySelector('[data-slide="list"]');
    const slideButtons = document.querySelectorAll('[data-slide="slide-btn"]');
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

    slideButtons.forEach(button => {
        button.addEventListener("click", () => {
            const direction = button.id === "prev-slide" ? -1 : 1;
            const scrollAmount = imageList.clientWidth * direction;
            imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
        });
    });

    const handleSlideButtons = () => {
        slideButtons[0].style.display = imageList.scrollLeft <= 0? "none" : "block";
        slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "block";
    }

    imageList.addEventListener("scroll", () => {
        handleSlideButtons();
    });
}
window.addEventListener("load", initSlider);
