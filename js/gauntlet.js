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
scene.background = color;

//PLANE
// A mesh is created from the geometry and material, then added to the scene
var plane = new THREE.Mesh(
	new THREE.PlaneGeometry( 500, 500, 100, 100 ),
	new THREE.MeshBasicMaterial( { color: 0x222222, wireframe: true } )
);
plane.rotateX(Math.PI/2);
scene.add( plane );

// plane.rotateX( - Math.PI / 2);
scene.add(plane);
console.log(plane);

// PLAYER CUBE
var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshLambertMaterial({color: 0xFFCCFF});
var cube = new THREE.Mesh(geometry, material);
cube.position.y = 0.5
scene.add(cube);


// LIGHTS
var light = new THREE.PointLight( 0xff0000, 1, 100 );
light.position.set( 50, 50, 50 );
scene.add(light);

var ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

camera.position.z = 5;

//create the render loop
function animate () {
  requestAnimationFrame(animate);
  cube.position.z -= 0.1
  camera.position.z = cube.position.z + 10

	renderer.render(scene, camera);
}
animate();