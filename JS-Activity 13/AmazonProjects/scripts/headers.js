toggleMobileMenu();
openShortMenu();

function toggleMobileMenu() {
    const toggleBtn = document.querySelector('.js-hamburger-menu-toggle');
    const dropdown = document.querySelector('.js-hamburger-menu-dropdown');

    const shortDropDown = document.querySelector('.js-short-menu-dropdown');

    toggleBtn.addEventListener('click', () => {
        dropdown.classList.toggle('open');

        if (shortDropDown.classList.contains('open')) {
            shortDropDown.classList.remove('open');
        }
    });
}

function openShortMenu() {
    const shortBtn = document.querySelector('.js-short-btn');
    const shortDropDown = document.querySelector('.js-short-menu-dropdown');

    const dropdown = document.querySelector('.js-hamburger-menu-dropdown');

    shortBtn.addEventListener('click', () => {
        shortDropDown.classList.toggle('open');

        if (dropdown.classList.contains('open')) {
            dropdown.classList.remove('open');
        }
    });
}
