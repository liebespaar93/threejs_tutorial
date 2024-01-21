
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

function main() {
    const canvas = document.querySelector('#c_02');
    const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvas });
    renderer.setSize(window.innerWidth, window.innerHeight, 0.1, 1000)
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xFCF2CE)

    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 100)
    camera.castShadow = true;
    camera.receiveShadow = true;
    const controls = new OrbitControls(camera, renderer.domElement);
    camera.position.set(0, 0, 10)
    controls.update();

    // 문제 틀
    let light_intensity = 1;
    const gui = new GUI()
    const lightFolder = gui.addFolder('Light')
    function test_box(x, y, z, col, row) {
        const test_gm = new THREE.BoxGeometry(x, y, z);
        const test_mt = new THREE.MeshStandardMaterial({ color: 0xfFfFFf, side: THREE.BackSide });
        test_mt.shadowSide= THREE.DoubleSide;
        for (let i = 0; i < col * row; i++) {
            let r = Math.floor(i / col);
            let c = i % col - row;
            const test_box = new THREE.Mesh(test_gm, test_mt)
            test_box.position.set(c * x, r * y, 0)
            scene.add(test_box)
            const test_pointLight = new THREE.PointLight(0xFFFFFF, light_intensity);
            lightFolder.add(test_pointLight, 'intensity', 0, 3)
            test_pointLight.position.set(c * x, r * y + (y * 0.4), 0);
            scene.add(test_pointLight);
        }
    }
    test_box(4, 4, 4, 5, 2)

    // 예시 물체
    const Box_gt = new THREE.BoxGeometry(1, 1, 1);
    const Capsulex_gt = new THREE.CapsuleGeometry(0.5, 1, 4, 10);
    const Sphere_gt = new THREE.SphereGeometry(1, 32, 16);
    const Cone_gt = new THREE.ConeGeometry(1, 2, 4);
    const Cylinde_gt = new THREE.CylinderGeometry(0.5, 0.5, 1.5);

    const Basic_mt = new THREE.MeshBasicMaterial({ color: 0x44aa88, });
    const Dept_mt = new THREE.MeshDepthMaterial({ color: 0x44aa88, wireframe: true });
    const Normal_mt = new THREE.MeshNormalMaterial({ color: 0x44aa88 });
    const Phong_mt = new THREE.MeshPhongMaterial({ color: 0x44aa88, shininess: 100,emissive:30, emissiveIntensity: 5 });
    const Physical_mt = new THREE.MeshPhysicalMaterial({ roughness:0, metalness: 0, transmission: 1, ior:2});
    
    const ex_01 = new THREE.Mesh(Box_gt, Basic_mt);
    const ex_02 = new THREE.Mesh(Capsulex_gt, Dept_mt);
    const ex_03 = new THREE.Mesh(Sphere_gt, Normal_mt);
    const ex_04 = new THREE.Mesh(Cone_gt, Phong_mt);
    const ex_05 = new THREE.Mesh(Cylinde_gt, Physical_mt);

    ex_01.position.set(-8, 4, 0)
    ex_02.position.set(-4, 4, 0)
    ex_03.position.set(0, 4, 0)
    ex_04.position.set(4, 4, 0)
    ex_05.position.set(8, 4, 0)

    const ex_list = [ex_01, ex_02, ex_03, ex_04, ex_05]
    scene.add(ex_01, ex_02, ex_03, ex_04, ex_05);

    // 실습 해보기
    // 여기에 코드를 작성해 주세요
    // 이전 코드를 가져와 제질을 추가하여 넣어보세요 
    // 참고 사이트는 https://threejs.org/docs/?q=Material



    // 화면 설정
    function onResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener("resize", onResize);

    // 반복 렌더링 작업
    function render(time) {
        time *= 0.001;  // convert time to seconds
        ex_list.map((value, index) => {
            value.rotation.x = time;
            value.rotation.y = time
            value.rotation.z = time;
        })
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}
main()

