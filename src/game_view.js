import Game from './game'; 
// import key from '../dist/keymaster'; 
import Ship from './ship';
import {Howl, Howler} from 'howler'; 

const MUSIC_LIST = ['../dist/css/music/space_invaders_5.mp3','../dist/css/music/drexciya.mp3']
const MUSIC_LIST_gh_pages = ['https://raw.githubusercontent.com/makonobo/Get-Out-The-Way/main/dist/css/music/space_invaders_5.mp3','https://raw.githubusercontent.com/makonobo/Get-Out-The-Way/main/dist/css/music/drexciya.mp3']
const SOUND_FXS = ['../dist/css/slow.wav']

class GameView {
  constructor(ctx){
    this.game = new Game(ctx); 
    this.ctx = ctx; 

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
    GameView.loadSoundFX('../dist/css/slow.wav', 'slow')
  }
  start(){
    console.log("HELLO WORLD");
    this.loadAllSoundFX(); 
    this.handleMovements();
    this.bindKeyHandlers();
    GameView.loadMusic(); 
    GameView.playMusic(); 
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
    static loadMusic(src){
      const music = document.createElement("audio"); 
      music.src = src; 
      music.id = 'music'; 
      const body = document.getElementsByTagName("body")[0];
      music.setAttribute("preload", "auto");
      music.setAttribute("controls", "none");
      music.style.display = "none";
      body.append(music);
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
  static playMusic(){
    let music = new Howl({
      src: [MUSIC_LIST_gh_pages[1]],
      autoplay: true,
      loop: false,
      preload: true,
      volume: .8,
      onend: ()=>{},
      rate: 3
    }) 
  }
  // static playMusic(){
  //   const audio = document.getElementById('music');
  //   audio.play(); 
  //   // audio.then(play); 
  // }
  
  handleEvents(){
    const toggleAudio = document.getElementById("pause-music");
    const audio = document.getElementById('music');
    toggleAudio.addEventListener("change", ()=>{
      if(audio.paused || audio.ended){
        audio.play(); 
        // audio.then(play); 
      }
      else{
        audio.pause(); 
      }
    })
  }
}

export default GameView; 