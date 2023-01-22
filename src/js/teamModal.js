//import '../node_modules/basiclightbox/dist/basicLightbox.min.css';
import * as basicLightbox from 'basiclightbox';
import sprite from '../../images/icons.svg';




const markupTeam = `
		<div class="modal-team">
    
            <div class="team-card">
                <a href="https://github.com/darinadari13" target="_blank" class="team-git">
                    <svg class="icon-github" width="50" height="50">
                        <use href="${sprite}#icon-github"></use>
                    </svg>
                </a>
                <p class="team-name">Dari</p>
                <p class="team-role">Team Lead</p>
            </div>



            <div class="team-card">
                <a href="https://github.com/Nadin-N" target="_blank" class="team-git">
                    <svg class="icon-github" width="50" height="50">
                        <use href="${sprite}#icon-github"></use>
                    </svg>
                </a>
                <p class="team-name">Nadin</p>
                <p class="team-role">Scrum Master</p></div>



            <div class="team-card">
                <a href="https://github.com/ChernyshenkoI" target="_blank" class="team-git">
                    <svg class="icon-github" width="50" height="50">
                         <use href="${sprite}#icon-github"></use>
                    </svg>
                </a>
                <p class="team-name">Iryna</p>
                <p class="team-role">Developer</p></div>


            <div class="team-card">
                <a href="https://github.com/JulkaUlka" target="_blank" class="team-git">
                    <svg class="icon-github" width="50" height="50">
                         <use href="${sprite}#icon-github"></use>
                    </svg>
                </a>
                <p class="team-name">Yuliia</p>
                <p class="team-role">Developer</p></div>



            <div class="team-card">
                <a href="https://github.com/snackli17" target="_blank" class="team-git">
                    <svg class="icon-github" width="50" height="50">
                        <use href="${sprite}#icon-github"></use>
                    </svg>
                </a>
                <p class="team-name">NATALIA</p>
                <p class="team-role">Developer</p></div>



            <div class="team-card">
                <a href="https://github.com/YuliiaGagina" target="_blank" class="team-git">
                    <svg class="icon-github" width="50" height="50">
                      <use href="${sprite}#icon-github"></use>
                    </svg>
                </a>
                <p class="team-name">Yuliia</p>
                <p class="team-role">Developer</p></div>
            <p class="title-team"> &#128153;  &#128155;    BAVOVNA    <confetti-button></confetti-button>     &#128105;&#8205;&#128187;</p>
        </div>      
      
`;
const linkFooter = document.querySelector('.js-team-modal');
linkFooter.addEventListener('click', openModalTeam);
const modalTeam = basicLightbox.create(markupTeam);
function openModalTeam(e) {
  e.preventDefault();
  modalTeam.show();

  window.addEventListener('keydown', closeModalTeam);

  function closeModalTeam(e) {
    if (e.code === 'Escape') {
      modalTeam.close();
      window.removeEventListener('keydown', closeModalTeam);
    }
  }
}
