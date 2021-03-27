
import Game from './game.js'; 
const NORMAL_FRAME_TIME_DELTA= 1000/60;

class MovingObject{
  constructor(options){
    this.pos = options['pos']; 
    this.vel= options['vel']; 
    this.radius = options['radius']; 
    this.color = options['color']; 
    this.type=options['type'];
    this.collisionDetected = false;
    this.reposition = this.reposition.bind(this); 
    this.height = Game.prototype.dim_y;
    this.width = Game.prototype.dim_x; 
    window.addEventListener('resize', ()=>this.reposition(this.width, this.height), false);
  }

  draw(ctx){
    ctx.fillStyle = this.color; 
    ctx.beginPath(); 
    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2*Math.PI,
      true
    );
    ctx.fill();
  }


  move(timeDelta){ 
    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA
    const offsetX = this.vel[0] * velocityScale;
    const offsetY = this.vel[1] * velocityScale;
    this.pos[0] += this.vel[0] + offsetX;
    this.pos[1]+=this.vel[1] + offsetY; 
  }
  // move(){ 
  //   this.pos[0] += this.vel[0];
  //   this.pos[1]+=this.vel[1]; 
  // }

  isCollidedWith(otherObject){
    let [x,y] = this.pos;
    let [oX, oY] = otherObject.pos;
    
    if(Math.abs(x - oX)<(this.radius+otherObject.radius/1.5) && Math.abs(y-oY)<(this.radius+otherObject.radius/1.5)){
      return true;
    }
    return false;
  }

  reposition(width, height){
    let widthRatio = width / this.pos[0]; 
    let heightRatio =  height / this.pos[1]; 
    let area = width*height; 
    let areaRatio = area / Game.prototype.area;
    this.radius/=areaRatio;
    this.pos[0] = Game.prototype.dim_x / widthRatio;
    this.pos[1] = Game.prototype.dim_y/heightRatio;
    this.height = Game.prototype.dim_y;
    this.width = Game.prototype.dim_x; 
  }

}

export default MovingObject;