/* AÇÕES BOTÃO MENU */
function menuShow() {
    let menuMobile = document.querySelector('.menu--mobile');
    if (menuMobile.classList.contains('open')) {
        menuMobile.classList.remove('open');
        document.querySelector('.icon').src = "./assets/img/menu.svg"
    }else {
        menuMobile.classList.add('open')
        document.querySelector('.icon').src = "./assets/img/close.svg"
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