// SCENE
let scene = new THREE.Scene()

/*args: FOV(degrees), aspect ratio, near clipping plane, far clipping plane (point which rendering ceases) */
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(0, 3, -1)

// Set up our WebGL renderer and append it to the DOM
let renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)


// SKYBOX
let color = new THREE.Color(0xCCFFFF)
// Load urls 
// var urls = [
// ]
// cubeTexture = new THREE.CubeTextureLoader().setPath('../threejs/').load(urls);

scene.background = color

// PLANE
let plane = new THREE.Mesh(
  new THREE.PlaneGeometry(1000, 1000, 100, 100),
  new THREE.MeshLambertMaterial({ color: 0xffffff, side:THREE.DoubleSide, wireframe: true })
)
plane.rotation.x = Math.PI / 2
scene.add(plane)


// LIGHTS
let ambientLight = new THREE.AmbientLight(0x404040)
ambientLight.position.set(50, 50, 50)
scene.add(ambientLight)

let directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 )
scene.add(directionalLight)

// CONTROLS
var keys = {
  left: false,
  right: false,
  forward: false,
  backward: false,
}
//Event listeners for keypress
document.addEventListener('keydown', (event) => {
  const keyName = event.key;
  if (keyName === 'a') {
    keys.left = true
  } 
  if (keyName === 'd') {
    keys.right = true
  }
  if (keyName === 'w') {
    keys.forward = true
  }
  if (keyName === 's') {
    keys.back = true
  }
})
document.addEventListener('keyup', (event) => {
  const keyName = event.key;
  if (keyName === 'a') {
    keys.left = false;
  } 
  if (keyName === 'd') {
    keys.right = false
  }
  if (keyName === 'w') {
    keys.forward = false
  }
  if (keyName === 's') {
    keys.back = false
  }
})

//GAMELOOP
function animate () {

  //Register player movement
  if (keys.left) {
    camera.position.x -= 0.1
  }
  if (keys.right) {
    camera.position.x += 0.1
  }
  if (keys.forward) {
    camera.position.z -= 0.1
  }
  if (keys.back) {
    camera.position.z += 0.1
  }
  console.log(camera.position.z)
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}
animate()