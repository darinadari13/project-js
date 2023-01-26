import * as basicLightbox from 'basiclightbox';

const markupTeam = `
    <div class="modal-team">

            <div class="team-card">
                <a href="https://github.com/darinadari13" target="_blank" class="team-git">
                    <img class="image_team" src="https://i.ibb.co/3BTGp6S/photo-2023-01-23-17-15-42.jpg"   alt="Dari">
                </a>
                <p class="team-name">Dari</p>
                <p class="team-role">Team Lead</p>
            </div>



            <div class="team-card">
                <a href="https://github.com/Nadin-N" target="_blank" class="team-git">
                     <img class="image_team" src="https://i.ibb.co/zbzM10k/photo-2022-09-28-00-42-22.jpg"   alt="Nadin">
                </a>
                <p class="team-name">Nadin</p>
                <p class="team-role">Scrum Master</p></div>



            <div class="team-card">
                <a href="https://github.com/ChernyshenkoI" target="_blank" class="team-git">
                    <img class="image_team" src="https://i.ibb.co/PhKd08m/photo-2023-01-24-08-30-05.jpg"  alt="Iryna">
                </a>
                <p class="team-name">Iryna</p>
                <p class="team-role">Developer</p></div>


            <div class="team-card">
                <a href="https://github.com/JulkaUlka" target="_blank" class="team-git">
                     <img class="image_team" src="https://i.ibb.co/mG2LQtf/photo-of-me.jpg"   alt="Yuliia">
                </a>
                <p class="team-name">Yuliia</p>
                <p class="team-role">Developer</p></div>



            <div class="team-card">
                <a href="https://github.com/snackli17" target="_blank" class="team-git">
                      <img class="image_team" src="https://i.ibb.co/K62SgmX/image.png"   alt="NATALIA">
                </a>
                <p class="team-name">Natalia</p>
                <p class="team-role">Developer</p></div>



            <div class="team-card">
                <a href="https://github.com/YuliiaGagina" target="_blank" class="team-git">
                     <img class="image_team" src="https://i.ibb.co/WzYmdW4/photo-2023-01-23-17-20-20.jpg"   alt="Yuliia">
                </a>
                <p class="team-name">Yuliia</p>
                <p class="team-role">Developer</p></div>
            <div class="title-team"> <confetti-button></confetti-button>    </div>
        </div>


`;

const linkFooter = document.querySelector('.js-team-modal');
linkFooter.addEventListener('click', openModalTeam);
const modalTeam = basicLightbox.create(markupTeam);

function openModalTeam(e) {
  e.preventDefault();
  modalTeam.show();

  document.body.style.overflow = 'hidden';

  window.addEventListener('keydown', closeModalTeam);

  function closeModalTeam(e) {
    if (e.code === 'Escape') {
      modalTeam.close();
      window.removeEventListener('keydown', closeModalTeam);
      document.body.style.overflow = 'scroll';
    }
  }
}