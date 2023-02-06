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
// --form

const validateFields = (form, fieldArray) => {
  fieldArray.forEach((field) => {
    field.removeClass("input-error");
    if (field.val().trim() === "") {
      field.addClass("input-error");
    }
  });

  const errorFields = form.find(".input-error");
  return errorFields.length === 0;
};

$(".form").submit((e) => {
  e.preventDefault();
  const form = $(e.currentTarget);
  const name = form.find("[name='name']");
  const phone = form.find("[name='phone']");
  const comment = form.find("[name='comment']");
  const to = form.find("[name='to']");

  $(".swal-title").removeClass("error-modal");

  const isValid = validateFields(form, [name, phone, comment, to]);

  if (isValid) {
    const requestDelivery = $.ajax({
      url: "https://webdev-api.loftschool.com/sendmail",
      method: "post",
      data: {
        name: name.val(),
        phone: phone.val(),
        comment: comment.val(),
        to: to.val(),
      },
    });

    requestDelivery.done((data) => {
      swal({
        title: data.message,
        button: "Закрыть",
      });
      $(".swal-button").click((e) => {
        $("#form").trigger("reset");
      });
    });

    requestDelivery.fail((data) => {
      swal({
        title: "Отправить письмо не удалось, повторите запрос позже",
        button: "Закрыть",
      });
      $(".swal-title").addClass("error-modal");
      $(".swal-button").click((e) => {
        $("#form").trigger("reset");
      });
    });
  }
});
