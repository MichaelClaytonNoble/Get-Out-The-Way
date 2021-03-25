
import Game from './game.js'; 


class MovingObject{
  constructor(options){
    this.pos = options['pos']; 
    this.vel= options['vel']; 
    this.radius = options['radius']; 
    this.color = options['color']; 
    this.type=options['type'];
    this.collisionDetected = false;
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
  posi(){
    return this.pos;
  }


  move(){ 
    this.pos[0] += this.vel[0];
    this.pos[1]+=this.vel[1]; 
  }

  isCollidedWith(otherObject){
    let [x,y] = this.pos;
    let [oX, oY] = otherObject.pos;
    
    if(Math.abs(x - oX)<(this.radius+otherObject.radius/1.5) && Math.abs(y-oY)<(this.radius+otherObject.radius/1.5)){
      return true;
    }
    return false;
  }



}

export default MovingObject;