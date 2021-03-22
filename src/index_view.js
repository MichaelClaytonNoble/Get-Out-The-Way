
let currentIndex = 0; 
let musicList = [];
let currentSong;

const MESSAGES = {
  energy: "Collect red energy cubes",
  slow: "Blue cubes slow aliens",
  alien: "Evade green alien ships",
  shield: "Yellow cubes adds shields",
}
export function displayGame(){
  const gameDisplay = document.getElementsByTagName('canvas')[0]; 
  if(gameDisplay.classList.contains('hidden')){
    gameDisplay.classList.remove('hidden');
  }
  else{
    gameDisplay.classList.add('hidden'); 
  }
}

export function createWelcome(){
  const welcomeMenu = document.createElement('div'); 
  welcomeMenu.classList.add('welcomeMenu');

  const trident1 = document.createElement('img');
  trident1.src = "https://raw.githubusercontent.com/MichaelClaytonNoble/Get-Out-The-Way/main/dist/css/images/trident1.png";
  
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

export function playMusic(src){
  let currentLi = Object.values(document.getElementsByClassName("jukebox-li")).forEach( (li, i)=>{
      if(li.getAttribute('data-value') === src){
        li.classList.add('jukebox-selected');
        currentIndex = i;
      }
      else{
        li.classList.remove('jukebox-selected');
      }
  });

  let volume = .7;
  let path = "https://raw.githubusercontent.com/MichaelClaytonNoble/Get-Out-The-Way/main/dist/css/music/"
  if(src === 'drexciya.mp3') {volume =1};
  let path_src = path+src;

  if(currentSong){currentSong.stop();}
    let music = new Howl({
      src: path_src,
      autoplay: true,
      loop: false,
      preload: true,
      volume: volume,
      onend: ()=>{if(src!=='OpeningTheme.mp3'){return cb()}}
    });
    currentSong = music; 
    function cb(){
      playMusic(musicList[(currentIndex+1)%musicList.length]);
    }

  }
export function loadJukebox(){
     //load music in the jukebox
     musicList = document.getElementsByClassName("jukebox-li"); 
     musicList = Object.values(musicList).map( songNode => { 
       return songNode.getAttribute('data-value');
     }).filter( song => song !== 'pause'); 
     playMusic('OpeningTheme.mp3');
     const jukebox = document.getElementById('jukebox'); 
     jukebox.addEventListener('click', e=>{
       if(e.target.getAttribute('data-value') === 'pause'){
        if(currentSong.playing()){
          e.target.classList.add('jukebox-selected'); 
          currentSong.pause(); 
        }
        else{
          e.target.classList.remove('jukebox-selected'); 
          currentSong.play(); 
        }
      }
      else{
        playMusic(e.target.getAttribute('data-value')); 
      }
     });
}

function flashInstructions(){
  const titleMessage = document.getElementById("title-message")
  const types = ['energy', 'slow', 'shield', 'alien'];
  let i = 0;

  setTimeout( ()=> setInterval(nextMessage, 4000), 7000);

  function nextMessage(){
    titleMessage.textContent = MESSAGES[types[i]];
    i = (1+i)%types.length; 
  }
}
