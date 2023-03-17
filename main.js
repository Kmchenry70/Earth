//import * as THREE from 'https://cdn.skypack.dev/three@0.137.5';
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'

import atmosphereVertexShader from './shaders/atmosphereVertex.glsl'
import atmosphereFragmentShader from './shaders/atmosphereFragment.glsl'

import moonVertexShader from './shaders/moonVertex.glsl'
import moonFragmentShader from './shaders/moonFragment.glsl'

import sunVertexShader from './shaders/sunVertex.glsl'
import sunFragmentShader from './shaders/sunFragment.glsl'

// import sunAuraVertexShader from 'C:/Users/cghyp/Earth-project/shaders/sunAuraVertex.glsl'
// import sunAuraFragmentShader from 'C:/Users/cghyp/Earth-project/shaders/sunAuraFragment.glsl'

//scene
const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer({
  antialias: true
});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild( renderer.domElement );

//Earth
const earth = new THREE.Mesh(
    new THREE.SphereGeometry(5, 50, 50),
    new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          globeTexture: {
            value: new THREE.TextureLoader().load('./img/earth.jpg')
          }
        }
    })
)
 
scene.add(earth);

//atmosphere
const atmosphere = new THREE.Mesh(
  new THREE.SphereGeometry(5, 50, 50),
  new THREE.ShaderMaterial({
      vertexShader: atmosphereVertexShader,
      fragmentShader: atmosphereFragmentShader,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide
  })
)

atmosphere.scale.set(1.1, 1.1, 1.1);

scene.add(atmosphere);



//moon
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(1.5, 50, 50),
  new THREE.ShaderMaterial({ 
    vertexShader: moonVertexShader,
    fragmentShader: moonFragmentShader,
    uniforms: {
      globeTexture: {
        value: new THREE.TextureLoader().load('./img/moon.jpg')
      }
    }
  })
);

moon.position.set(-50, 0, 0);
scene.add(moon);

//moon's orbit
var r = -50;
var theta = 0;
var dTheta = 2 * Math.PI / 1000;

//sun
const sun = new THREE.Mesh(
  new THREE.SphereGeometry(50, 50, 50),
  new THREE.ShaderMaterial({
    vertexShader: sunVertexShader,
    fragmentShader: sunFragmentShader,
    uniforms: {
      globeTexture: {
        value: new THREE.TextureLoader().load('./img/sun.jpg')
      }
    }
  })
);

sun.position.set(0, 0, -1000);

scene.add(sun);

//sun's aura
// const sunAura = new THREE.Mesh(
//   new THREE.SphereGeometry(50 , 50, 50),
//   new THREE.ShaderMaterial({
//       vertexShader: sunAuraVertexShader,
//       fragmentShader: sunAuraFragmentShader,
//       blending: THREE.AdditiveBlending,
//       side: THREE.BackSide
//   })
// )

// sunAura.scale.set(1.1, 1.1, 1.1);

// scene.add(sunAura);

//stars
const starGeometry = new THREE.BufferGeometry();
const starMaterial = new THREE.PointsMaterial({
  color: 0xffffff
});

const starVertices = [];
for (let i = 0; i < 10000; i++) {
  const x = (Math.random() - 0.5) * 2000;
  const y = (Math.random() - 0.5) * 2000;
  const z = -Math.random() * 2000;
  const w =  Math.random() * 2000;
  starVertices.push(x, y, z, w);
}

starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));

const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

//camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// const controls = new THREE.OrbitControls(camera, renderer.domElement);

camera.position.set(0, 0, 100);
// controls.update();
// camera.position.z = 15;

//renders scene
function animate() {
  requestAnimationFrame( animate );
  renderer.render( scene, camera );
  earth.rotation.y += 0.002;

  //updates moon's position
  theta -= dTheta;
  moon.position.x = r * Math.cos(theta);
  moon.position.z = r * Math.sin(theta);

}
animate();

//allows window to update on resize
window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}



