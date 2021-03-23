import * as THREE from 'three';
let scene, camera, renderer, starGeo;

        function init() {
          scene = new THREE.Scene();
          //60 degrees viewing angle 
          camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
          camera.position.z = 1;
          camera.rotation.x = Math.PI / 2;

          renderer = new THREE.WebGLRenderer();
          renderer.setSize(window.innerWidth, window.innerHeight);
          document.getElementById("overlay").appendChild(renderer.domElement);
          THREE.Geometry;
          starGeo = new THREE.Geometry();
          for(let i=0; i<6000; i++){
            let star = new THREE.Vector3(
              Math.random() * 600-300,
              Math.random() * 600-300,
              Math.random() * 600-300
            )
            starGeo.vertices.push(star);
          }

          animate();
        }
        //animation loop
        function animate() {
          renderer.render(scene, camera);
          requestAnimationFrame(animate);
        }

        init();

