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

// SELECT OBJECT BY CLICKING IT FROM THE MAP (left mouse button)
function onContainerMouseClick( event ) {
  event.preventDefault();
  mouse.x = ( (event.clientX -renderer.domElement.offsetLeft) / renderer.domElement.width ) * 2 - 1;
  mouse.y = -( (event.clientY - renderer.domElement.offsetTop) / renderer.domElement.height ) * 2 + 1;

  raycaster.setFromCamera( mouse, camera );
  var intersects = raycaster.intersectObjects( scene.children );
  for ( var i = 0; i < intersects.length; i++) {

    var obj = arrPlanets.filter(function ( obj ) {
      return obj.meshid === intersects[i].object.id;
    })[0];
    if(obj != null){
      scene.remove(highlightbox);
      cameraFollow = false;
      edellinenObjekti = valittuObjekti;
      valittuObjekti = intersects[i].object;
      valittuObjekti.geometry.computeBoundingBox();
      highlightbox = new THREE.BoxHelper(valittuObjekti, 0x76EE00);
      scene.add ( highlightbox );

      updateObjectInfo(obj.name, obj.description, obj.ores);
      w2ui['ships'].search('planetid', obj.recid);

      TWEEN.removeAll();
      var tweenTime = 1000;
      new TWEEN.Tween( cameraControls.target )
      .to( { x: valittuObjekti.position.x, y: valittuObjekti.position.y, z: valittuObjekti.position.z }, tweenTime, obj.distance )
      .easing( TWEEN.Easing.Quartic.InOut )
      .start();

      new TWEEN.Tween( camera.position )
      .to( { x: valittuObjekti.position.x, y: valittuObjekti.position.y+500, z: valittuObjekti.position.z+3000 }, tweenTime, obj.distance )
      .easing( TWEEN.Easing.Quartic.InOut )
      .onComplete( function(){
        cameraFollow = true;
      }).start();
    }
  }
}
