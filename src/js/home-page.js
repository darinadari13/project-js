const switchModeBtn = document.getElementById("toggle");
const body = document.body;
const darkMode = JSON.parse(localStorage.getItem('dark-mode'));


if (darkMode) {
   switchModeBtn.classList.add('checked');
}
else { 
  switchModeBtn.classList.remove('checked');
}

if (localStorage.getItem("dark-mode") === "true") {
  body.classList.add("dark-mode");
}

switchModeBtn.addEventListener("click", () => {  
  switchModeBtn.classList.toggle('checked');
  body.classList.toggle("dark-mode");
  localStorage.setItem("dark-mode", body.classList.contains("dark-mode"));
});

