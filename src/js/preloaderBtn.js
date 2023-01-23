document.querySelector('button').addEventListener('click', (e) => {
  document.body.classList.remove('loaded');
  window.setTimeout(() => {
    document.body.classList.add('loaded');
    document.body.classList.remove('loaded_hiding');
  }, 2000);
});

