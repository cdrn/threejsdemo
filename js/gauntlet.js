// Application logic goes here
var scene = new THREE.Scene();
/*args: FOV(degrees), aspect ratio, near clipping plane, far clipping plane (point which rendering ceases) */
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 3, -1)

// Set up our WebGL renderer and append it to the DOM
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Make a nice skybox
var color = new THREE.Color(0xCCFFFF);
// Load urls 
// var urls = [
// ]
// cubeTexture = new THREE.CubeTextureLoader().setPath('../threejs/').load(urls);

scene.background = color;

//PLANE
// A mesh is created from the geometry and material, then added to the scene
var plane = new THREE.Mesh(
  new THREE.PlaneGeometry(500, 500, 100, 100),
  new THREE.MeshLambertMaterial({ color: 0xffffff, wireframe: true })
);
plane.rotation.x = Math.PI / 2;
scene.add(plane);

scene.add(plane);
console.log(plane);

// PLAYER CUBE
var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshLambertMaterial({ color: 0xFFCCFF });
var cube = new THREE.Mesh(geometry, material);
cube.position.y = 0.5
scene.add(cube);


// LIGHTS
var light = new THREE.PointLight(0xffffff, 1, 0);
light.position.set(50, 50, 50);
scene.add(light);

var ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

camera.position.z = 5;


var keys = {
  left: false,
  right: false
}
//Event listeners for keypress
document.addEventListener('keydown', (event) => {
  const keyName = event.key;
  console.log(keyName)
  if (keyName === 'a') {
    keys.left = true;
  } 
  if (keyName === 'd') {
    keys.right = true;
  }
})

document.addEventListener('keyup', (event) => {
  const keyName = event.key;
  console.log(keyName)
  if (keyName === 'a') {
    keys.left = false;
  } 
  if (keyName === 'd') {
    keys.right = false;
  }
})

//create the render loop
function animate () {
  requestAnimationFrame(animate);
  cube.position.z -= 0.1
  camera.position.z = cube.position.z + 10
  ambientLight.position.z = cube.position.z + 10
  if (keys.left) {
    cube.position.x -= 0.1
  }
  if (keys.right) {
    cube.position.x += 0.1
  }
 
  renderer.render(scene, camera);
}
animate();