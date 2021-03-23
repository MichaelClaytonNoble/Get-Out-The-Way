import {regular} from './box_shapes.js'
export const SIZE = 40;

class BoxObject{
  constructor(options){
    this.type = options['type'];
    this.pos = options['pos']; 
    if(this.type === 'shield'){
      this.color = "#FFFF00";
    }
    if(this.type ==='energy'){
      this.color = "#FF1111";
    }
    if(this.type ==='slow'){
      this.color = "#4d82ff";
    }
    this.size = SIZE;
    this.radius = SIZE/2;
    this.collisionDetected = false; 
    this.isCollidedWith= this.isCollidedWith.bind(this);
  }

  draw(ctx){
   regular(ctx, this.pos, this.color);
  }
  drawBoundary(){
    ctx.strokeStyle = this.color; 
    ctx.beginPath(); 
    ctx.arc(
      this.pos[0]+SIZE/8,
      this.pos[1]+SIZE/8,
      10,
      0,
      2*Math.PI,
      true
    );
    ctx.stroke();
  }
    
 isCollidedWith(otherObject){
    let [x,y] = this.pos;
    let [oX, oY] = otherObject.pos;
    x+=SIZE/8;
    y+=SIZE/8;
    if(Math.abs(x - oX)<(this.radius+otherObject.radius) && Math.abs(y-oY)<(this.radius+otherObject.radius)){
      return true;
    }
    return false;
  }

}

export default BoxObject; 