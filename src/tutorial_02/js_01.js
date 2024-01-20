
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
function main() {
    const canvas = document.querySelector('#c_01');
    const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvas });
    renderer.setSize(window.innerWidth, window.innerHeight, 0.1, 1000)
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xFCF2CE)

    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 100)
    
    const controls = new OrbitControls(camera, renderer.domElement);
    camera.position.set(0, 0, 10)
    controls.update();

    // 문제 틀
    const test_gm = new THREE.BoxGeometry(2.5, 2.5, 2.5);
    const test_mt = new THREE.MeshStandardMaterial({ color: 0xCFCFFE, side: THREE.BackSide });
    for (let i = 0; i < 10; i++) {
        let row = Math.floor(i / 5);
        let col = i % 5 - 2;
        const test_box = new THREE.Mesh(test_gm, test_mt)
        test_box.position.set(col * 3, row * 3, 0)
        scene.add(test_box)
    }

    // 예시 물체
    const Box_gt = new THREE.BoxGeometry(1, 1, 1);
    const Capsulex_gt = new THREE.CapsuleGeometry(0.5, 1, 4, 10);
    const Sphere_gt = new THREE.SphereGeometry(1, 32, 16);
    const Cone_gt = new THREE.ConeGeometry(1, 2, 4);
    const Cylinde_gt = new THREE.CylinderGeometry(0.5, 0.5, 1.5);
    const ph_mt = new THREE.MeshPhongMaterial({ color: 0x44aa88 });
    const ex_01 = new THREE.Mesh(Box_gt, ph_mt);
    const ex_02 = new THREE.Mesh(Capsulex_gt, ph_mt);
    const ex_03 = new THREE.Mesh(Sphere_gt, ph_mt);
    const ex_04 = new THREE.Mesh(Cone_gt, ph_mt);
    const ex_05 = new THREE.Mesh(Cylinde_gt, ph_mt);
    ex_01.position.set(-6,3,0)
    ex_02.position.set(-3,3,0)
    ex_03.position.set(0,3,0)
    ex_04.position.set(3,3,0)
    ex_05.position.set(6,3,0)
    const ex_list = [ex_01, ex_02, ex_03, ex_04, ex_05]
    scene.add(ex_01, ex_02, ex_03, ex_04, ex_05);

    // 실습 해보기
    // 여기에 코드를 작성해 주세요
    // 아래 박스에 맞게 새로운 도형들을 넣어보세요 
    // 참고 사이트는 https://threejs.org/docs/?q=Geometry




    // 빛 만들기
    const color = 0xFFFFFF;
    const intensity = 3;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);

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
        ex_list.map((value,index)=>{
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

