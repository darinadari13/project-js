const switchModeBtn = document.getElementById("toggle");
const body = document.body;

if(localStorage.getItem("dark-mode") === "true"){
  body.classList.add("dark-mode");
}

switchModeBtn.addEventListener("click", () => {
  console.log('Hello');
   switchModeBtn.classList.toggle('checked');
  body.classList.toggle("dark-mode");
  localStorage.setItem("dark-mode", body.classList.contains("dark-mode"));
});

