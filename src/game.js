
import Alien from './alien'; 
import Ship from './ship'; 

const DIM_X = 600;
const DIM_Y = 450;

class Game {
  constructor(ctx){
    this.DIM_X = DIM_X;
    this.DIM_Y = DIM_Y;
    this.NUM_ALIENS = 6;
    this.aliens = []; 
    this.ctx=ctx;
    this.draw = this.draw.bind(this);
    this.moveObjects = this.moveObjects.bind(this); 
    this.addAlien = this.addAlien.bind(this); 
    this.checkCollisions = this.checkCollisions.bind(this);
    this.moveShip = this.moveShip.bind(this);
    this.addAlien();
    this.addAlien();
    this.addAlien();
    this.addAlien();
    this.addAlien();
    // this.ships = new Array(4).fill(Game.createShip());
    this.ships = [Game.createShip()];
    this.ship = this.ships[0];
    this.shields = 5; 
  }
  addAlien(){
    const ast= new Alien({pos: Game.randomPosition()});
    this.aliens.push(ast); 
  }
  static createShip(){
    return new Ship({pos: [300,300]}); 
  }
  addShip(){
    this.ships.push(Game.createShip());
  }
  
  allObjects(){
    return [].concat(this.aliens);
  }

  newLife(){
    this.ships.push(Game.createShip());
  }
  get dim_x(){
    return DIM_X;
  }
  get dim_y(){
    return DIM_Y;
  }

  remove(objects){
    if(objects === 'alien'){
      this.aliens = this.aliens.filter( ast=> ast.collisionDetected===false);
      this.shields -=1;
    }
  }
  static randomPosition(){
    return [Math.floor(Math.random() * Math.floor(DIM_X)), Math.floor(Math.random() * Math.floor(DIM_Y))];
  }
  checkCollisions(){
    for(let i=0; i<this.aliens.length; i++){
      for(let j=0; j<this.aliens.length; j++){
        if(this.aliens[i].isCollidedWith(this.ships[0])){
          this.aliens[i].collisionDetected = true;
          this.remove('alien');
        };
      }
    }
  }
  moveObjects(){
    this.allObjects().forEach( obj => obj.move());
  }
  moveShip(){
    this.ship.move();
  }
  draw(){
    this.ctx.clearRect(0,0,this.DIM_X, this.DIM_Y);
    this.allObjects().forEach( obj=>{
      obj.draw(this.ctx);
    })
    this.ship.draw(this.ctx);
  }

  static rotatePoints(x,y, cx,cy, radiansAngle){
    let cos = Math.cos(radiansAngle);
    let sin = Math.sin(radiansAngle);
    let temp;
    for( let n=0; n<x.length; n++ ){
        temp = ((x[n]-cx)*cos - (y[n]-cy)*sin) + cx;  
        y[n] = ((x[n]-cx)*sin + (y[n]-cy)*cos) + cy;
        x[n] = temp;
    }
    return{x: x, y: y};
  }
}

export default Game; 
