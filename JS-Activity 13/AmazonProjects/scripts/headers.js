toggleMobileMenu();
openShortMenu();

function toggleMobileMenu() {
    const toggleBtn = document.querySelector('.js-hamburger-menu-toggle');
    const dropdown = document.querySelector('.js-hamburger-menu-dropdown');

    toggleBtn.addEventListener('click', () => {
        dropdown.classList.toggle('open');
    });
}

function openShortMenu() {
    const shortBtn = document.querySelector('.js-short-btn');
    const shortDropDown = document.querySelector('.js-short-menu-dropdown');

    shortBtn.addEventListener('click', () => {
        shortDropDown.classList.toggle('open');
    });
}
