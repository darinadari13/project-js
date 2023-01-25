const upBtn = document.querySelector('.page-up-btn');

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    //  upBtn.style.display = 'flex';
    upBtn.classList.add('shown');
  } else {
    upBtn.classList.remove('shown');
  }
}

upBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });

});
