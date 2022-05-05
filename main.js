import './style.css';
import {Fireball} from './fireball.js';
import * as THREE from 'three';

/*

TODO: REFACTOR THIS

*/



// Setup


const scene = new THREE.Scene();



const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

const normal2Texture = new THREE.TextureLoader().load('resources/normal2.jpg');
// Torus
const ringTexture = new THREE.TextureLoader().load('resources/waterTexture.jpg')
ringTexture.wrapS = ringTexture.wrapT = THREE.MirroredRepeatWrapping
ringTexture.repeat.set(10, 10);
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ 
    map: ringTexture,
    normalMap: normal2Texture 
});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)
//const controls = new OrbitControls(camera, renderer.domElement);

const novaTexture = new THREE.TextureLoader().load('resources/nova.jpg')
var starArray = []
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ map: novaTexture });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(200));

  star.position.set(x, y, z);
  starArray.push(star)
  scene.add(star);
}

for(let i = 0; i < 300; i++){
    addStar();
}


// Background

const spaceTexture = new THREE.TextureLoader().load('resources/space.jpg');
scene.background = spaceTexture;

// Avatar

const cubeTexture = new THREE.TextureLoader().load('resources/cat.jpg');

const pictureCube = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: cubeTexture }));


// Moon

const moonTexture = new THREE.TextureLoader().load('resources/moon.jpg');
const normalTexture = new THREE.TextureLoader().load('resources/normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(1.5, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);



// Exploding planet

const explodingTexture = new THREE.TextureLoader().load('resources/fireball.jpg');
const explodingNormalTexture = new THREE.TextureLoader().load('resources/normal.jpg');

const explodingPlanet = new THREE.Mesh(
  new THREE.SphereGeometry(10, 32, 32),
  new THREE.MeshStandardMaterial({
    map: explodingTexture,
    normalMap: normalTexture,
  })
);

explodingTexture.wrapS = explodingTexture.wrapT = THREE.MirroredRepeatWrapping
explodingTexture.repeat.set(2, 1);


// Scroll Animation

function moveCamera() {
    const t = document.body.getBoundingClientRect().top;
  //   moon.rotation.x += 0.05;
  //   moon.rotation.y += 0.075;
  //   moon.rotation.z += 0.05;
  
    pictureCube.rotation.y += 0.01;
    pictureCube.rotation.z += 0.01;
  
    camera.position.z = t * -0.01;
    camera.position.x = t * -0.0002;
    camera.rotation.y = t * -0.0002;
  }
  
  document.body.onscroll = moveCamera;
  moveCamera();



scene.add(pictureCube);
scene.add(moon);
scene.add(explodingPlanet);


var date = 0;
var radius = 15;
let planetX = -30;
let planetY = -2;
let planetZ = 30;


explodingPlanet.position.x = planetX;
explodingPlanet.position.y = planetY;
explodingPlanet.position.z = planetZ;


pictureCube.position.z = -5;
pictureCube.position.x = 2;

var fireballArray = [];

const ballTexture = new THREE.TextureLoader().load('resources/explodingPlanet.jpg');

//ballTexture.wrapS = ballTexture.wrapT = THREE.MirroredRepeatWrapping
//ballTexture.repeat.set(10, 10);

function addFireBalls(n,x,y,z) {

    for (let i = 0; i < n; i++) { 
        //console.log(rAngleX);
        Math.floor(Math.random() * 1000)
        Math.floor(Math.random() * 1000)
        const geometry = new THREE.TetrahedronGeometry(0.2,6);
        //const geometry = new THREE.SphereGeometry(0.6, 24, 24);
        const material = new THREE.MeshStandardMaterial({ map: ballTexture });
        const fireballMesh = new THREE.Mesh(geometry, material);
        let num = 1;
        let newX = x + THREE.MathUtils.randFloatSpread(1)/num;
        let newY = y + THREE.MathUtils.randFloatSpread(1)/num;
        let newZ = z + THREE.MathUtils.randFloatSpread(1)/num;

        //console.log(newX);

        let velo = Math.random()/10 + 1;
        fireballMesh.rotation.x += newX;
        fireballMesh.rotation.y += newY;
        fireballMesh.rotation.z += newZ;

        fireballMesh.position.set(planetX, planetY, planetZ);


        fireballArray.push(new Fireball(velo, fireballMesh, scene));
        scene.add(fireballMesh);
    }
    
}

// Animation Loop

function animate() {
    //controls.update();
    requestAnimationFrame(animate);
  

  pictureCube.rotation.y += 0.01;
  pictureCube.rotation.z += 0.01;

  torus.rotation.x += 0.001;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.001;

  moon.rotation.y -= 0.005;
  explodingPlanet.rotation.y -= 0.001;

  date += .005;
  moon.position.set(
    (Math.cos(date) * radius) + planetX,
                                planetY,
    (Math.sin(date) * radius) + planetZ
  );

  if(Math.floor(Math.random() * 1000) > 995) {

        var total = Math.floor(Math.random() * 10) + 5
        var rAngleX = THREE.MathUtils.randFloatSpread(360);
        var rAngleY = THREE.MathUtils.randFloatSpread(360);
        var rAngleZ = THREE.MathUtils.randFloatSpread(360);
        console.log(total);
        addFireBalls(total, rAngleX, rAngleY, rAngleZ);

  }


  for (let i = 0; i < fireballArray.length; i++) { 
    if(fireballArray[i].update()){
        fireballArray.splice(i,1);
    }
  }

  for (let i = 0; i < starArray.length; i++) { 
    starArray[i].rotation.z -= 0.01;
    starArray[i].position.x += 0.1;
    if(starArray[i].position.x > 50){
        starArray[i].position.x = -50
    }
  }

  //console.log(fireballArray.length); 
  renderer.render(scene, camera);
}


animate();

