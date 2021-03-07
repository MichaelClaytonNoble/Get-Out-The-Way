
import Alien from './alien'; 
import Ship from './ship'; 
import BoxObject from './box_object';
import GameView from './game_view';

const DIM_X = 900;
const DIM_Y = 700;
const NUM_ALIENS = 6;
const BOX_POINTS = 100; 

class Game {
  constructor(ctx){
    //canvas and setup variables 
    this.ctx=ctx;
    
    //shieldBoxes, energyBoxes, aliens, ships
    this.aliens = []; 
    this.shieldBoxes = [];
    this.energyBoxes = [];
    this.slowBoxes = []; 

    this.addShieldBox(); 
    this.addEnergyBox(); 
    this.addSlowBox();
    this.addAlien();
    this.addAlien();
    this.addAlien();
    this.addAlien();
    this.addAlien();
    this.addAlien();
    
    this.ships = [Game.createShip()];
    this.ship = this.ships[0];
    
    //shields & points
    this.score = 0;
    this.shields = 5;
    this.box_points;
    this.setPoints(); 
    
    //bindings
    this.bindMethods = this.bindMethods.bind(this); 
    this.bindMethods(this);
    
  }

  //add objects to the game 
  addAlien(){
    const ast= new Alien({pos: Game.randomPosition()});
    this.aliens.push(ast); 
  }
  addShieldBox(){
    const shieldBox = new BoxObject({
      type: 'shield',
      pos: Game.randomPosition()
    });
    this.shieldBoxes.push(shieldBox);
    setTimeout(()=>this.shieldBoxes.pop(), 8000);
  }
  addEnergyBox(){
    this.energyBoxes.pop();
    const energyBox = new BoxObject({
      type: 'energy',
      pos: Game.randomPosition()
    });
    this.energyBoxes.push(energyBox);
  }
  addSlowBox(){
    this.slowBoxes.pop();
    const slowBox = new BoxObject({
      type: 'slow',
      pos: Game.randomPosition()
    });
    this.slowBoxes.push(slowBox);
    setTimeout(()=>this.slowBoxes.pop(), 5000);

  }
  addShip(){
    this.ships.push(Game.createShip());
  }
  
  getAllObjects(){
    return [].concat(this.aliens, this.shieldBoxes, this.energyBoxes, this.slowBoxes);
  }
  getAllMoveObjects(){
    return [].concat(this.aliens);
  }

  //manipulate objects
  reduceAlienSize(){
    this.aliens.forEach( alien => {
      alien.radius = alien.radius/2;
      alien.pauseMove();
      setTimeout(()=>alien.radius=alien.radius*2, 5000);
    })
  }
  
  //points & lives management 
  newLife(){
    this.ships.push(Game.createShip());
  }
  addShield(){
    this.shields+=1;
    GameView.updateStats('shields', this.shields); 
  }
 
  removeShield(){
    this.shields-=1;
    if(this.shields === -1){
      this.gameOver();
    }
    GameView.updateStats('shields', this.shields); 
  }
  addPoint(){
    this.score += this.box_points;
    this.setPoints();
    GameView.updateStats('total', this.score); 
  }

  setPoints(){
    this.box_points = BOX_POINTS;
  }
  reducePoints(){
    if(this.box_points !== 0){
      this.box_points -= 1;
      GameView.updateStats('points', this.box_points);
    }
  }
  printScore(){
    console.log("Score: ", this.score);
    console.log("Shields: ", this.shields);
  }

  //game maintenance 
  static createShip(){
    return new Ship({pos: [300,300]}); 
  }
  static randomPosition(){
    return [Math.floor(Math.random() * Math.floor(DIM_X)), Math.floor(Math.random() * Math.floor(DIM_Y))];
  }
  get dim_x(){
    return DIM_X;
  }
  get dim_y(){
    return DIM_Y;
  }

  //game play 
  remove(objType){
    if(objType === 'alien'){
      this.aliens = this.aliens.filter( alien=> alien.collisionDetected===false);
    }
    if( objType ==='shield'){
      this.shieldBoxes = this.shieldBoxes.filter(shield => shield.collisionDetected===false);
    }
    if( objType ==='slow'){
      this.slowBoxes = this.slowBoxes.filter(slow => slow.collisionDetected===false);
    }
  }
  moveObjects(){
    this.getAllMoveObjects().forEach( obj => obj.move());
  }

  action(object){
    this.remove(object.type);
    // GameView.playSoundFX(object.type);
    switch(object.type){
      case 'alien':
        this.removeShield();
        break;
      case 'shield':
        this.addShield();
        break;
      case 'energy':
        this.addPoint();
        this.addEnergyBox();
        this.addAlien();
        this.setPoints();
        break;
      case 'slow':
        this.reduceAlienSize();
        GameView.playSoundFX('slow', 2000); 
      default: break; 
    }
  }
  checkCollisions(){

    const allObjects = this.getAllObjects();
    for(let i=0; i<allObjects.length; i++){
      if(allObjects[i] !== undefined){
        if(allObjects[i].isCollidedWith(this.ships[0])){
            allObjects[i].collisionDetected = true;
            this.action(allObjects[i]); 
        };
      }
    }
  }
  moveShip(){
    this.ship.move();
  }

  //rendering and drawing 
  draw(){
    this.ctx.clearRect(0,0,DIM_X, DIM_Y);
    this.getAllObjects().forEach( obj=>{
      obj.draw(this.ctx);
    })
    this.ship.draw(this.ctx);
  }

  static rotatePoints(x,y, cx,cy, radiansAngle){
    let _cos = Math.cos(radiansAngle);
    let _sin = Math.sin(radiansAngle);
    let t;
    for( let i=0; i<x.length; i++ ){
        t = ( ( x[i]-cx )* _cos - ( y[i]-cy)* _sin ) + cx;  
        y[i] = ( ( x[i]-cx )* _sin + ( y[i]-cy )* _cos ) + cy;
        x[i] = t;
    }
    return{x, y};
  }

  gameOver(){
    
  }

  bindMethods(that){
    that.draw = that.draw.bind(that); 

    that.moveShip = that.moveShip.bind(that);
    that.moveObjects = that.moveObjects.bind(that); 
    
    that.checkCollisions = that.checkCollisions.bind(that);
    
    that.getAllObjects = that.getAllObjects.bind(that);
    that.getAllMoveObjects = that.getAllMoveObjects.bind(that);
    
    that.printScore = that.printScore.bind(that); 
    
    //add elements
    that.addAlien = that.addAlien.bind(that); 
    that.addShield = that.addShield.bind(that); 
    that.addShieldBox = that.addShieldBox.bind(that); 
    that.addSlowBox = that.addSlowBox.bind(that); 
    that.addEnergyBox = that.addEnergyBox.bind(that); 

    //remove elements
    that.removeShield = that.removeShield.bind(that); 


    //points
    that.reducePoints = that.reducePoints.bind(that); 
    //timers
    setTimeout(that.addShield, 300);
    setTimeout(that.addPoints, 300);
    setTimeout(that.removeShield, 300);
  }
}

export default Game; 
