
import Alien from './alien.js'; 
import Ship from './ship.js'; 
import Shadow from './shadow.js'; 
import BoxObject from './box_object.js';
import GameView from './game_view.js';

const DIM_X = 900;
const DIM_Y = 600;
const NUM_ALIENS = 6;
const BOX_POINTS = 100; 
const SLOW_DURATION = 10000; 

class Game {
  constructor(ctx){
    //canvas and setup variables 
    this.ctx=GameView.findCtx();
    //shieldBoxes, energyBoxes, aliens, ships, shadows
    
    this.ships = [Game.createShip()];
    this.ship = this.ships[0];
    this.aliens = new Array(6).fill(0).map( alien =>{ return new Alien({pos: Game.randomPosition()})});
    // this.aliens = []; 
    this.shadows = []; 
    this.shieldBoxes = [];
    this.energyBoxes = [];
    this.slowBoxes = [];
    this.killBoxes = [];

    this.addShieldBox(); 
    this.addEnergyBox(); 
    this.addSlowBox();
  
    //shields & points
    this._score = 0;
    this.shields = 5;
    this.box_points;
    this.setPoints(); 
    
    //bindings
    this.bindMethods.bind(this)(this);
  }

  //add objects to the game 
  addAlien(n=1){
    const alien= new Alien({pos: Game.randomPosition()});
    this.aliens.push(alien); 
  }
  addShadow(){
    const shadow = new Shadow({pos: Game.randomPosition()}); 
    this.shadows.push(shadow); 
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
    // this.slowBoxes.pop();
    const slowBox = new BoxObject({
      type: 'slow',
      pos: Game.randomPosition()
    });
    // const killBox = new BoxObject({
    //   type: 'kill',
    //   pos: slowBox.pos
    // });
    // this.killBoxes.push(killBox);

    this.slowBoxes.push(slowBox);
    setTimeout(()=>this.slowBoxes.pop(), 9000);

  }
  addShip(){
    this.ships.push(Game.createShip());
  }
  
  getAllObjects(){
    return [].concat(this.aliens, this.shieldBoxes, this.energyBoxes, this.slowBoxes);
  }
  getAllMoveObjects(){
    return [].concat(this.aliens, this.ship);
  }

  //manipulate objects
  reduceAlienSize(){
    this.aliens.forEach( alien => {
      alien.radius = alien.radius/2;
      alien.pauseMove();
      setTimeout(()=>alien.radius=alien.radius*2, SLOW_DURATION);
    })
  }
  
  //points & lives management 

  get score(){
    return this._score;
  }

  set score(val){
    this._score = val;
  }
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
    this._score += this.box_points;
    this.setPoints();
    GameView.updateStats('total', this._score); 
  }

  setPoints(){
    this.box_points = BOX_POINTS;
    window.score = this._score;
  }
  reducePoints(){
    if(this.box_points !== 0){
      this.box_points -= 1;
      GameView.updateStats('points', this.box_points);
    }
  }

  //game maintenance 
  static createShip(){
    return new Ship({pos: [300,300]}); 
  }
  static randomPosition(){
    let position = [Math.floor(Math.random() * (Game.prototype.dim_x * .95) + Game.prototype.dim_x*.05), Math.floor(Math.random() * (Game.prototype.dim_y*.95) + Game.prototype.dim_y*.05)];
    return position; 
  }
  get dim_x(){
    // return DIM_X;
    return Math.floor(window.innerWidth/2.3);

  }
  get dim_y(){
    // return DIM_Y;
    let aspect = window.innerHeight*1.2 / window.innerWidth; 
    return Math.floor(Game.prototype.dim_x * aspect);
  }

  get area(){
    return Math.floor(Game.prototype.dim_x * Game.prototype.dim_y); 
  }

  get areaRatio(){
    let area = 836*502; 
    return area/Game.prototype.area;
  }

  get _ship(){
    return this.ship;
  }
 
  isSlowed(){
    return this.slowed;
  }

  //game play 
  remove(objType){
    if(objType === 'alien' || objType === 'kill'){
      this.aliens = this.aliens.filter( alien=> alien.collisionDetected===false);
    }
    if( objType ==='shield'){
      this.shieldBoxes = this.shieldBoxes.filter(shield => shield.collisionDetected===false);
    }
    if( objType ==='slow'){
      let nowBox;
      this.slowBoxes = this.slowBoxes.filter( slow => {
        if(slow.collisionDetected){
          nowBox=slow;
        }
        else{
          return slow.collisionDetected===false
        }
      });

    const killBox = new BoxObject({
      type: 'kill',
      pos: nowBox.pos
    });
    this.killBoxes.push(killBox);
    this.killBoxes[this.killBoxes.length-1].active = true;
    }
    if( objType === 'kill'){
      this.killBoxes = this.killBoxes.filter( kill => kill.collisionDetected === false);
    }

  }
  moveObjects(delta){
    this.getAllMoveObjects().forEach( obj => obj.move(delta));
  }
  // moveObjects(){
  //   this.getAllMoveObjects().forEach( obj => obj.move());
  // }

  action(object){
    this.remove(object.type);
    GameView.playSoundFX(object.type);
    switch(object.type){
      case 'alien':
        this.removeShield();
        GameView.gameAlerts('remove shield'); 
        if(this.shields <= 1){
          GameView.gameAlerts('low shield'); 
        }
        break;
      case 'shield':
        this.addShield();
        GameView.gameAlerts('add shield'); 
        break;
      case 'energy':
        GameView.gameAlerts('add point', {points: this.box_points})
        this.addPoint();
        this.addEnergyBox();
        this.addAlien();
        this.setPoints();
        break;
      case 'slow':
        this.reduceAlienSize();
        this.slowed = true;
        GameView.changeTheme('var(--slow)');
        GameView.changeTheme('var(--slow)', '--title-border');
        GameView.changeTheme('var(--slow)', '--bar-background');
        GameView.changeTheme('var(--backward)', '--bar-direction');
        setTimeout(()=>{
          GameView.changeTheme('var(--title-border-initial)', '--title-border');
          GameView.changeTheme('var(--bar-initial)', '--bar-background');
          GameView.changeTheme('var(--alien)'); 
          GameView.changeTheme('var(--forward)', '--bar-direction'); 
          this.slowed=false;
        }, SLOW_DURATION);
        break;
      case 'kill':
        break;
      default: break; 
    }
  }
  checkCollisions(){
    const allObjects = this.getAllObjects();
    for(let i=0; i<allObjects.length; i++){
      if(allObjects[i] !== undefined){
        if(allObjects[i].type ==='alien'){
          this.killBoxes.forEach( kill => {
            if(allObjects[i].isCollidedWith(kill)){
              allObjects[i].collisionDetected = true;
            }
          });
        }
        if(allObjects[i].isCollidedWith(this.ships[0])){
          allObjects[i].collisionDetected = true;
          this.action(allObjects[i]); 
        };
      }
    }
    this.remove('kill');
  }
  moveShip(){
    this.ship.move();
  }

  //rendering and drawing 
  draw(){
    this.ctx.clearRect(0,0,Game.prototype.dim_x, Game.prototype.dim_y);
    this.drawBackground(); 
    this.ship.draw();
    this.getAllObjects().forEach( obj=>{
      obj.draw();
    })
    this.killBoxes.forEach( kill => kill.draw());

  }
  drawBackground(){
    let raised = '#009900';
    if(this.slowed){
      raised ='#4d82ff';
    }
    let area = 900*600; 
    let areaRatio = area / Game.prototype.area;
    let squareSize = 150/areaRatio;

    let numSquaresX = Math.floor(Game.prototype.dim_x/squareSize); 
    let numSquaresY = Math.floor(Game.prototype.dim_y/squareSize); 
    let yStart = (Game.prototype.dim_y - numSquaresY*squareSize)/2;
    let xStart = (Game.prototype.dim_x - numSquaresX*squareSize)/2;
    let pos = [xStart, yStart]; 
    let initialPos = pos;


    for(let y=0; y<numSquaresY; y++){
      for(let x=0; x<numSquaresX; x++){
        this.ctx.globalAlpha = .3;
        this.ctx.beginPath();
        this.ctx.strokeStyle = raised;
        this.ctx.moveTo(pos[0],pos[1]);
        this.ctx.lineTo(pos[0]+squareSize, pos[1]);
        this.ctx.stroke();     
        this.ctx.beginPath();
        this.ctx.strokeStyle = raised;
        this.ctx.moveTo(pos[0],pos[1]);
        this.ctx.lineTo(pos[0], pos[1]+squareSize);
        this.ctx.stroke();
        
        this.ctx.globalAlpha = 1;
        if(this.slowed){
          this.drawSquare(pos,raised,squareSize,.05,.2,true);
        }
        else{
          this.drawSquare(pos,'#ff00ff',squareSize,.05,.2,true);
        }
        this.drawSquare(pos,'#334433',squareSize,.1,.8,false);
        this.drawSquare(pos,'#336633',squareSize,.2,.6,false, true);
        this.drawSquare(pos,'#337733',squareSize,.3,.25,false);
        this.drawSquare(pos,'#339933',squareSize,.4,.2,false, true);
        this.drawSquare(pos,'#33BB33',squareSize,.5,.15,false);
        this.drawSquare(pos,'#33DD33',squareSize,.6,.1,false, true);
        this.drawSquare(pos,'#33FF33',squareSize,.7,.05,false);
        this.ctx.globalAlpha=1;
        pos[0]+=squareSize;
      }
      pos[0] = xStart;
      pos[1]+=squareSize;
    }
  }
  drawSquare(pos, color, size, scale=1, alpha=1, filled=true, line=false){
    let raised = '009900'; 
    if(this.slowed){
      this.ctx.globalAlpha=.1;
      raised = '#4d82ff';
    }
    if(line){
      this.ctx.beginPath();
      this.ctx.strokeStyle = raised;
      this.ctx.moveTo(pos[0],pos[1]);
      this.ctx.lineTo(pos[0]+(size-size*scale)/2, pos[1]+(size-size*scale)/2);
      this.ctx.stroke();
    }
    this.ctx.globalAlpha = alpha;
    if(filled){
      this.ctx.fillStyle = color;
      this.ctx.fillRect(pos[0]+(size-size*scale)/2,pos[1]+(size-size*scale)/2,size*scale,size*scale);
    }
    else{
      this.ctx.strokeStyle = color;
      this.ctx.strokeRect(pos[0]+(size-size*scale)/2,pos[1]+(size-size*scale)/2,size*scale,size*scale);
    }
    this.ctx.globalAlpha = 1;
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

  static degToRad(deg){
    return deg * 0.01745;  
  }

  gameOver(){
    window.score = this.score;
    window.dispatchEvent(new Event('gameOver'));
  }

  bindMethods(that){
    that.draw = that.draw.bind(that); 
    that.drawBackground = that.drawBackground.bind(that); 
    that.drawSquare = that.drawSquare.bind(that); 

    that.moveShip = that.moveShip.bind(that);
    that.moveObjects = that.moveObjects.bind(that); 
    
    that.checkCollisions = that.checkCollisions.bind(that);
    
    that.getAllObjects = that.getAllObjects.bind(that);
    that.getAllMoveObjects = that.getAllMoveObjects.bind(that);
    
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

    //state
    that.slowed = false; 
    that.isSlowed = this.isSlowed.bind(that); 

    //timers
    setTimeout(that.addShield, 300);
    setTimeout(that.removeShield, 300);
  }
}

export default Game; 
