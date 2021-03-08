import Game from './game'; 
// import key from '../dist/keymaster'; 
import Ship from './ship';
import {Howl, Howler} from 'howler'; 

const MUSIC_LIST = ['../dist/css/music/space_invaders_5.mp3','../dist/css/music/drexciya.mp3']
const MUSIC_LIST_gh_pages = ['https://raw.githubusercontent.com/makonobo/Get-Out-The-Way/main/dist/css/music/space_invaders_5.mp3','https://raw.githubusercontent.com/makonobo/Get-Out-The-Way/main/dist/css/music/drexciya.mp3']
const PLAYING =[];
// const SOUND_FXS = ['../dist/css/slow.wav']

class GameView {
  constructor(){
    this.game = new Game(GameView.findCtx()); 
    this.ctx = GameView.findCtx(); 

    this.bindKeyHandlers = this.bindKeyHandlers.bind(this); 
    this.handleMovements = this.handleMovements.bind(this); 
    this.handleEvents = this.handleEvents.bind(this); 
  }

  static MOVES(){
    return {
      up: [0, -1],
      left: [-1, 0],
      down: [0, 1],
      right: [1, 0]
    }
  }
 
  bindKeyHandlers(){
    const ship = this.game.ship;
    Object.keys(GameView.MOVES()).forEach( k=>{
      const move = GameView.MOVES()[k];
      key(k, function(){
        window.keyFlags[k]=true;
      })});
  }

  loadAllSoundFX(){
    GameView.loadSoundFX('https://raw.githubusercontent.com/makonobo/Get-Out-The-Way/main/dist/css/soundFX/slow.wav', 'slow');
    GameView.loadSoundFX('https://raw.githubusercontent.com/makonobo/Get-Out-The-Way/main/dist/css/soundFX/shield.wav', 'shield');
    GameView.loadSoundFX('https://raw.githubusercontent.com/makonobo/Get-Out-The-Way/main/dist/css/soundFX/energy.wav', 'energy');
    GameView.loadSoundFX('https://raw.githubusercontent.com/makonobo/Get-Out-The-Way/main/dist/css/soundFX/alien.wav', 'alien');
  }
  start(){
    this.loadAllSoundFX(); 
    this.handleMovements();
    this.bindKeyHandlers();
    this.handleEvents(); 
    setInterval(this.game.draw, 20);
    setInterval(this.game.moveObjects, 20); 
    setInterval(this.game.moveShip, 7);
    setInterval(this.game.checkCollisions, 20);
    setInterval(this.game.addShieldBox, 23100);
    setInterval(this.game.addShieldBox, 61300);
    setInterval(this.game.addSlowBox, 17000);
    setInterval(this.game.reducePoints, 400);
  }
  static changeTheme(color){
    
  }
  static gameAlerts(type,data){
    let sideMenuList = document.getElementById("side-menu-list"); 

    switch(type){
      case 'low shield':
        let shieldli = document.createElement('li'); 
        shieldli.innerText = "Low on shields!";
        shieldli.id ="side-menu-li";
        shieldli.style.color = "yellow";
        sideMenuList.append(shieldli); 
        setTimeout(()=>sideMenuList.removeChild(shieldli), 6000);
        break;
      case 'add point': 
        let pointli = document.createElement('li'); 
        pointli.innerText = "+" + data.points;
        pointli.id ="side-menu-li";
        pointli.style.color = "red";
        sideMenuList.append(pointli); 
        setTimeout(()=>sideMenuList.removeChild(pointli), 1000);
        break;
      case 'add shield': 
        let addShieldli = document.createElement('li'); 
        addShieldli.innerText = "+" + 1;
        addShieldli.id ="side-menu-li";
        addShieldli.style.color = "yellow";
        sideMenuList.append(addShieldli); 
        setTimeout(()=>sideMenuList.removeChild(addShieldli), 1000);
        break;
      case 'remove shield': 
        let removeShieldli = document.createElement('li'); 
        removeShieldli.innerText = "-" + 1;
        removeShieldli.id ="side-menu-li";
        removeShieldli.style.color = "yellow";
        sideMenuList.append(removeShieldli); 
        setTimeout(()=>sideMenuList.removeChild(removeShieldli), 1000);
        break;
      case 'game over':
        break; 
      default: break;
    }
  }

  handleMovements(){
    window.keyFlags = { left: false, up: false, right: false, down: false}; 

    window.addEventListener("keyup", (e)=>{       
      if(e.keyCode == 37){window.keyFlags.left=false;}
      if(e.keyCode == 38){window.keyFlags.up=false;}
      if(e.keyCode == 39){window.keyFlags.right=false;}
      if(e.keyCode == 40){window.keyFlags.down=false;}
    })
  }

  static updateStats( stat, value){ 
    const shieldView = document.getElementById("stats-shields-number");
    const totalScoreView = document.getElementById("stats-score-number"); 
    const points = document.getElementById("stats-points");

    switch( stat ){
      case 'shields': 
        shieldView.textContent = value;
        break;
      case 'total':
        totalScoreView.textContent = value;
        break; 
      case 'points': 
        points.textContent = value;
        break; 

      default: break; 
    }
  }


  static loadSoundFX(src, id){
    const sFX = document.createElement("audio"); 
    sFX.id = id; 
    sFX.src = src; 
    const body = document.getElementsByTagName("body")[0];
    sFX.setAttribute("preload", "auto");
    sFX.setAttribute("controls", "none");
    sFX.style.display = "none";
    body.append(sFX);
  }
  static playSoundFX(id, duration=2000){
    const sFX = document.getElementById(id);
    setTimeout(()=>{
      sFX.play(); 
      setTimeout(()=>GameView.stopSoundFX(id, duration), duration);
    }, 100);
  }
  static stopSoundFX(id, duration){
    const sFX = document.getElementById(id);
    sFX.pause();
    sFX.currentTime =0; 
  }
  
  handleEvents(){

  }

  static findCtx(){
    return document.getElementsByTagName("canvas")[0].getContext('2d'); 
  }
}

export default GameView; 