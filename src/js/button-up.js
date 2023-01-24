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
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
});
