import * as THREE from 'three';

let scene, camera, renderer; 

function init(){
  scene = new THREE.Scene();
  //60 degrees viewing angle 
  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = 1;
  camera.rotation.x = Math.PI/2; 

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  animate();
}
  //animation loop
function animate() {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

init();


