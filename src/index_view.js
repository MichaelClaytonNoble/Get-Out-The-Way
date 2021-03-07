

export function displayGame(){
  const gameDisplay = document.getElementsByTagName('canvas')[0]; 
  if(gameDisplay.classList.contains('hidden')){
    gameDisplay.classList.remove('hidden');
    console.log("unhide"); 
  }
  else{
    console.log("hide"); 
    gameDisplay.classList.add('hidden'); 
  }
}

export function createWelcome(){
  const welcomeMenu = document.createElement('div'); 
  welcomeMenu.classList.add('welcomeMenu');

  const trident1 = document.createElement('img');
  trident1.src = "https://raw.githubusercontent.com/makonobo/Get-Out-The-Way/main/dist/css/images/trident1.png";
  
  const instructions = document.createElement('div');
  instructions.classList.add('instructions');
  instructions.innerText = "Use the arrow keys to move the ship around the map, \n\nwhen your ship is highlighted blue you may press the spacebar to deploy defensive maneuvers."
  instructions.setAttribute('disabled', true); 
  
  const welcomeButtonWrap = document.createElement('div'); 
  welcomeButtonWrap.classList.add('welcomeButtonWrap');
  
  const startButton = document.createElement('button');
  startButton.classList.add('welcomeButtons'); 
  startButton.id = "play";
  startButton.innerText="Play"; 

  const scoreBoardButton = document.createElement('button');
  scoreBoardButton.classList.add('welcomeButtons');
  scoreBoardButton.innerText="Score Board"; 

  welcomeButtonWrap.append(startButton);
  welcomeButtonWrap.append(scoreBoardButton);

  welcomeMenu.append(trident1); 
  welcomeMenu.append(instructions);
  welcomeMenu.append(welcomeButtonWrap); 

  const layer4=document.getElementById('layer4'); 
  layer4.append(welcomeMenu); 

  const elements = {startButton, scoreBoardButton, welcomeMenu, layer4}
  handleCreateWelcome(elements);
}
function handleCreateWelcome(elements){
  elements.startButton.addEventListener('click', ()=> {
    layer4.removeChild(elements.welcomeMenu);
  })
  elements.scoreBoardButton.addEventListener('click', ()=>{
    displayScoreBoard();
  })
}

function displayScoreBoard(){

}

export function loadJukebox(){
     //load music in the jukebox
     //add music to the ul in the html as a nice link with description 
}
