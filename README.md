# [Get Out The Way!!](https://michaelclaytonnoble.github.io/Get-Out-The-Way/) [Play Here](https://michaelclaytonnoble.github.io/Get-Out-The-Way/) 
Move your ship out of the way and collect the energy boxes before your ship runs out of power. Collect shields to protect you from the alien invaders on your way back to your home world.

## Technologies
 * JavaScript (ES6)
 * HTML5
 * CSS3
 * Three.js
 * Howler.js

## Gameplay
 * The player moves the ship around the map while avoiding the green alien ships. The player's goal is to collect the red cubes that appear randomly on the map. The longer the player takes to reach the red cube the less points he/she receives. 
 * Other cubes appear randomly around the map and are designed to help the player achieve his goals. The yellow cubes increase the players shields / lives and the blue cubes slow enemy alien ships and destroy any aliens within a certain radius of the cube. 
 * Each red cube collected triggers 1 alien ship to spawn at a random location. Each collision with an alien ship reduces the players shield by 1 point. The game is over when the player runs out of shields. 

## Blue Cube
 * Aliens within the blast radius are reduced to smithereens. 
<img src="https://user-images.githubusercontent.com/31423958/116796015-1176ac00-aa8e-11eb-9f74-0d5637011e27.gif" width="760">


## Points and Shields
<img src="https://user-images.githubusercontent.com/31423958/116797413-6b7d6e80-aa9a-11eb-9ba3-c6e12f23c889.gif" width="760">

## Collision Detection
 * Collisions are constantly checked for during each animation loop. 
<img src="https://user-images.githubusercontent.com/31423958/116797589-20fcf180-aa9c-11eb-8993-93ba3fd28b5c.png" width="760">

 * All objects on the map are stored in an array. Each object has it's own collision detection method that checks its boundaries against another items boundaries. If a collision is detected an instance variable (collisionDetected) is set to true.
<img src="https://user-images.githubusercontent.com/31423958/116797640-b5675400-aa9c-11eb-8845-7bb243b009c6.png" width="760">

 * Each array is filtered for objects that have been collided with and the appropriate action is taken. 
<img src="https://user-images.githubusercontent.com/31423958/116797694-62da6780-aa9d-11eb-81bb-ac60c7b35f64.png" width="760"> 


## Alien and ship movement
 * Alien ships move at varying speeds but only diagonally based off of a 45 degree angle. If the alien ship encounters the map border it is reflected at a 90 degree angle. 

## Drawing alien and ships
 * The directionality of the ship and aliens are determined the velocity. Example: if the x coordinate is increasing and the y coordinate is decreasing we can assume the ship is flying at about a 45 degree angle. Radians are used to rotate each object from the 90 degree position to the correct position. 
Alien ship directionality example
<img src="https://user-images.githubusercontent.com/31423958/116797830-e3e62e80-aa9e-11eb-9318-3fb7bfed7ae3.png" width="760"> 

## Additional features
 * A music player that allows the user to select which song [] wants to listen to. 
<img src="https://user-images.githubusercontent.com/31423958/116798015-6d4a3080-aaa0-11eb-83e4-1003db2eb517.png" width="200">

 * Sound effects
 * Side action pane that displays relevant events to the user.

