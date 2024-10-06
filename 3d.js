import * as THREE from "three";
import { getBody, getMouseBall } from "./getBodies.js";
import RAPIER from 'https://cdn.skypack.dev/@dimforge/rapier3d-compat@0.11.2';
import { EffectComposer } from "jsm/postprocessing/EffectComposer.js"; // You can also remove this if you're not using any post-processing
import { RenderPass } from "jsm/postprocessing/RenderPass.js"; // You can keep this if you're planning to use other effects later

const fbox = document.getElementsByClassName("final-cta")[0]; // Access the first element of the collection

const w = fbox.offsetWidth;
const h = fbox.offsetHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
fbox.appendChild(renderer.domElement);
let mousePos = new THREE.Vector2();
await RAPIER.init();
const gravity = { x: 0.0, y: 0, z: 0.0 };
const world = new RAPIER.World(gravity);

scene.background = new THREE.Color(0x293BFF);
renderer.setClearColor(0x293BFF, 1);

// Remove post-processing related to bloom
const renderScene = new RenderPass(scene, camera);
const composer = new EffectComposer(renderer);
composer.addPass(renderScene); // Keep this if you want to use other effects in the future

const numBodies = 100;
const bodies = [];
for (let i = 0; i < numBodies; i++) {
  const body = getBody(RAPIER, world);
  bodies.push(body);
  scene.add(body.mesh);
}

const mouseBall = getMouseBall(RAPIER, world);

const hemiLight = new THREE.HemisphereLight(0xffffff, 0xaa00ff);
hemiLight.intensity = 0.8;
scene.add(hemiLight);

function animate() {
  requestAnimationFrame(animate);
  world.step();
  mouseBall.update(mousePos);
  bodies.forEach(b => b.update());
  
  // If you are not using any effects, just render normally
  // If you want to keep the composer for future effects, use composer.render
  // composer.render(scene, camera);
  renderer.render(scene, camera); // Render the scene without bloom effect
}

animate();

function handleWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
}
window.addEventListener('resize', handleWindowResize, false);

function handleMouseMove(evt) {
  const rect = renderer.domElement.getBoundingClientRect();

  // Calculate mouse position relative to the canvas (renderer)
  mousePos.x = ((evt.clientX - rect.left) / rect.width) * 2 - 1; // Normalize X
  mousePos.y = -((evt.clientY - rect.top) / rect.height) * 2 + 1; // Normalize Y

  // For debugging: log the normalized mouse position
  console.log(`Mouse X: ${mousePos.x}, Mouse Y: ${mousePos.y}`);
}
window.addEventListener('mousemove', handleMouseMove, false);
