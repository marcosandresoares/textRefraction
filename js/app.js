let camera;
let scene;
let renderer;
let mesh;

let mouseX = 0;
let mouseY = 0;

let colors = [
    "#1B98A6",
    "#F2BB13",
    "#F29F05",
    "#F2522E",
    "#BF2315"
];

// Init function
function init() {
    
    // camera
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        1,
        10000
    );
    camera.position.z = -100;
    camera.position.y = -100;

    // images and texture
    let images = textToTexture('こんにちは');
    let texture = new THREE.CubeTextureLoader().load(images);
    texture.mapping = THREE.CubeRefractionMapping;

    // scene
    scene = new THREE.Scene();

    // ambient
    let ambient = new THREE.AmbientLight(0xffffff);
    scene.add(ambient);

    // geometry and material
    let geometry = new THREE.IcosahedronGeometry(50,1);
    let material = new THREE.MeshPhongMaterial({
        envMap: texture,
        refractionRatio: 0.85
    });

    // mesh
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // renderer
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // event listeners
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    document.addEventListener('touchmove', onDocumentMouseMove, false);
    window['text-input'].addEventListener('keyup', onTextChange, false);
    window.addEventListener('resize', onWindowResize, false);

}

// onTextChange function
function onTextChange() {
    let str = window['text-input'].value || 'こんにちは';
    let images = textToTexture(str);
    let texture = new THREE.CubeTextureLoader().load(images);
    texture.mapping = THREE.CubeRefractionMapping;
    mesh.material.envMap = texture;
}

// onWindowResize function
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// onDocumentMove function
function onDocumentMouseMove(e) {
    if(e.touches) {
        e = e.touches[0];
    }
    mouseX = (e.clientX - (window.innerWidth / 2)) / 4;
    mouseY = (e.clientY - (window.innerHeight / 2)) / 4;
}

// animate function
function animate() {
    requestAnimationFrame(animate);
    render();
}

// render function
function render() {
    camera.position.x += (mouseX - camera.position.x) * 0.05;
    camera.position.y += (-mouseY - camera.position.y) * 0.05;
    camera.lookAt(mesh.position);
    renderer.render(scene, camera);
}

// textToTexture function
function textToTexture(text) {

    // if text is undefined
    if(text === undefined) {
        text = 'こんにちは';
    }

    // canvas
    let canvas = document.createElement('canvas');
    let tileSize = 1024;
    let fontSize = 50;

    canvas.width = tileSize * 4;
    canvas.height = tileSize;

    let ctx = canvas.getContext('2d');
    ctx.font = fontSize + 'px Rubik Mono One, Helvetica';
    let fillColor = colors[Math.floor(Math.random() * colors.length)];
    document.body.style.backgroundColor = fillColor;
    ctx.fillStyle = fillColor;
    ctx.fillRect(0,0,canvas.width, canvas.height);

    let textWidth = ctx.measureText(text).width;
    let textHeight = fontSize * 0.8;
    let repsX = Math.ceil(canvas.width / textWidth);
    let repsY = Math.ceil(canvas.height / textHeight);

    let idx = 0;
    for(let y = 0; y < canvas.height; y += textHeight) {
        for(let x = 0; x < canvas.width; x += textWidth) {
            ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
            let pseudoX = idx % 2 == 0 ? x : x - (textWidth / 2);
            ctx.fillText(text, pseudoX, y);
        }

        idx += 1;
    }

    let tileFromCanvas = (idx) => {
        let imgCanvas = document.createElement('canvas');
        imgCanvas.width = tileSize;
        imgCanvas.height = tileSize;

        let context = imgCanvas.getContext('2d');
        context.drawImage(canvas, -tileSize * idx, 0);
        return imgCanvas.toDataURL();
    }

    let images = [];
    images.push(tileFromCanvas(0));
    images.push(tileFromCanvas(1));
    images.push(tileFromCanvas(4)); 
    images.push(tileFromCanvas(4));
    images.push(tileFromCanvas(2));
    images.push(tileFromCanvas(3));
    return images;

}

// Call functions
init();
animate();