let camera;
let scene;
let renderer;
let mesh;

let mouseX = 0;
let mouseY = 0;

let colors = [
    // TODO:
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
    let images = textToTexture('')

}

// onTextChange function
function onTextChange() {

}

// onWindowResize function
function onWindowResize() {

}

// onDocumentMove function
function onDocumentMove(e) {

}

// animate function
function animate() {

}

// render function
function render() {

}

// textToTexture function
function textToTexture(text) {

}

// Call functions
init();
animate();