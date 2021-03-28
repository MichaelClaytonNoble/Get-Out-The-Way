import Game from './game.js'; 
// import key from '../dist/keymaster'; 
import Ship from './ship.js';
import {Howl, Howler} from 'howler'; 

const MUSIC_LIST = ['../dist/css/music/space_invaders_5.mp3','../dist/css/music/drexciya.mp3']
const MUSIC_LIST_gh_pages = ['https://raw.githubusercontent.com/MichaelClaytonNoble/Get-Out-The-Way/main/dist/css/music/space_invaders_5.mp3','https://raw.githubusercontent.com/MichaelClaytonNoble/Get-Out-The-Way/main/dist/css/music/drexciya.mp3']
const PLAYING =[];

class GameView {
  constructor(){
    this.game = new Game(); 
    window.ctx = GameView.findCtx();
    this.bindKeyHandlers = this.bindKeyHandlers.bind(this); 
    this.handleMovements = this.handleMovements.bind(this); 
    this.createEventsTimers = this.createEventsTimers.bind(this); 
    this.step = this.step.bind(this);
  }



  start(){
    this.handleMovements();
    this.bindKeyHandlers();
    this.createEventsTimers();

    // //start animation 
    requestAnimationFrame(this.animate.bind(this));
  }
  
  //animation 
  animate(time){
    const timeDelta = time - this.lastTime;
    this.step(timeDelta);
    this.game.draw();
    
    if(time-this.reducePointsTime >= 400){
      this.game.reducePoints();
      this.reducePointsTime = time;
    }
    if(time-this.addShieldBoxTime1 >= 23100){
      this.game.addShieldBox();
      this.addShieldBoxTime1 = time;
    }
    if(time-this.addShieldBoxTime2 >= 61300){
      this.game.addShieldBox();
      this.addShieldBoxTime2 = time;
    }
    if(time-this.addSlowBoxTime >= 17000){
      this.game.addSlowBox(); 
      this.addSlowBoxTime = time;
    }
    
    this.lastTime = time;
    requestAnimationFrame(this.animate.bind(this));
  }
  createEventsTimers(){
    this.lastTime = 0; 
    this.addShieldBoxTime1=0;
    this.addShieldBoxTime2=0;
    this.addSlowBoxTime = 0;
    this.reducePointsTime =0;
  }
  
  //handle events 
  step(delta){
    this.game.moveObjects(delta);
    this.game.checkCollisions();
  }
  

  //game alerts and status changes 
  static changeTheme(color, subject='--theme'){
    let root = document.documentElement;
    root.style.setProperty(subject, color);
  }
  static gameAlerts(type,data){
    let sideMenuList = document.getElementById("side-menu-list"); 

    switch(type){
      case 'low shield':
        let shieldli = document.createElement('li'); 
        shieldli.innerText = "Low on shields!";
        shieldli.id ="side-menu-li";
        shieldli.style.color = "yellow";
        shieldli.style.backgroundColor = "rgba(255, 255, 0, 0.25)";
        sideMenuList.append(shieldli); 
        setTimeout(()=>sideMenuList.removeChild(shieldli), 6000);
        break;
      case 'add point': 
        let pointli = document.createElement('li'); 
        pointli.innerText = "+" + data.points;
        pointli.id ="side-menu-li";
        pointli.style.color = "red";
        pointli.style.backgroundColor = "rgba(255, 0, 0, 0.25)";
        sideMenuList.append(pointli); 
        setTimeout(()=>sideMenuList.removeChild(pointli), 1000);
        break;
      case 'add shield': 
        let addShieldli = document.createElement('li'); 
        addShieldli.innerText = "+" + 1;
        addShieldli.id ="side-menu-li";
        addShieldli.style.color = "yellow";
        addShieldli.style.backgroundColor = "rgba(255, 255, 0, 0.25)";
        sideMenuList.append(addShieldli); 
        setTimeout(()=>sideMenuList.removeChild(addShieldli), 1000);
        break;
      case 'remove shield': 
        let removeShieldli = document.createElement('li'); 
        removeShieldli.innerText = "-" + 1;
        removeShieldli.id ="side-menu-li";
        removeShieldli.style.color = "yellow";
        removeShieldli.style.backgroundColor = "rgba(255, 255, 0, 0.25)";
        sideMenuList.append(removeShieldli); 
        setTimeout(()=>sideMenuList.removeChild(removeShieldli), 1000);
        break;
      case 'game over':
        break; 
      default: break;
    }
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
  //handle movements 
  static MOVES(){
    return {
      up: [0, -1.5],
      left: [-1.5, 0],
      down: [0, 1.5],
      right: [1.5, 0]
    }
    // return {
    //   up: [0, -1.5/(Game.prototype.areaRatio-Game.prototype.areaRatio*.2)],
    //   left: [-1.5/(Game.prototype.areaRatio-Game.prototype.areaRatio*.2), 0],
    //   down: [0, 1.5/(Game.prototype.areaRatio-Game.prototype.areaRatio*.2)],
    //   right: [1.5/(Game.prototype.areaRatio-Game.prototype.areaRatio*.2), 0]
    // }
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
  bindKeyHandlers(){
    const ship = this.game.ship;
    Object.keys(GameView.MOVES()).forEach( k=>{
      const move = GameView.MOVES()[k];
      key(k, function(){
        window.keyFlags[k]=true;
      })});
  }


  //load and play audio sound FX
  static loadAllSoundFX(){
    GameView.loadSoundFX('https://raw.githubusercontent.com/MichaelClaytonNoble/Get-Out-The-Way/main/dist/css/soundFX/slow.wav', 'slow');
    GameView.loadSoundFX('https://raw.githubusercontent.com/MichaelClaytonNoble/Get-Out-The-Way/main/dist/css/soundFX/shield.wav', 'shield');
    GameView.loadSoundFX('https://raw.githubusercontent.com/MichaelClaytonNoble/Get-Out-The-Way/main/dist/css/soundFX/energy.wav', 'energy');
    GameView.loadSoundFX('https://raw.githubusercontent.com/MichaelClaytonNoble/Get-Out-The-Way/main/dist/css/soundFX/alien.wav', 'alien');
    GameView.loadSoundFX('https://raw.githubusercontent.com/MichaelClaytonNoble/Get-Out-The-Way/main/dist/css/soundFX/typewriter.wav', 'typewriter');
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


  //get canvas context
  static findCtx(){
    return document.getElementById("game-canvas").getContext('2d'); 
  }
}

export default GameView; 