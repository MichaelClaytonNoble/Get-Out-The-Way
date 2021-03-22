import Game from './game';
import MovingObject from './moving_object';
import Util from './util';


const DIM_X = 900;
const DIM_Y = 600;
const RADIUS = 100;
const SIZE = 2*(RADIUS);
class Shadow extends MovingObject{
  constructor(options){
    super({color: '#000000', radius: RADIUS, pos: options['pos'], vel: Util.randomVec(1), type: 'shadow'});
    
    //degrees
    this.direction = 90; 
    this.angle = 0;
    this.nAngle = this.nAngle.bind(this); 
    this.changeDirection = this.changeDirection.bind(this); 
    this.seekShip = this.seekShip.bind(this); 
    setInterval(()=>this.changeDirection(Math.floor(Math.random()*2)+1), Math.floor(Math.random()*7000) + 1000); 
  }

  move(){
    super.move();
    this.seekShip(); 
  }
  seekShip(){
    let x = this.pos[0];
    let y = this.pos[1]; 
    const dim_x = Game.prototype.dim_x;
    const dim_y = Game.prototype.dim_y; 

    if(x>=dim_x || x<=0){
      this.vel=[this.vel[0]*-1,this.vel[1]];
    }
    if(y>= dim_y || y<=0){
      this.vel=[this.vel[0],this.vel[1]*-1];
    }
  }

  changeDirection(speed){
    this.vel= Util.randomVec(speed); 
    if ( (Math.floor(Math.random()*4) + 1) === 2){
    }
    // if(x>=dim_x || x<=0){
    //   this.vel=[this.vel[0]*-1,this.vel[1]];
    // }
    // if(y>= dim_y || y<=0){
    //   this.vel=[this.vel[0],this.vel[1]*-1];
    // }
    console.log(this.nAngle());
  }
  findShadowCenter(){
    this.shadowCenter = [this.pos[0], this.pos[1]];
    let xy = Game.rotatePoints([this.pos[0]-SIZE/2+15],[this.pos[1]-SIZE/2+40], this.pos[0],this.pos[1], Game.degToRad(angle));
  }
  nAngle(){
    return Math.abs(360-55-this.angle)% 360; 
  }
  calculateAngle(x,y){
    return Math.atan(y/x) * (180 / Math.PI);
  }

  draw(){

    let [vx, vy] = this.vel; 
    // console.log('vel', this.vel); 

    // let rotate = (this.calculateAngle(vx, vy))
    console.log(this.calculateAngle(vx, vy)); 
    // let rotate = this.calculateAngle(vx, vy); 
    //pointing down is 35 degrees rotation 
    let offset = 305; 
    // let rotate = 180; 
    this.angle = Math.abs(offset-rotate); 
    // console.log('angle', this.angle);

    let shadow = new Image();
    shadow.src="../dist/css/images/shadow/energy_halo.png";
    ctx.strokeStyle = "#FF00FF";
    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], RADIUS-RADIUS/10, Game.degToRad(-this.nAngle()+90), Game.degToRad(-this.nAngle()-90), true
    );

    ctx.stroke();
    ctx.beginPath();

    let xy = Game.rotatePoints([this.pos[0]-SIZE/2+15],[this.pos[1]-SIZE/2+40], this.pos[0],this.pos[1], Game.degToRad(this.angle));
 
    ctx.save();
    
    ctx.translate(xy['x'][0],xy['y'][0]);
    ctx.rotate(Game.degToRad(this.angle));
    ctx.drawImage(shadow, 0, 0, SIZE, SIZE);
    ctx.rotate(Game.degToRad(-this.angle));
    ctx.restore();

  }

  getDiagonal(){
    return Math.sqrt(2*(Math.pow(SIZE,2)));
  }
}

export default Shadow; 