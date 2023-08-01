document.querySelector('.menu_bar').addEventListener('click', function () {
    if (document.querySelector('.menu_bar').getAttribute('class').includes('menu_close')) {
        document.querySelector('.menu').style.left = '100%';
    }
    else {
        document.querySelector('.menu').style.left = '0%';
    }
    document.querySelector('.menu_bar').classList.toggle('menu_close');
});