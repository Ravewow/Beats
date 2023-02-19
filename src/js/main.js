// hamburger Menu

const hamburgerMenu = document.querySelector(".hamburger__menu");
const closeMenu = document.querySelector(".humburger__header-icon");
const headerHamburger = document.querySelector(".header__humburger-item");
const closeMenuClick = document.querySelector(".menu__item");

headerHamburger.addEventListener("click", () => {
  hamburgerMenu.classList.add("hamburger__visible");
});

closeMenuClick.addEventListener("click", () => {
  hamburgerMenu.classList.remove("hamburger__visible");
});

headerHamburger.addEventListener("click", (e) => {
  e.preventDefault();
});

$(".hamburger__menu-item").on("click", function (e) {
  $(".hamburger__menu").removeClass("hamburger__visible");
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
      $("body").addClass("body__frozen");
      $(".swal-button").click(() => {
        $(".body").removeClass("body__frozen");
        $("#form").trigger("reset");
      });
    });

    requestDelivery.fail(() => {
      swal({
        title: "Отправить письмо не удалось, повторите запрос позже",
        button: "Закрыть",
      });
      $("body").addClass("body__frozen");
      $(".swal-title").addClass("error-modal");
      $(".swal-button").click(() => {
        $(".body").removeClass("body__frozen");
        $("#form").trigger("reset");
      });
    });
  }
});

// product section
const mesureWidth = (item) => {
  let reqItemWith = 0;
  const screenWidth = $(window).width();
  const container = item.closest(".products-menu");
  const titlesBlock = container.find(".products-menu__title");
  const titlesWidth = titlesBlock.width() * titlesBlock.length;
  const textContainer = item.find(".products__menu-textcontent");
  const paddingLeft = parseInt(textContainer.css("padding-left"));
  const paddingRight = parseInt(textContainer.css("padding-right"));
  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  if (isMobile) {
    reqItemWith = screenWidth - titlesWidth;
  } else {
    reqItemWith = 500;
  }

  return {
    container: reqItemWith,
    textContainer: reqItemWith - paddingLeft - paddingRight,
  };
};
const closeEveryItemInContainer = (container) => {
  const items = container.find(".products-menu__item");
  const content = container.find(".products-menu__content");
  items.removeClass("products-menu__item--active");
  content.width(0);
};
const openItemAcco = (item) => {
  const hiddenContent = item.find(".products-menu__content");
  const reqWidth = mesureWidth(item);
  const textBlock = item.find(".products__menu-textcontent");

  item.addClass("products-menu__item--active");
  hiddenContent.width(reqWidth.container);
  textBlock.width(reqWidth.textContainer);
};
$(".products-menu__title").on("click", (e) => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const item = $this.closest(".products-menu__item");
  const itemOpened = item.hasClass("products-menu__item--active");
  const container = $this.closest(".products-menu");

  if (itemOpened) {
    closeEveryItemInContainer(container);
  } else {
    closeEveryItemInContainer(container);
    openItemAcco(item);
  }
});

$(".product-menu__close").on("click", (e) => {
  e.preventDefault();

  closeEveryItemInContainer($(".products-menu"));
});

// player

let player;
const playerContainer = $(".player");

let eventsInit = () => {
  $(".player__start").click((e) => {
    e.preventDefault();

    if (playerContainer.hasClass("paused")) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  });

  $(".player__playback").click((e) => {
    const bar = $(e.currentTarget);
    const clickedPosition = e.originalEvent.layerX;

    const newButtonPositionPercent = (clickedPosition / bar.width()) * 100;
    const newPlaybackPositionSec =
      (player.getDuration() / 100) * newButtonPositionPercent;

    $(".player__playback-button").css({
      left: `${newButtonPositionPercent}%`,
    });

    player.seekTo(newPlaybackPositionSec);
  });

  $(".player__splash").click((e) => {
    player.playVideo();
  });
};

const playVolume = $(".player__volume");
let isMuted = false;

$(".player__volume").click((e) => {
  e.preventDefault();

  if (!isMuted) {
    player.unMute();
    isMuted = true;
  } else {
    player.mute();
    isMuted = false;
  }
});

$(".player__playback-volume").click((e) => {
  const barVolume = $(e.currentTarget);
  const clickedPositionVolume = e.originalEvent.layerX;

  const newButtonPositionPercentVolume =
    (clickedPositionVolume / barVolume.width()) * 100;
  const newPlaybackPositionSecVolume =
    (player.getVolume() / 100) * newButtonPositionPercentVolume;

  $(".player__volume-button").css({
    left: `${newButtonPositionPercentVolume}%`,
  });

  player.setVolume(newButtonPositionPercentVolume);
});

const formatTime = (timeSec) => {
  const roundTime = Math.round(timeSec);

  const minutes = addZero(Math.floor(roundTime / 60));
  const seconds = addZero(roundTime - minutes * 60);

  function addZero(num) {
    return num < 10 ? `0${num}` : num;
  }

  return `${minutes} : ${seconds}`;
};

const onPlayerReady = () => {
  let interval;
  const durationSec = player.getDuration();

  $(".player__duration-estimate").text(formatTime(durationSec));

  if (typeof interval !== "undefined") {
    clearInterval(interval);
  }

  interval = setInterval(() => {
    const completedSec = player.getCurrentTime();
    const completedPercent = (completedSec / durationSec) * 100;

    $(".player__playback-button").css({
      left: `${completedPercent}%`,
    });

    $(".player__duration-completed").text(formatTime(completedSec));
  }, 1000);
};

const onPlayerStateChange = (event) => {
  /*
    -1 (воспроизведение видео не начато)
    0 (воспроизведение видео завершено)
    1 (воспроизведение)
    2 (пауза)
    3 (буферизация)
    5 (видео подают реплики).
  */
  switch (event.data) {
    case 0:
      playerContainer.removeClass("active");
      playerContainer.removeClass("paused");
      break;
    case 1:
      playerContainer.addClass("active");
      playerContainer.addClass("paused");
      break;

    case 2:
      playerContainer.removeClass("active");
      playerContainer.removeClass("paused");
      break;
  }
};

function onYouTubeIframeAPIReady() {
  player = new YT.Player("yt-player", {
    height: "392",
    width: "662",
    videoId: "1_f3RcyYdfA",
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
    playerVars: {
      controls: 0,
      disablekb: 1,
      showinfo: 0,
      rel: 0,
      autoplay: 0,
      modestbranding: 0,
    },
  });
}

eventsInit();

// fixed menu

const sections = $("section");
const display = $(".maincontent");
const sideMenu = $(".fixed-menu");
const menuItems = sideMenu.find(".fixed-menu__item");

const mobileDetect = new MobileDetect(window.navigator.userAgent);
const isMobile = mobileDetect.mobile();

let inScroll = false;

sections.first().addClass("active");

const countSectionPosition = (sectionEq) => {
  const position = sectionEq * -100;

  if (isNaN(position)) {
    console.error("Передано не верное значение в countSectionPosition");
    return 0;
  }
  return position;
};

const changeMenuThemeForSection = (sectionEq) => {
  const currentSection = sections.eq(sectionEq);
  const menuTheme = currentSection.attr("data-sidemenu-theme");
  const activeClass = "fixed-menu--white";

  if (menuTheme === "dark--white") {
    sideMenu.addClass(activeClass);
  } else {
    sideMenu.removeClass(activeClass);
  }
};

const resetActiveClassForItem = (items, itemEq, activeClass) => {
  items.eq(itemEq).addClass(activeClass).siblings().removeClass(activeClass);
};

const performTransition = (sectionEq) => {
  if (inScroll) return;

  const transitionOver = 1000;
  const mouseInertiaOver = 300;

  inScroll = true;
  const position = countSectionPosition(sectionEq);

  changeMenuThemeForSection(sectionEq);

  display.css({
    transform: `translateY(${position}%)`,
  });
  resetActiveClassForItem(sections, sectionEq, "active");
  sections.eq(sectionEq).addClass("active").siblings().removeClass("active");

  setTimeout(() => {
    inScroll = false;
    resetActiveClassForItem(menuItems, sectionEq, "fixed-menu__item--active");
  }, transitionOver + mouseInertiaOver);
};

const viewporScroller = () => {
  const activeSection = sections.filter(".active");
  const nextSection = activeSection.next();
  const prevSection = activeSection.prev();

  return {
    next() {
      if (nextSection.length) {
        performTransition(nextSection.index());
      }
    },
    prev() {
      if (prevSection.length) {
        performTransition(prevSection.index());
      }
    },
  };
};

$(window).on("wheel", (e) => {
  const deltaY = e.originalEvent.deltaY;
  const scroller = viewporScroller();
  if (deltaY > 0) {
    scroller.next();
  }

  if (deltaY < 0) {
    scroller.prev();
  }
});

$(window).on("keydown", (e) => {
  const tagName = e.target.tagName.toLowerCase();
  const userTypingInInputs = tagName === "input" || tagName === "textarea";
  const scroller = viewporScroller();
  if (userTypingInInputs) return;

  switch (e.keyCode) {
    case 38:
      scroller("prev");
      break;

    case 40:
      scroller("next");
      break;
  }
});

$(".wrapper").on("touchemove", (e) => e.preventDefault());

$("[data-scroll-to]").click((e) => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const target = $this.attr("data-scroll-to");
  const reqSection = $(`[data-section-id=${target}]`);

  performTransition(reqSection.index());
});

// touch swipe

if (isMobile) {
  // https://github.com/mattbryson/TouchSwipe-Jquery-Plugin

  $("body").swipe({
    swipe: function (event, direction) {
      const scroller = viewporScroller();
      let scrollDirection = "";

      if (direction === "up") scrollDirection = "next";
      if (direction === "down") scrollDirection = "prev";

      scroller[scrollDirection]();
    },
  });
}
