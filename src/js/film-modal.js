const refs = {
  openFilmModal: document.querySelector('.js-film-modal-open'),
  filmModal: document.querySelector('.film-modal-backdrop'),
  closeModalBtn: document.querySelector('.film-modal-close'),
};
refs.openFilmModal.addEventListener('click', onFilmCardClick);

function onFilmCardClick(e) {
  e.preventDefault();

  refs.filmModal.classList.remove('is-hidden');

  refs.closeModalBtn.addEventListener('click', onCloseModalBtn);
  refs.filmModal.addEventListener('click', onCloseModalBtn);
  document.addEventListener('keydown', onEscKeyBtnPress);
}

function onCloseModalBtn(e) {
  refs.filmModal.classList.add('is-hidden');
  document.removeEventListener('keydown', onEscKeyBtnPress);
  refs.closeModalBtn.removeEventListener('click', onCloseModalBtn);
}

function onEscKeyBtnPress(e) {
  console.log(e.code);
  if (e.code === 'Escape') {
    onCloseModalBtn();
  }
}
