

export  function startSpin(){
    document.body.classList.remove('loaded');
}


export function stopSpin (){
  document.body.classList.add('loaded');
  document.body.classList.remove('loaded_hiding');
}