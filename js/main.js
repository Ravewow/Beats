// hamburger Menu

const hamburgerMenu = document.querySelector(".hamburger__menu");
const closeMenu = document.querySelector(".humburger__header-icon");
const headerHamburger = document.querySelector(".header__humburger-item");

headerHamburger.addEventListener("click", (e) => {
  hamburgerMenu.classList.add("hamburger__visible");
});

closeMenu.addEventListener("click", (e) => {
  hamburgerMenu.classList.remove("hamburger__visible");
});

headerHamburger.addEventListener("click", (e) => {
  e.preventDefault();
});

// slider

const slider = $(".slider__list").bxSlider({
  pager: false,
  controls: false,
});

$(".slider__arrow--right").click((e) => {
  slider.goToNextSlide();
});

$(".slider__arrow--left").click((e) => {
  slider.goToPrevSlide();
});

// team Animation
const openItem = (item) => {
  const container = item.closest(".team__item");
  const contentBlock = container.find(".portfolio__description");
  const textBlock = contentBlock.find(".portfolio__description-block");
  const reqHeight = textBlock.height();

  container.addClass("active");
  contentBlock.height(reqHeight);
};

const closeEveryItem = (container) => {
  const items = container.find(".portfolio__description");
  const itemContainer = container.find(".team__item");

  itemContainer.removeClass("active");
  items.height(0);
};

$(".portfolio__name").click((e) => {
  const $this = $(e.currentTarget);
  const container = $this.closest(".team__list");
  const elemContainer = $this.closest(".team__item");
  const triangle = $this.next(".portfolio__name-triangle");

  triangle.toggleClass("portfolio__name-triangle--rotate");
  if (elemContainer.hasClass("active")) {
    closeEveryItem(container);
  } else {
    closeEveryItem(container);
    openItem($this);
  }
});

// review Animation

const findBlockByAlias = (alias) => {
  return $(".reviews__display-inner").filter((ndx, item) => {
    return $(item).attr("data-linked-with") === alias;
  });
};
$(".interactive-avatar__link").click((e) => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const target = $this.attr("data-open");
  const itemToShow = findBlockByAlias(target);
  const curItem = $this.closest(".reviews__switcher-item");
  itemToShow
    .addClass("reviews__display-inner--active")
    .siblings()
    .removeClass("reviews__display-inner--active");
  curItem
    .addClass("interactive-avatar--active")
    .siblings()
    .removeClass("interactive-avatar--active");
});

// form section
// --modal

const openButton = document.querySelector("#openOverlay");
const successModal = createModal("Cообщение отправлено");
const body = document.body;

openButton.addEventListener("click", (e) => {
  e.preventDefault();
  body.appendChild(successModal);
});

function createModal(content) {
  const overlayElement = document.createElement("div");
  overlayElement.classList.add("overlay");

  const template = document.querySelector("#overlayTemplate");

  overlayElement.innerHTML = template.innerHTML;
  overlayElement.addEventListener("click", (e) => {
    if (e.target === overlayElement) {
      closeElement.click();
    }
  });

  const contentElement = overlayElement.querySelector(".content");
  contentElement.innerHTML = content;

  const closeElement = document.createElement("button");
  closeElement.classList.add("button", "modal--button");
  closeElement.textContent = "Закрыть";

  contentElement.appendChild(closeElement);

  closeElement.addEventListener("click", (e) => {
    e.preventDefault();
    body.removeChild(overlayElement);
  });


  return overlayElement;
}
