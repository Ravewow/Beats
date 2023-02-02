$(document).ready(() => {
  $(".portfolio__name-wrapper").on("click", (e) => {
    let elem = $(e.currentTarget).next();

    elem.slideToggle();
  });

  $(".portfolio__name").on("click", function (e) {
    let elem = $(e.currentTarget).next();
    elem.toggleClass("portfolio__name-triangle--rotate");
  });
 
});
