function menuShow() {
    let menuMobile = document.querySelector('.menu--mobile');
    if (menuMobile.classList.contains('open')) {
        menuMobile.classList.remove('open');
        document.querySelector('.icon').src = "./assets/img/menu.svg"
    }else {
        menuMobile.classList.add('open')
        document.querySelector('.icon').src = "./assets/img/close.svg"
    }
    let hideButton = document.querySelector('.btn--2');
    if (hideButton.classList.contains('hide')) {
        hideButton.classList.remove('hide');
    }else {
        hideButton.classList.add('hide');
    }
}