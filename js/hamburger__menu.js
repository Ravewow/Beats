const hamburgerMenu = document.querySelector(".hamburger__menu");
const closeMenu = document.querySelector(".humburger__header-icon");
const headerHamburger = document.querySelector(".header__humburger-item");

headerHamburger.addEventListener("click", e => {
  hamburgerMenu.classList.add("hamburger__visible")
})

closeMenu.addEventListener("click", e => {
  hamburgerMenu.classList.remove("hamburger__visible")
})