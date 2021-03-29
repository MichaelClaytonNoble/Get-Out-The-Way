import * as IndexView from './index_view.js';
import GameView from './game_view.js';


class GetOutTheWay{

  constructor(){
    this.setup();
    this.handleWelcome();
    this.handleWelcome = this.handleWelcome.bind(this); 
  }

  handleWelcome(){
    document.getElementById('title-bar').click();
    GameView.loadAllSoundFX();
    //all event logic set up 
    IndexView.createWelcome(this); 
    IndexView.loadJukebox(); 

    let play = document.getElementById('play');
  }
  
  setupGame(){
    this.gameView = new GameView(); 
    //show canvas
    IndexView.displayGame();
  }
  startGame(){
    this.setupGame();
    //now actually Gameview start here after set up 
    document.getElementById("jukebox").firstElementChild.click();
    this.gameView.start();
    IndexView.flashInstructions();
  }
  gameOver(){

  }
  endGame(){
    
  }

  setup(){
    IndexView.createCanvas();
    window.ctx = GameView.findCtx();
    this.scoreBoard = []; //has a name and value property 
  }
  handleSetup(){

    const toggle = document.getElementById('toggle-music');
    toggle.addEventListener('change', ()=>{

    })

    
  }

}

export default GetOutTheWay; 