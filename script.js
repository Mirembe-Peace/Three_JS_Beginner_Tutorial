//import the three js ..
import * as THREE from 'three';
import { GLTFLoader } from '/three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from '/three/addons/controls/OrbitControls.js';

//set up the scene
const scene = document.querySelector('.canvas');
scene = new THREE.Scene();

//set up the camera

//the camera takes 4 argument 
// (Field of View, aspectRatio = window.innerWidth/window.innerHeight, near, far)
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
//set the position of the camera
camera.position.set(0, 0, 0);
//add the camera to the scene
scene.add(camera);

//add lights
//lights take 2 arguments (color, light strength)
const lights = new THREE.AmbientLight(0xffffff, 0.5);
//add the lights to the scene
scene.add(lights);

//the function to load the 3D model
new loader = GLTFLoader();
    loader.load('./assets/pink_house.gltf', function(gltf){
        pink_house = gltf.scene;
        pink_house.position.set(0, 0, 0);
        pink_house.scale.set(2, 2, 2);
        scene.add(pink_house);
    });

//set up the controls
const controls = OrbitControls(camera, renderer.domElement);


const renderer = new THREE.WebGLRenderer({canvas : canvas});
renderer.setPixelRatio(devicePixelRatio);
renderer.set(window.innerWidth, window.innerHeight);
document.appendChild(domElement, renderer);


//animate function
function animate{
    renderer.requestAnimationFrame(camera, scene);
}

animate();
