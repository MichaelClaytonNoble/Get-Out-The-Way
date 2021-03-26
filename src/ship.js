import Game from './game.js';
import MovingObject from "./moving_object.js";
import GameView from "./game_view.js"; 
export const RADIUS = 15;
export const COLOR = "#ffd700";

class Ship extends MovingObject{
  constructor(options){
    super({color: COLOR, radius: RADIUS/Game.prototype.areaRatio, pos: options['pos'], vel: [0,0], type: 'ship'});

    this.ctx = ctx;
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
///start oeue
    let start = [this.pos[0]-this.radius/5, this.pos[1]-this.radius/7];
    let strokea=[this.pos[0]-this.radius, this.pos[1]];
    let strokeb=[this.pos[0]-this.radius/4.8, this.pos[1]+this.radius/5];
    let strokec=[this.pos[0], this.pos[1]+this.radius*1.5]; 
    let stroked=[this.pos[0]+this.radius/4.8, this.pos[1]+this.radius/5]; 
    let strokee=[this.pos[0]+this.radius, this.pos[1]]; 
    let strokef=[this.pos[0]+this.radius/5, this.pos[1]-this.radius/7]; 
    let stroke2 = [this.pos[0], this.pos[1]-this.radius/1.2];
    
    let x = [start[0], strokea[0], strokeb[0], strokec[0], stroked[0], strokee[0], strokef[0],stroke2[0]];
    let y = [start[1], strokea[1], strokeb[1], strokec[1], stroked[1], strokee[1], strokef[1],stroke2[1]];

    this.ctx.strokeStyle = "#f400a1";
    this.ctx.fillStyle = "#f400a1";

    let rotated = Game.rotatePoints(x,y,this.pos[0],this.pos[1], cRadians)
    this.ctx.beginPath();
    start = [rotated['x'][0], rotated['y'][0]];
    strokea=[rotated['x'][1], rotated['y'][1]];
    strokeb=[rotated['x'][2], rotated['y'][2]];
    strokec=[rotated['x'][3], rotated['y'][3]];
    stroked=[rotated['x'][4], rotated['y'][4]];
    strokee=[rotated['x'][5], rotated['y'][5]];
    strokef=[rotated['x'][6], rotated['y'][6]];
    stroke2=[rotated['x'][7], rotated['y'][7]]; 
    
    this.ctx.moveTo(start[0], start[1]);
    this.ctx.lineTo(strokea[0], strokea[1]);
    this.ctx.lineTo(strokeb[0], strokeb[1]);
    this.ctx.lineTo(strokec[0], strokec[1]);
    this.ctx.lineTo(stroked[0], stroked[1]);
    this.ctx.lineTo(strokee[0], strokee[1]);
    this.ctx.lineTo(strokef[0], strokef[1]);
    this.ctx.lineTo(stroke2[0], stroke2[1]);
    this.ctx.lineTo(start[0], start[1]);
    
    this.ctx.fill();
    
    this.ctx.lineWidth=3;
     start = [this.pos[0]-this.radius/5, this.pos[1]+this.radius/7];
     strokea=[this.pos[0]-this.radius/1.7, this.pos[1]+this.radius];
     strokeb=[this.pos[0], this.pos[1]+this.radius/1.5];
     strokec=[this.pos[0]+this.radius/1.7, this.pos[1]+this.radius]; 
     stroked=[this.pos[0]+this.radius/5, this.pos[1]+this.radius/7]; 
     stroke2 = [this.pos[0], this.pos[1]-this.radius/1.2];
    
     x = [start[0], strokea[0], strokeb[0], strokec[0], stroked[0], stroke2[0]];
     y = [start[1], strokea[1], strokeb[1], strokec[1], stroked[1], stroke2[1]];

    this.ctx.strokeStyle = "#FFD700";
    
     rotated = Game.rotatePoints(x,y,this.pos[0],this.pos[1], cRadians)
    this.ctx.beginPath();
    start = [rotated['x'][0], rotated['y'][0]];
    strokea=[rotated['x'][1], rotated['y'][1]];
    strokeb=[rotated['x'][2], rotated['y'][2]];
    strokec=[rotated['x'][3], rotated['y'][3]];
    stroked=[rotated['x'][4], rotated['y'][4]];
    stroke2=[rotated['x'][5], rotated['y'][5]]; 
    
    this.ctx.moveTo(start[0], start[1]);
    this.ctx.lineTo(strokea[0], strokea[1]);
    this.ctx.lineTo(strokeb[0], strokeb[1]);
    this.ctx.lineTo(strokec[0], strokec[1]);
    this.ctx.lineTo(stroked[0], stroked[1]);
    this.ctx.lineTo(stroke2[0], stroke2[1]);
    this.ctx.lineTo(start[0], start[1]);
    
    this.ctx.stroke();
    this.ctx.lineWidth=1;
  }

  outOfBounds(){
    let dim_x = Game.prototype.dim_x;
    let dim_y = Game.prototype.dim_y; 

    let [x,y] = this.pos; 

    if(x >= dim_x-this.radius){
      this.pos[0] = dim_x-this.radius; 
    }
    if(x<= 0+this.radius){
      this.pos[0] = 0+this.radius;
    }
    if(y >= dim_y-this.radius){
      this.pos[1] = dim_y-this.radius; 
    }
    if(y<= 0+this.radius){
      this.pos[1] = 0+this.radius;
    }
  }
}

export default Ship; 


// let start = [this.pos[0]-this.radius, this.pos[1]];
//     let stroke1 = [this.pos[0]+this.radius, this.pos[1]];
    // let stroke2 = [this.pos[0], this.pos[1]-this.radius];
    
    // let x = [start[0],stroke1[0],stroke2[0]];
    // let y=[start[1], stroke1[1], stroke2[1]];
    // ctx.strokeStyle = "#FFD700";
    // let rotated = Game.rotatePoints(x,y,this.pos[0],this.pos[1], cRadians)
    // ctx.beginPath();
    // start = [rotated['x'][0], rotated['y'][0]];
    // stroke1=[rotated['x'][1], rotated['y'][1]];
    // stroke2=[rotated['x'][2], rotated['y'][2]]; 
    
    // ctx.moveTo(start[0], start[1]);
    // ctx.lineTo(stroke1[0], stroke1[1]);
    // ctx.lineTo(stroke2[0], stroke2[1]);
    // ctx.lineTo(start[0], start[1]);
    
    // ctx.stroke();
    // ctx.beginPath();
    // ctx.strokeStyle = "#FF00FF"; 
    // start = [this.pos[0]-this.radius/2, this.pos[1]];
    // stroke1 = [this.pos[0]+this.radius/2, this.pos[1]];
    // stroke2 = [this.pos[0], this.pos[1]-this.radius/2];
    
    // let z = [start[0],stroke1[0],stroke2[0]];
    // let w=[start[1], stroke1[1], stroke2[1]];
    // rotated = Game.rotatePoints(z,w,this.pos[0],this.pos[1], cRadians)

    // ctx.moveTo(start[0], start[1]);
    // ctx.lineTo(stroke1[0], stroke1[1]);
    // ctx.lineTo(stroke2[0], stroke2[1]);
    // ctx.lineTo(start[0], start[1]);

    // ctx.stroke()