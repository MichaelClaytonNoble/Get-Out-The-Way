
export function regular(ctx, pos, color, size){
  ctx.strokeStyle = color; 
    ctx.beginPath(); 
    ctx.strokeRect(pos[0], pos[1], size/2, size/2);
    ctx.closePath(); 
    ctx.beginPath();
    ctx.strokeRect(pos[0]-size/4, pos[1]-size/4, size/2, size/2);
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(pos[0]+size/4,pos[1]-size/4);
    ctx.lineTo(pos[0]+size/2,pos[1]);
    ctx.closePath(); 
    ctx.stroke(); 
    ctx.beginPath();
    ctx.moveTo(pos[0]-size/4,pos[1]-size/4);
    ctx.lineTo(pos[0],pos[1]);
    ctx.closePath(); 
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(pos[0]-size/4,pos[1]+size/4);
    ctx.lineTo(pos[0],pos[1]+size/2);
    ctx.closePath(); 
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(pos[0]+size/4,pos[1]+size/4);
    ctx.lineTo(pos[0]+size/2,pos[1]+size/2);
    ctx.closePath(); 
    ctx.stroke();
  }

  export function killZone(ctx, pos, color, radius){
    if(radius <= 1){radius === 1;}
    ctx.strokeStyle = color; 
    ctx.beginPath();
    ctx.arc(pos[0], pos[1], radius, 0, 2*Math.PI, true);
    ctx.stroke();
  }