var container;
var planet;


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
	scene.fog = new THREE.Fog( 0x000000, 1, 500000 );


	// BACKGROUND, LIGHTING
	addSkybox();
	var grid = new THREE.GridHelper(100000, 30, 0x111111 , 0x111111);
	//grid.position.y = -2000;
	scene.add(grid);
	scene.add( new THREE.AmbientLight( 0x404040, 3 ) );


	// CAMERA
	camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 500000 );
	camera.position.set(0,1000,20000);
	controls = new THREE.OrbitControls( camera );


	// PLANET
	createPlanet();


	addEventListeners();

}
