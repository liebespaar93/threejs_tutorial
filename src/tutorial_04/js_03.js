
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { STLLoader } from 'three/addons/loaders/STLLoader'

function main() {
    const canvas = document.querySelector('#c_03');
    const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvas });
    renderer.setSize(window.innerWidth, window.innerHeight, 0.1, 1000)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.needsUpdate = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xFCF2CE)

    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 100)
    camera.castShadow = true;
    camera.receiveShadow = true;

    const controls = new OrbitControls(camera, renderer.domElement);
    camera.position.set(0, 0, 20)
    controls.update();
    // 문제 틀
    let light_intensity = 30;
    function test_box(x, y, z, col, row) {
        const loader = new STLLoader()
        const model = loader.load(
            './assets/smk55-kas2232-head-of-david.stl',
            function (geometry) {
                const material = new THREE.MeshPhysicalMaterial({ color: 0xFFFFFF, emissive: 0xABABAB, roughness: 0.3, metalness: 0.3, transmission: 0.1, ior: 1, sheen: 1, sheenRoughness: 0.3, sheenColor: 0xFFFFFF, clearcoat: 0.4 });
                const model = new THREE.Mesh(geometry, material)
                model.scale.multiplyScalar(0.02)
                model.rotateX(Math.PI * -0.5)
                model.castShadow = true;
                model.receiveShadow = true;
                const gm = new THREE.BoxGeometry(x - 0.1, y - 0.1, z, 1, 1);
                const mt = new THREE.MeshStandardMaterial({ color: 0xfFfFFf, side: THREE.BackSide });
                const box = new THREE.Mesh(gm, mt)
                box.castShadow = true;
                box.receiveShadow = true;
                const pointLight = new THREE.PointLight(0xFFFFFF, light_intensity);
                pointLight.castShadow = true;
                for (let i = 0; i < col * row; i++) {
                    let r = Math.floor(i / col);
                    let c = i % col;
                    const test_box = box.clone()
                    test_box.position.set(c * x - (x % 2 ? x : 0.5 * x), r * y, 0)
                    const test_pointLight = pointLight.clone()
                    test_pointLight.position.set(c * x - (x % 2 ? x : 0.5 * x), r * y + (y * 0.4), 0);
                    const test_model = model.clone()
                    test_model.position.set(c * x - 1.5 - (x % 2 ? x : 0.5 * x), r * y + (y * -0.5), 0.5)
                    if (i == 3)
                        scene.add(test_pointLight);
                    scene.add(test_box, test_model);
                }

            }
        )
    }
    test_box(10, 10, 10, 2, 2)

    // 예시 빗
    const Directional_lt = new THREE.DirectionalLight({ color: 0xff0000 });
    Directional_lt.position.set(-7, 13, 0);
    Directional_lt.castShadow = true;
    Directional_lt.shadow.mapSize.width = 512;
    Directional_lt.shadow.mapSize.height = 512;
    Directional_lt.shadow.camera.left = -5
    Directional_lt.shadow.camera.right = 5
    Directional_lt.shadow.camera.top = 20
    Directional_lt.shadow.camera.bottom = -20
    Directional_lt.shadow.camera.near = 0.5;
    Directional_lt.shadow.camera.far = 30;
    const Directional_lth = new THREE.CameraHelper(Directional_lt.shadow.camera);
    scene.add(Directional_lt, Directional_lth);


    const Spot_lt = new THREE.SpotLight(0xffffff, 10, 0, Math.PI * 0.3);
    // Spot_lt.receiveShadow = true;
    Spot_lt.castShadow = true;
    Spot_lt.angle = Math.PI * 0.1;
    Spot_lt.position.set(-7, 11, 0);
    Spot_lt.shadow.mapSize.width = 512;
    Spot_lt.shadow.mapSize.height = 512;
    Spot_lt.shadow.camera.near = 0.5;
    Spot_lt.shadow.camera.far = 30;
    const Spot_lth = new THREE.SpotLightHelper(Spot_lt, 0xff00ff);
    scene.add(Spot_lt, Spot_lth);

    //Set up shadow properties for the light
    // 실습 해보기
    // 여기에 코드를 작성해 주세요
    // 이전 코드를 가져와 제질을 추가하여 넣어보세요 
    // 참고 사이트는 https://threejs.org/docs/?q=Light


    // 화면 설정
    function onResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener("resize", onResize);

    // 반복 렌더링 작업
    function render(time) {
        time *= 0.001;
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}
main()

