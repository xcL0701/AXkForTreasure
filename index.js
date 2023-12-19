import * as THREE from './ThreeJS/build/three.module.js'
import { OrbitControls } from './ThreeJS/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from './ThreeJS/examples/jsm/loaders/GLTFLoader.js'

const aspect = window.innerWidth/window.innerHeight
const normalCam = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000)
const orbitCam = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000)
orbitCam.position.set(0, 20, 70)
normalCam.position.set(0, 20, 70)
let currentCam = normalCam
normalCam.lookAt(0,0,0)

const scene = new THREE.Scene()

const renderer = new THREE.WebGLRenderer({antialias:true})
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

const point = new THREE.PointLight('#FF0000', 2, 200)
point.castShadow = true
point.position.set(0,13,0)
scene.add(point)

const spot1 = new THREE.SpotLight('#FFFFFF', 0.6, 50)
spot1.castShadow = true
spot1.position.set(13,2,13)
scene.add(spot1)

const spot2 = new THREE.SpotLight('#FFFFFF', 0.6, 50)
spot2.castShadow = true
spot2.position.set(-13,2,13)
scene.add(spot2)

const spot3 = new THREE.SpotLight('#FFFFFF', 0.6, 50)
spot3.castShadow = true
spot3.position.set(13,2,-13)
scene.add(spot3)

const spot4 = new THREE.SpotLight('#FFFFFF', 0.6, 50)
spot4.castShadow = true
spot4.position.set(-13,2,-13)
scene.add(spot4)

const spot5 = new THREE.SpotLight('#FF0000', 0.8, 50)
spot5.castShadow = true
spot5.position.set(6,13,0)
spot5.target.position.set(50, 0, 0)

const spot6 = new THREE.SpotLight('#FF0000', 0.8, 50)
spot6.castShadow = true
spot6.position.set(-6,13,0)
spot6.target.position.set(-50, 0, 0)

const pillarTexture = new THREE.TextureLoader().load('./assets/pillar.jpg')
const pillarGeo = new THREE.CylinderGeometry(3,3,30)
const pillarMat = new THREE.MeshPhongMaterial({
    map: pillarTexture
})
const pillar1 = new THREE.Mesh(pillarGeo,pillarMat)
pillar1.position.set(15,15,15)
pillar1.castShadow = true
pillar1.receiveShadow = true
scene.add(pillar1)

const pillar2 = new THREE.Mesh(pillarGeo,pillarMat)
pillar2.position.set(-15,15,15)
pillar2.castShadow = true
pillar2.receiveShadow = true
scene.add(pillar2)

const pillar3 = new THREE.Mesh(pillarGeo,pillarMat)
pillar3.position.set(15,15,-15)
pillar3.castShadow = true
pillar3.receiveShadow = true
scene.add(pillar3)

const pillar4 = new THREE.Mesh(pillarGeo,pillarMat)
pillar4.position.set(-15,15,-15)
pillar4.castShadow = true
pillar4.receiveShadow = true
scene.add(pillar4)

function pillarAnimate(pillar) {
    function updatePosition() {
        if(pillar.position.y > 3 && pillar.position.z < 27){
            pillar.position.y -= 0.2
            pillar.position.z += 0.2
            requestAnimationFrame(updatePosition)
        }
    }
    function updateRotation() {
        if(pillar.rotation.x < Math.PI/2){
            pillar.rotation.x += Math.PI * 0.012
            requestAnimationFrame(updateRotation)
        }
    }

    updatePosition()
    updateRotation()
}

function ground() {
    const texture = new THREE.TextureLoader().load('./assets/sand.jpg')
    const geo = new THREE.PlaneGeometry(100, 100)
    const mat = new THREE.MeshPhongMaterial({
        map: texture,
        side: THREE.DoubleSide
    })
    const mesh = new THREE.Mesh(geo, mat)
    mesh.position.set(0,0,0)
    mesh.receiveShadow = true
    mesh.rotateX(-Math.PI/2)
    scene.add(mesh)
}

function altar() {
    const loader = new GLTFLoader();
    loader.load('./assets/altar_for_diana/scene.gltf', (gltf) => {
        const obj = gltf.scene;
        obj.position.set(0, 5, 0);
        obj.scale.set(1,1,1);
        obj.castShadow = true;
        obj.receiveShadow = true;
        scene.add(obj);
    });
}

function text() {
    const loader = new THREE.FontLoader();
    loader.load('./ThreeJS/examples/fonts/helvetiker_bold.typeface.json', (font) => {
        const geo = new THREE.TextGeometry("Don't click me!", {
            font: font,
            size: 2,
            height: 0.1,
        });
        const mat = new THREE.MeshPhongMaterial({
            color: '#FF0000',
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(-10, 18, 0);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        scene.add(mesh);
    });
}

function treasure() {
    const geometry = new THREE.SphereGeometry(2,32,16)
    const material = new THREE.MeshPhongMaterial({
        color: '#ffff00'
    })
    const mesh = new THREE.Mesh(geometry,material)
    mesh.position.set(0,13,0)
    mesh.castShadow = true
    mesh.receiveShadow = true
    mesh.userData = { isClickable: true };
    scene.add(mesh)
}

function skybox() {
    const loader = new THREE.TextureLoader()
    const boxMaterialArr = []

    boxMaterialArr.push(
        new THREE.MeshBasicMaterial({
            map: loader.load('./assets/skybox/right.png'),
            side: THREE.DoubleSide
        })
    )
    boxMaterialArr.push(
        new THREE.MeshBasicMaterial({
            map: loader.load('./assets/skybox/left.png'),
            side: THREE.DoubleSide
        })
    )
    boxMaterialArr.push(
        new THREE.MeshBasicMaterial({
            map: loader.load('./assets/skybox/top.png'),
            side: THREE.DoubleSide
        })
    )
    boxMaterialArr.push(
        new THREE.MeshBasicMaterial({
            map: loader.load('./assets/skybox/bottom.png'),
            side: THREE.DoubleSide
        })
    )
    boxMaterialArr.push(
        new THREE.MeshBasicMaterial({
            map: loader.load('./assets/skybox/front.png'),
            side: THREE.DoubleSide
        })
    )
    boxMaterialArr.push(
        new THREE.MeshBasicMaterial({
            map: loader.load('./assets/skybox/back.png'),
            side: THREE.DoubleSide
        })
    )

    const geo = new THREE.BoxGeometry(700,700,700)
    const mesh = new THREE.Mesh(geo, boxMaterialArr)
    scene.add(mesh)
}

function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene,currentCam)
}

function allEvent() {
    window.addEventListener("keydown", (event) => {
        let key = event.key
        if (key == " ") {
            console.log("SPACE")
            if (currentCam == orbitCam) currentCam = normalCam
            else currentCam = orbitCam
        }
    })

    function onTreasureClick(event) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, currentCam);

        const intersects = raycaster.intersectObjects(scene.children, true);
        if (intersects.length > 0) {
            const clickedObject = intersects[0].object;
            if (clickedObject.userData && clickedObject.userData.isClickable) {
                console.log("Treasure Clicked!");

                // Remove Treasure
                scene.remove(clickedObject)

                // Light
                scene.add(spot5)
                scene.add(spot6)
                spot1.color.set('#FF0000')
                spot2.color.set('#FF0000')
                spot3.color.set('#FF0000')
                spot4.color.set('#FF0000')

                // Pilar animate
                pillarAnimate(pillar1)
                pillarAnimate(pillar2)
            }
        }
        
    }

    window.addEventListener("click", onTreasureClick);
}

function init() {
    currentCam.position.set(0, 20, 70)
    currentCam.lookAt(0,0,0)

    renderer.shadowMap.enabled = true
    const control = new OrbitControls(orbitCam,renderer.domElement)
    control.update()

    ground()
    altar()
    text()
    treasure()
    skybox()
    
    allEvent()
    animate()
}

init()