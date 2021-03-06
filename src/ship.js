import Game from './game';
import MovingObject from "./moving_object";
import GameView from "./game_view"; 
export const RADIUS = 20;
export const COLOR = "#ffd700";

const DIM_X = 900;
const DIM_Y = 700;
class Ship extends MovingObject{
  constructor(options){
    super({color: COLOR, radius: RADIUS, pos: options['pos'], vel: [0,0], type: 'ship'});

    this.outOfBounds = this.outOfBounds.bind(this); 
  }

  power(){
      let impulse = [0,0];
      if(window.keyFlags['up']){
        impulse[0]+= GameView.MOVES().up[0]; 
        impulse[1]+= GameView.MOVES().up[1]; 
      }
      if(window.keyFlags['right']){
        impulse[0]+= GameView.MOVES().right[0]; 
        impulse[1]+= GameView.MOVES().right[1]; 
      }
      if(window.keyFlags['left']){
        impulse[0]+= GameView.MOVES().left[0]; 
        impulse[1]+= GameView.MOVES().left[1]; 
      }
      if(window.keyFlags['down']){
        impulse[0]+= GameView.MOVES().down[0]; 
        impulse[1]+= GameView.MOVES().down[1]; 
      }
      this.vel[0]+=impulse[0];
      this.vel[1]+=impulse[1]; 
  }
  move(){
      this.vel = [0,0]; 
      this.power();
      super.move();
      this.vel = [this.vel[0]/8,this.vel[1]/8];
      this.outOfBounds();
    
  }

  draw(){
        let radians = {
      'upright': 0.785398,
      'downleft': 3.75246, 
      'downright':  2.35619,
      'upleft': 5.49779,
      'up': 0,
      'down': 3.14159,
      'right': 1.5708,
      'left': 4.71239
    }
    let cRadians = radians['upright'];
    let [vx,vy] = this.vel;

    if(vx === 0 && vy <= 0){
      cRadians = radians['up'];
    }
    if(vx === 0 && vy > 0){
      cRadians = radians['down'];
    }
    if(vx > 0 && vy === 0){
      cRadians = radians['right'];
    }
    if(vx < 0 && vy === 0){
      cRadians = radians['left'];
    }
    if (vx > 0 && vy>0){
      cRadians = radians['downright'];
    }
    if(vx>0 && vy<0){
      cRadians = radians['upright'];
    }
    if(vx<0 && vy<0){
      cRadians = radians['upleft'];
    }
    if(vx<0 && vy>0){
      cRadians = radians['downleft'];
    }

    let start = [this.pos[0]-this.radius, this.pos[1]];
    let stroke1 = [this.pos[0]+this.radius, this.pos[1]];
    let stroke2 = [this.pos[0], this.pos[1]-this.radius];
    
    let x = [start[0],stroke1[0],stroke2[0]];
    let y=[start[1], stroke1[1], stroke2[1]];
    ctx.strokeStyle = "#FFD700";
    let rotated = Game.rotatePoints(x,y,this.pos[0],this.pos[1], cRadians)
    ctx.beginPath();
    start = [rotated['x'][0], rotated['y'][0]];
    stroke1=[rotated['x'][1], rotated['y'][1]];
    stroke2=[rotated['x'][2], rotated['y'][2]]; 
    
    ctx.moveTo(start[0], start[1]);
    ctx.lineTo(stroke1[0], stroke1[1]);
    ctx.lineTo(stroke2[0], stroke2[1]);
    ctx.lineTo(start[0], start[1]);
    
    ctx.stroke();
    ctx.beginPath();
    ctx.strokeStyle = "#FF00FF"; 
    start = [this.pos[0]-this.radius/2, this.pos[1]];
    stroke1 = [this.pos[0]+this.radius/2, this.pos[1]];
    stroke2 = [this.pos[0], this.pos[1]-this.radius/2];
    
    let z = [start[0],stroke1[0],stroke2[0]];
    let w=[start[1], stroke1[1], stroke2[1]];
    rotated = Game.rotatePoints(z,w,this.pos[0],this.pos[1], cRadians)

    ctx.moveTo(start[0], start[1]);
    ctx.lineTo(stroke1[0], stroke1[1]);
    ctx.lineTo(stroke2[0], stroke2[1]);
    ctx.lineTo(start[0], start[1]);

    ctx.stroke()
  }

  outOfBounds(){
    let [x,y] = this.pos; 

    if(x >= DIM_X-this.radius){
      this.pos[0] = DIM_X-this.radius; 
    }
    if(x<= 0+this.radius){
      this.pos[0] = 0+this.radius;
    }
    if(y >= DIM_Y-this.radius){
      this.pos[1] = DIM_Y-this.radius; 
    }
    if(y<= 0+this.radius){
      this.pos[1] = 0+this.radius;
    }
  }
}

export default Ship; 