// Application logic goes here
var scene = new THREE.Scene();
/*args: FOV(degrees), aspect ratio, near clipping plane, far clipping plane (point which rendering ceases) */
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Set up our WebGL renderer and append it to the DOM
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshLambertMaterial({color: 0xFF0000});
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

var light = new THREE.PointLight( 0xff0000, 1, 100 );
light.position.set( 50, 50, 50 );
scene.add( light );

var ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

camera.position.z = 5;

//create the render loop
function animate () {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.1;
  cube.rotation.y += 0.1;
	renderer.render(scene, camera);
}
animate();