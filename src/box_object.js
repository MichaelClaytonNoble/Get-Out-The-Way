import {regular} from './box_shapes.js'
import Game from './game.js'; 
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
    let area = 900*700; 
    this.size = SIZE;
    let areaRatio = area / Game.prototype.area;
    this.size/=areaRatio;
    this.radius = this.size/2;

    this.collisionDetected = false; 
    this.height = Game.prototype.dim_y;
    this.width = Game.prototype.dim_x; 

    this.reposition = this.reposition.bind(this); 
    this.isCollidedWith= this.isCollidedWith.bind(this);

    window.addEventListener('resize', ()=>this.reposition(this.width, this.height), false);
  }
  draw(ctx){
   regular(ctx, this.pos, this.color, this.size);
  }
  drawBoundary(){
    ctx.strokeStyle = this.color; 
    ctx.beginPath(); 
    ctx.arc(
      this.pos[0]+this.size/8,
      this.pos[1]+this.size/8,
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
    x+=this.size/8;
    y+=this.size/8;
    if(Math.abs(x - oX)<(this.radius+otherObject.radius) && Math.abs(y-oY)<(this.radius+otherObject.radius)){
      return true;
    }
    return false;
  }

  resize(width, height){
    
  }
  reposition(width, height){
    let widthRatio = width / this.pos[0]; 
    let heightRatio =  height / this.pos[1]; 
    let area = width*height; 
    let areaRatio = area / Game.prototype.area;
    this.size/=areaRatio;
    this.radius = this.size/2;
    this.pos[0] = Game.prototype.dim_x / widthRatio;
    this.pos[1] = Game.prototype.dim_y/heightRatio;
    this.height = Game.prototype.dim_y;
    this.width = Game.prototype.dim_x; 
  }
}

export default BoxObject; 