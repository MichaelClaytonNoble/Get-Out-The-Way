
import Alien from './alien'; 
import Ship from './ship'; 
import BoxObject from './box_object';
import GameView from './game_view';

const DIM_X = 600;
const DIM_Y = 450;
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
    this.addShieldBox(); 
    this.addEnergyBox(); 
    this.addAlien();

    this.ships = [Game.createShip()];
    this.ship = this.ships[0];

    //shields & points
    this.score = 0;
    this.shields = 5;

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
  addShip(){
    this.ships.push(Game.createShip());
  }
  
  getAllObjects(){
    return [].concat(this.aliens, this.shieldBoxes, this.energyBoxes);
  }
  getAllMoveObjects(){
    return [].concat(this.aliens);
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
    GameView.updateStats('shields', this.shields); 
  }
  addPoint(){
    this.score += 1;
    GameView.updateStats('total', this.shields); 
  }

  setPoints(){
    this.box_points = BOX_POINTS;
  }
  reducePoints(){
    if(this.box_points !== 0){
      this.box_points -= 1
    }
  }
  printScore(){
    console.log("Score: ", this.score);
    console.log("Shields: ", this.shields)
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
      this.aliens = this.aliens.filter( ast=> ast.collisionDetected===false);
    }
    if( objType ==='shield'){
      this.shieldBoxes = this.shieldBoxes.filter(shields => shields.collisionDetected===false);
    }
  }
  moveObjects(){
    this.getAllMoveObjects().forEach( obj => obj.move());
  }

  action(object){
    this.remove(object.type);
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
        break;
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

  bindMethods(that){
    that.draw = that.draw.bind(that); 
    that.moveShip = that.moveShip.bind(that);
    that.moveObjects = that.moveObjects.bind(that); 
    that.addAlien = that.addAlien.bind(that); 
    that.addShieldBox = that.addShieldBox.bind(that); 
    that.checkCollisions = that.checkCollisions.bind(that);
    that.getAllObjects = that.getAllObjects.bind(that);
    that.getAllMoveObjects = that.getAllMoveObjects.bind(that);
    that.addShield = that.addShield.bind(that); 
    that.printScore = that.printScore.bind(that); 
    that.addShield = that.addShield.bind(that); 
    that.removeShield = that.removeShield.bind(that); 

    setTimeout(that.addShield, 300);
    setTimeout(that.addPoints, 300);
    setTimeout(that.removeShield, 300);
  }
}

export default Game; 
