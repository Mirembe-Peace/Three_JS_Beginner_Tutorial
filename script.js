// Import Three.js and Addons
// Import the core Three.js library
import * as THREE from 'three';

// Import the GLTFLoader to load 3D models in .gltf / .glb format
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Import OrbitControls to allow mouse interaction (rotate, zoom, pan)
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


// ------------------------------
// Create the Scene
// ------------------------------

// Select the <canvas> element from HTML where we will render our 3D scene
const canvas = document.querySelector('.canvas');

// Create a new scene (this is like your "3D world")
const scene = new THREE.Scene();


// ------------------------------
// Set up the Camera
// ------------------------------

// A PerspectiveCamera mimics the way our eyes see things in real life
// It takes 4 arguments: (Field of View, Aspect Ratio, Near Clip, Far Clip)
const camera = new THREE.PerspectiveCamera(
    45,                          // Field of View (in degrees)
    window.innerWidth / window.innerHeight, // Aspect ratio of screen
    0.1,                         // Near clipping plane (objects closer than this are not seen)
    100                          // Far clipping plane (objects further than this are not seen)
);

// Position the camera (x, y, z)
camera.position.set(0, 0, 5);

// Point the camera towards the center of the scene (0, 0, 0)
camera.lookAt(0, 0, 0);

// Add the camera to the scene
scene.add(camera);


// ------------------------------
// Add Lights
// ------------------------------

// Create an Ambient Light (lights up everything equally)
// Arguments: (color, intensity)
const lights = new THREE.AmbientLight(0xffffff, 0.5);

// Add the light to the scene
scene.add(lights);


// ------------------------------
// Load a 3D Model
// ------------------------------

// Create a new GLTFLoader to load .gltf or .glb models
const loader = new GLTFLoader();

// Load the model (path to file, success callback, error callback)
loader.load(
    './assets/pink_house.glb',   // Path to the model 
    // credits (https://sketchfab.com/3d-models/pink-house-4c8215427b5e46818db595d6558a7172) by CGulia (https://sketchfab.com/CGulia) licensed under CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
    function (gltf) {
        // This function runs if the model loads successfully
        const pink_house = gltf.scene;  // Extract the 3D scene object from the model

        // Position the model in the scene
        pink_house.position.set(0, 0, 0);

        // Scale the model (make it bigger/smaller)
        pink_house.scale.set(2, 2, 2);

        // Add the model to our main scene
        scene.add(pink_house);
    },
    undefined,
    function (error) {
        // This function runs if there’s an error loading the model
        console.log('An error occurred while loading the model');
    }
);


// ------------------------------
// Set up the Renderer
// ------------------------------

// The renderer is what draws the scene and camera into the canvas (like a projector)
const renderer = new THREE.WebGLRenderer({canvas : canvas}); 
// `alpha: true` makes the background transparent

// Set the size of the renderer to match our canvas
renderer.setSize(window.innerWidth, window.innerHeight);

// Improve rendering quality for high-resolution screens
renderer.setPixelRatio(window.devicePixelRatio);


// ------------------------------
// Add Orbit Controls
// ------------------------------

// OrbitControls lets you move around the scene with your mouse (drag, scroll, etc.)
const controls = new OrbitControls(camera, renderer.domElement);

// Re-render the scene whenever the camera changes
controls.addEventListener('change', () => renderer.render(scene, camera));

// Enable smooth damping effect (makes movement feel natural)
controls.enableDamping = true;


// ------------------------------
// Animation Loop
// ------------------------------

// A function that continuously updates (like a game loop)
// It keeps rendering the scene so we can see movement and interaction
function animate() {
    // Render the scene from the perspective of the camera
    renderer.render(scene, camera);

    // Keep calling this function on the next frame
    requestAnimationFrame(animate);
}

// Call the animation loop to start rendering
animate();
