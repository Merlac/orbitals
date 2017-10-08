var devMode = false;

var container;
var planet, planetAtmosphere, planetAtmosphereClouds;
var camera;

function init() {

	// INITIALIZE CONTAINER & RENDERER
	container = document.getElementById( 'container' );
	renderer = new THREE.WebGLRenderer( { antialias: true, alpha : true } );
	renderer.setClearColor(0x000000, 0);
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );


	// SCENE
	scene = new THREE.Scene();
	scene.fog = new THREE.Fog( 0x000000, 1, 1000000 );


	// BACKGROUND, LIGHTING
	addSkybox();
	addLights();
	var grid = new THREE.GridHelper(500000, 30, 0x111111 , 0x111111);
	//grid.position.y = -2000;
	//scene.add(grid);


	// CAMERA
	camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 1000000 );
	camera.position.set(12844,77017,93061);
	controls = new THREE.OrbitControls( camera );
	controls.target.set(99923,78277,-18363);

	// PLANET
	createPlanet();

	// SHIPS
	addShips();


	addEventListeners();

}


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
