function addShips(){
  var shipTexture = new THREE.TextureLoader().load( "img/shipTexture.png" );
  var shipMaterial = new THREE.MeshBasicMaterial( { map: shipTexture, color: 0x979a9e } );

  for (i = 0; i < 6; i++) {
    var shipGeometry = new THREE.BoxGeometry( getRandomInt( 50,250), 50, 70 );
    var ship = new THREE.Mesh( shipGeometry, shipMaterial );
    ship.position.set(700+getRandomInt(-600,600),800+getRandomInt(-600,600),17000+getRandomInt(-600,600));
    ship.rotation.y = THREE.Math.degToRad( 115 );
    scene.add( ship );
  }

}
