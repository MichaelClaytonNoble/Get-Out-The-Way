import * as IndexView from './index_view.js';
import GameView from './game_view.js';
import * as Scoreboard from './scoreboard.js'; 


class GetOutTheWay{

  constructor(){
    
    this.setup.bind(this)();
    this.handleWelcome.bind(this)();
  }

  handleWelcome(){
    document.getElementById('title-bar').click();
    GameView.loadAllSoundFX();
    //all event logic set up 
    IndexView.createWelcome(this); 
    IndexView.loadJukebox(); 

  }
  get self(){
    return this;
  }
  setupGame(){
    IndexView.resetPoints();
    if(!this.gameView){
      this.gameView = new GameView();
    }
    else{
      this.gameView.newGame();
    }
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
    IndexView.gameOver(this);
  }
  setup(){
    Scoreboard.init();
    IndexView.createCanvas();
    window.ctx = GameView.findCtx();
    this.scoreBoard = []; //has a name and value property 
    this.score;
    this.handleSetup.bind(this)();
  }
  handleSetup(){
    window.addEventListener('gameOver', ()=>{
      IndexView.clearGameAlerts();
      this.score = window.score;
      this.gameOver.bind(this)();
    })
  }

}

export default GetOutTheWay; 