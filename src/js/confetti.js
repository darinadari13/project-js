class ConfettiButton extends HTMLElement {
  constructor() {
    super();
    let button = document.createElement('button');
    button.classList.add('confetti-button');
    button.innerHTML = `
      <span class="bavovna_emo">&#128163;</span>
      <span class="bavovna_title">BAVOVNA</span>
    `;
    button.addEventListener('click', () => {
      confetti({ particleCount: 150, spread: 800 });
    });
    this.append(button);
  }
}


customElements.define('confetti-button', ConfettiButton);





