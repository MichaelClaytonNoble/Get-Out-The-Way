import {regular, killZone} from './box_shapes.js'
import Game from './game.js'; 
export const SIZE = 50;

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
    this.size/=Game.prototype.areaRatio;
    this.radius = this.size/2;
    if(this.type==='kill'){
      this.color = "#4d82ff";
      this.radius = 0;
      this.zone = 0;
      this._active = false;
      this.set=true;
      this.kill();
    }

    this.collisionDetected = false; 
    this.height = Game.prototype.dim_y;
    this.width = Game.prototype.dim_x; 

    this.reposition = this.reposition.bind(this); 
    this.kill = this.kill.bind(this);
    this.isCollidedWith= this.isCollidedWith.bind(this);

    window.addEventListener('resize', ()=>this.reposition(this.width, this.height), false);
  }

  set active(val){
    this._active=val;
  }
  
  kill(){
    let id = setInterval(()=>{
        if(this._active){

          if(this.set){this.zone=this.size*3; this.set=false}
          this.radius+=1;
          if(this.zone > 1){this.zone-=1;}
          console.log(this.radius);
          this.draw();
          if(this.radius >= this.size*3 || this.zone <= 1){
            this.collisionDetected=true;
            clearInterval(id);
          }
        }
      }, 1);
    }
  
  draw(){
    if(this.type ==='kill'){
      killZone(ctx, this.pos, 'silver', this.zone);
      killZone(ctx, this.pos, this.color, this.radius);
    }
    else{
      regular(ctx, this.pos, this.color, this.size);
    }
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

  reposition(width, height){
    let widthRatio = width / this.pos[0]; 
    let heightRatio =  height / this.pos[1]; 
    let area = width*height; 
    let areaRatio = area / Game.prototype.area;
    this.size/=areaRatio;
    this.pos[0] = Game.prototype.dim_x / widthRatio;
    this.pos[1] = Game.prototype.dim_y/heightRatio;
    this.height = Game.prototype.dim_y;
    this.width = Game.prototype.dim_x; 
    if(this.type==='kill'){
      this.radius = this.size*2;
    }
    else{
      this.radius = this.size/2;
    }
  }
}

export default BoxObject; 