// Application logic goes here

let lose = false // winflag
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
var plane = new THREE.Mesh(
  new THREE.PlaneGeometry(100, 20000, 100, 100),
  new THREE.MeshLambertMaterial({ color: 0xffffff, side:THREE.DoubleSide, wireframe: false })
);
plane.rotation.x = Math.PI / 2;
scene.add(plane);


// PLAYER CUBE
var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshLambertMaterial({ color: 0xFFCCFF });
var cube = new THREE.Mesh(geometry, material);
cube.position.y = 0.5
scene.add(cube);


// LIGHTS
let light = new THREE.PointLight(0xffffff, 1, 0);
light.position.set(50, 50, -100);
scene.add(light);


var ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

// OBSTACLES
// Use this to randgen object positions
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

var obstacleGeo = new THREE.BoxGeometry(3, 1, 1);
var obstacleMat = new THREE.MeshLambertMaterial({color: 0xD3D3D3});
let obstacle = new THREE.Mesh(obstacleGeo, obstacleMat);
let i;
let numObstacles = 500;

// add n obstacles to the scene qasi randomly
for (i = 0; i < numObstacles; i++) {
  let newObs = new THREE.Mesh(obstacleGeo, obstacleMat);
  newObs.position.x = getRandomInt(-20, 20)
  newObs.position.z = getRandomInt(-10, -1000)
  newObs.position.y = 0.5
  scene.add(newObs)
}

// COLLISION
const raycaster = new THREE.Raycaster();
// Set a ray for every direction of the cube
const rays = [
  new THREE.Vector3(0, 0, 1),
  new THREE.Vector3(1, 0, 1),
  new THREE.Vector3(1, 0, 0),
  new THREE.Vector3(1, 0, -1),
  new THREE.Vector3(0, 0, -1),
  new THREE.Vector3(-1, 0, -1),
  new THREE.Vector3(-1, 0, 0),
  new THREE.Vector3(-1, 0, 1)
];

// CONTROLS
var keys = {
  left: false,
  right: false
}
//Event listeners for keypress
document.addEventListener('keydown', (event) => {
  const keyName = event.key;
  if (keyName === 'a') {
    keys.left = true;
  } 
  if (keyName === 'd') {
    keys.right = true;
  }
})

document.addEventListener('keyup', (event) => {
  const keyName = event.key;
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
  cube.position.z -= 0.3
  camera.position.z = cube.position.z + 10
  // Follow with ambient light
  ambientLight.position.z = cube.position.z + 10

  // Set movement
  if (keys.left) {
    cube.position.x -= 0.1
  }
  if (keys.right) {
    cube.position.x += 0.1
  }

  // Raycast collision
  let i;
  let collisions = [];
  for (i = 0; i < rays.length; i++) {
    raycaster.set(cube.position, rays[i])
    collisions = raycaster.intersectObjects(scene.children)
    for (ray of collisions) {
      if (ray.distance <= 0.1){
        alert('lmao u died')
        lose = true
      }
    }
  }
  // console.log(collisions);


  //Render the frame
  renderer.render(scene, camera);
}

animate();
