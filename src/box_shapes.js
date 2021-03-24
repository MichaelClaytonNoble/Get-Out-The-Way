import {SIZE} from './box_object.js'; 

export function regular(ctx, pos, color){
  ctx.strokeStyle = color; 
    ctx.beginPath(); 
    ctx.strokeRect(pos[0], pos[1], SIZE/2, SIZE/2);
    ctx.closePath(); 
    ctx.beginPath();
    ctx.strokeRect(pos[0]-SIZE/4, pos[1]-SIZE/4, SIZE/2, SIZE/2);
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(pos[0]+SIZE/4,pos[1]-SIZE/4);
    ctx.lineTo(pos[0]+SIZE/2,pos[1]);
    ctx.closePath(); 
    ctx.stroke(); 
    ctx.beginPath();
    ctx.moveTo(pos[0]-SIZE/4,pos[1]-SIZE/4);
    ctx.lineTo(pos[0],pos[1]);
    ctx.closePath(); 
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(pos[0]-SIZE/4,pos[1]+SIZE/4);
    ctx.lineTo(pos[0],pos[1]+SIZE/2);
    ctx.closePath(); 
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(pos[0]+SIZE/4,pos[1]+SIZE/4);
    ctx.lineTo(pos[0]+SIZE/2,pos[1]+SIZE/2);
    ctx.closePath(); 
    ctx.stroke();
  }