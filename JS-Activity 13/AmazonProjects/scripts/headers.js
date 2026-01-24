const toggleBtn = document.querySelector('.js-hamburger-menu-toggle');
const dropdown = document.querySelector('.js-hamburger-menu-dropdown');

toggleBtn.addEventListener('click', () => {
    dropdown.classList.toggle('open');
});