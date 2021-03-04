import Game from './game'; 
// import key from '../dist/keymaster'; 
import Ship from './ship';

class GameView {
  constructor(ctx){
    this.game = new Game(ctx); 
    this.ctx = ctx; 

    this.bindKeyHandlers = this.bindKeyHandlers.bind(this); 
    this.handleMovements = this.handleMovements.bind(this); 
  }

  static MOVES(){
    return {
      up: [0, -1],
      left: [-1, 0],
      down: [0, 1],
      right: [1, 0]
    }
  }
  static GAME (){

  }
  
  bindKeyHandlers(){
    const ship = this.game.ship;
    Object.keys(GameView.MOVES()).forEach( k=>{
      const move = GameView.MOVES()[k];
      key(k, function(){
        window.keyFlags[k]=true;
      })});
  }
  start(){

    this.handleMovements();
    this.bindKeyHandlers();
    setInterval(this.game.draw, 20);
    setInterval(this.game.moveObjects, 20); 
    setInterval(this.game.moveShip, 5);
    setInterval(this.game.checkCollisions, 20);
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

}

export default GameView; 