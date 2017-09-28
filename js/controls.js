var mouse = new THREE.Vector2();
var controls;

// ADD EVENT LISTENERS
function addEventListeners(){
  window.addEventListener( 'resize', onWindowResize, false );
  container.addEventListener( 'mousemove', onContainerMouseMove, false );
  container.addEventListener( 'click', onContainerMouseClick, false );
  controls.addEventListener( 'change', render );
}


// WHEN RESIZING WINDOW
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

// FUNCTION WHEN MOUSE IS MOVING
function onContainerMouseMove( event ){
  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = ( event.clientY / window.innerHeight ) * 2 + 1;
}
