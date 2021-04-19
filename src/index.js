import GetOutTheWay from './GetOutTheWay.js'; //handles all logic for the entire game

document.addEventListener("DOMContentLoaded", ()=>{
  const GOTW = new GetOutTheWay();  

  setGAEvents();
});

function setGAEvents(){
  document.getElementById('play').onclick = handleGAEvent('play', 'play', 'Game');
}