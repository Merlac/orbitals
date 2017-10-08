
function addShips(){
  var shipArea1 = new THREE.Vector3( 15198,75880,87490 );
  var shipCount = 6
  var shipSpread = 1300;

  var shipTexture = new THREE.TextureLoader().load( "img/shipTexture.png" );
  if(devMode){
    var shipMaterial = new THREE.MeshBasicMaterial( { color: 0x979a9e } );
  } else {
    var shipMaterial = new THREE.MeshBasicMaterial( { map: shipTexture, color: 0x979a9e } );
  }

  for (i = 0; i < 6; i++) {
    var shipGeometry = new THREE.BoxGeometry( getRandomInt( 450,450), 50, 70 );
    var ship = new THREE.Mesh( shipGeometry, shipMaterial );
    ship.position.set(shipArea1.x+getRandomInt(shipSpread*-1,shipSpread),shipArea1.y+getRandomInt(shipSpread*-1,shipSpread),shipArea1.z+getRandomInt(shipSpread*-1,shipSpread));
    ship.rotation.y = THREE.Math.degToRad( 35 );
    scene.add( ship );
  }

}
