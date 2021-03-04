import Game from './game';
import MovingObject from "./moving_object";
import GameView from "./game_view"; 
export const RADIUS = 20;
export const COLOR = "#ffd700";

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
      this.power();
      super.move();
      this.vel = [this.vel[0]/8,this.vel[1]/8];
      this.outOfBounds();
    
  }

  outOfBounds(){
    let [x,y] = this.pos; 

    if(x >= 600-this.radius){
      this.pos[0] = 600-this.radius; 
    }
    if(x<= 0+this.radius){
      this.pos[0] = 0+this.radius;
    }
    if(y >= 600-this.radius){
      this.pos[1] = 600-this.radius; 
    }
    if(y<= 0+this.radius){
      this.pos[1] = 0+this.radius;
    }
  }
}

export default Ship; 