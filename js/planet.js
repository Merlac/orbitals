// PLANET

function createPlanet(){
  var planetGeometry = new THREE.SphereGeometry(200000,32,32);
  var planetColor = parseInt ( getRandomColor().replace("#","0x"), 16 );
  console.log('Planet color: ' + planetColor);
  var planetMaterials = [
  new THREE.MeshLambertMaterial( { opacity:0.9,
                                   color: planetColor,
                                   transparent:true } ),
  new THREE.MeshBasicMaterial( { color: 0xffffff,
                                   wireframe: true } )
  ];
  //var planetMaterial = new THREE.MeshBasicMaterial({color: planetColor, wireframe: true});
  planet = new THREE.SceneUtils.createMultiMaterialObject(planetGeometry, planetMaterials);
  planet.position.set(120000,-150000,-100000);
  scene.add(planet);
}
