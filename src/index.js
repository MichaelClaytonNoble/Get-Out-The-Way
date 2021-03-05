const MovingObject = require("./moving_object.js"); 

import Alien from "./alien"; 
import Game from './game'; 
import GameView from './game_view'; 

console.log("Webpack is working!"); 

document.addEventListener("DOMContentLoaded", ()=>{
  const ctx = document.getElementsByTagName("canvas")[0].getContext('2d'); 
  window.canvas = document.getElementsByTagName("canvas")[0]; 
  window.ctx = ctx;

  window.Game=Game; 
  window.test = test; 

  //create a new game. 
})

function test(ctx){
  let gv = new GameView(ctx); 
  gv.start(); 
}