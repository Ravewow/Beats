const reviews = document.querySelectorAll(.reviews__display-inner);
const previews = document.querySelectorAll(.interactive-avatar);

const removeActiveStatus = ()=> {
  previews.forEach(previews, ndx)=> {
    previews.classList.remove('interactive-avatar--active');
    reviews[ndx].classList.remove('reviews__display-inner--active')
  }
}

previews.forEach((previews, ndx))=> {
  previews.addEventListener('click', () => {
    removeActiveStatus();

    previews.classList.add('interactive-avatar--active');
    reviews[ndx].classList.add('reviews__display-inner--active')
  })
}