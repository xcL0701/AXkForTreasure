import * as THREE from './ThreeJS/build/three.module.js'
import { OrbitControls } from './ThreeJS/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from './ThreeJS/examples/jsm/loaders/GLTFLoader.js'

const aspect = window.innerWidth/window.innerHeight
const cam = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000)
const scene = new THREE.Scene()
const renderer = new THREE.WebGLRenderer({antialias:true})

renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

function light() {
    const point = new THREE.PointLight('#FF0000', 2, 200)
    point.castShadow = true
    point.position.set(0,13,0)
    
    const spot1 = new THREE.SpotLight('#FFFFFF', 0.6, 50)
    spot1.castShadow = true
    spot1.position.set(13,2,13)

    const spot2 = new THREE.SpotLight('#FFFFFF', 0.6,50)
    spot1.castShadow = true
    spot1.position.set(13,2,-13)

    const spot3 = new THREE.SpotLight('#FFFFFF', 0.6,50)
    spot1.castShadow = true
    spot1.position.set(-13,2,13)

    const spot4 = new THREE.SpotLight('#FFFFFF', 0.6,50)
    spot1.castShadow = true
    spot1.position.set(-13,2,-13)

    const spot5 = new THREE.SpotLight('#FF0000', 0.8,50)
    spot1.castShadow = true
    spot1.position.set(50,0,0)

    const spot6 = new THREE.SpotLight('#FF0000', 0.8,50)
    spot1.castShadow = true
    spot1.position.set(-50,0,0)

    scene.add(point, spot1, spot2, spot3, spot4)
}

function ground() {
    const texture = new THREE.TextureLoader().load('./assets/sand.jpg')
    const geo = new THREE.PlaneGeometry(100, 100)
    const mat = new THREE.MeshPhongMaterial({
        map: texture,
        // side: THREE.DoubleSide
    })
    const mesh = new THREE.Mesh(geo, mat)
    mesh.position.set(0,0,0)
    mesh.receiveShadow = true
    mesh.rotateX(-Math.PI/2)
    scene.add(mesh)
}

function altar() {
    const loader = new GLTFLoader()
    loader.load('./assets/altar_for_diana/scene.gltf', (x)=>{
        // console.log('loaded')
        const obj = x.scene
        obj.position.set(0,0,0)
        obj.scale.set(1,1,1)
        obj.castShadow = true;
        obj.receiveShadow = true;
        action.play()
        scene.add(obj)
    })
}

function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene,cam)
}


// function treasure(){
//     const geo = new THREE.SphereGeometry(2,32,16)
//     const mat = new THREE.MeshPhongMaterial({
//         color:'#ffff00'
//     })
//     const mesh = new THREE.Mesh(geo,mat)

//     scene.add(mesh)
// }




function init() {
    cam.position.set(0, 20, 70)
    cam.lookAt(0,0,0)

    renderer.shadowMap.enabled = true
    //const control = new OrbitControls(cam,renderer.domElement)
    //control.update()
   
    light()
    ground()
    altar()
    
    animate()
}

init()