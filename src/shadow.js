import Game from './game';
import MovingObject from './moving_object';
import Util from './util';


const DIM_X = 900;
const DIM_Y = 600;
const RADIUS = 100;
const SIZE = 2*(RADIUS);
class Shadow extends MovingObject{
  constructor(options){
    let trajectory = Util.randomVec(1);
    super({color: '#000000', radius: RADIUS, pos: options['pos'], vel: trajectory[0], type: 'shadow'});
    this.changeDirection();
    //degrees
    this.direction = 90; 
    this.angle = 0;
    this.nAngle = this.nAngle.bind(this); 
    this.changeDirection = this.changeDirection.bind(this); 
    this.seekShip = this.seekShip.bind(this); 
    setInterval(()=>this.changeDirection(Math.floor(Math.random()*2)+1), Math.floor(Math.random()*2000) + 1000); 
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
      this.rotation = Math.abs(this.rotation-180); 
      this.angle = Math.abs(this.angle-180); 
      // if(this.vel[0]< 1){
      //   this.rotation -= 90;
      // }
      // else{
      //   this.rotation+=90;
      // }
    }
    if(y>= dim_y || y<=0){
      this.vel=[this.vel[0],this.vel[1]*-1];
      this.rotation = Math.abs(this.rotation-180); 
      this.angle = Math.abs(this.angle-180); 
      // if(this.vel[1]< 1){
      // }
      // else{
      //   this.rotation+=90;
      //   this.angle +=90;
      // }
    }
  }

  changeDirection(speed=.2){
    this.trajectory = Util.randomVec(speed, this.rotation);
    this.vel = this.trajectory[0]; 
    this.rotation = this.trajectory[1] * 180/Math.PI;

    if ( (Math.floor(Math.random()*4) + 1) === 2){
    }
    
  }
  findShadowCenter(){
    this.shadowCenter = [this.pos[0], this.pos[1]];
    let xy = Game.rotatePoints([this.pos[0]-SIZE/2+15],[this.pos[1]-SIZE/2+40], this.pos[0],this.pos[1], Game.degToRad(angle));
  }
  nAngle(angle=this.angle){
    return Math.abs(360-55-angle)% 360; 
  }
  nRotation(angle=this.rotation){
    if(angle-90 < 0){
      return 360-Math.abs(angle-90)% 360; 
    }
    return Math.abs(angle-90)% 360; 
  }


  draw(){

    let [vx, vy] = this.vel; 

    //pointing down is 35 degrees rotation 
    let offset = 305; 
    let rotate = this.nRotation(); 
    this.angle = Math.abs(offset-rotate); 


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