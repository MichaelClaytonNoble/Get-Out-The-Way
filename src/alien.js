import Game from './game.js';
import MovingObject from './moving_object.js'; 
import Util from './util.js'; 
export const RADIUS = 20; 
export const COLOR = "#00eb23";


class Alien extends MovingObject{
  constructor(options){
    super({color: COLOR, radius: RADIUS, pos: options['pos'], vel: Util.random45Vec(1), type: 'alien'});
  }

  pauseMove(){
    this.stop = true;
    setTimeout(()=>this.stop=false, 2000);
  }
  move(){
    if(!this.stop){
      super.move();
      this.reflect();
    }
  }
  reflect(){
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
  draw(){
  
    ctx.strokeStyle = "#00eb23";
    ctx.beginPath(); 
    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2*Math.PI,
      true
    );
    ctx.closePath(); 
    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius/2,
      0,
      2*Math.PI,
      true
    );

    ctx.stroke(); 
    this.drawTriangleAt(this.pos, this.vel);
  }
  drawTriangleAt(pos, vel){
    let radians = {
      'upright': 0.785398,
      'downleft': 3.75246, 
      'downright':  2.35619,
      'upleft': 5.49779
    }
    let cRadians = radians['upright'];
    let [vx,vy] = this.vel;
    if (vx >= 0 && vy>0){
      cRadians = radians['downright'];
    }
    if(vx>=0 && vy<0){
      cRadians = radians['upright'];
    }
    if(vx<=0 && vy<0){
      cRadians = radians['upleft'];
    }
    if(vx<=0 && vy>0){
      cRadians = radians['downleft'];
    }

    let start = [this.pos[0]-this.radius, this.pos[1]];
    let stroke1 = [this.pos[0]+this.radius, this.pos[1]];
    let stroke2 = [this.pos[0], this.pos[1]-this.radius/2];
    
    let x = [start[0],stroke1[0],stroke2[0]];
    let y=[start[1], stroke1[1], stroke2[1]];
    ctx.strokeStyle = "#1F51FF";
    let rotated = Game.rotatePoints(x,y,this.pos[0],this.pos[1], cRadians)
    ctx.beginPath();
    start = [rotated['x'][0], rotated['y'][0]];
    stroke1=[rotated['x'][1], rotated['y'][1]];
    stroke2=[rotated['x'][2], rotated['y'][2]]; 

    ctx.moveTo(start[0], start[1]);
    ctx.lineTo(stroke1[0], stroke1[1]);
    ctx.lineTo(stroke2[0], stroke2[1]);
    ctx.lineTo(start[0], start[1]);

    ctx.stroke()
  }

}

export default Alien;