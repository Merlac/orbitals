// PLANET



// CREATE PLANET
function createPlanet(){
  var planetGeometry = new THREE.SphereGeometry(200000,64,64);
  var planetColor = parseInt ( getRandomColor().replace("#","0x"), 16 );
  console.log('Planet color: ' + planetColor);
  var planetMaterials = [
  new THREE.MeshLambertMaterial( { opacity:1,
                                   color: planetColor,
                                   transparent:true } ),
  new THREE.MeshBasicMaterial( { color: 0xffffff,
                                   wireframe: true } )
  ];
  //var planetMaterial = new THREE.MeshBasicMaterial({color: planetColor, wireframe: true});
  planet = new THREE.SceneUtils.createMultiMaterialObject(planetGeometry, planetMaterials);
  planet.position.set(120000,-150000,-100000);
  scene.add(planet);

  // create the mesh for the halo with AtmosphereMaterial
  var geometry	= planetGeometry.clone()
  THREEx.dilateGeometry(geometry, 0.5)
  var material	= THREEx.createAtmosphereMaterial()
  var meshHalo	= new THREE.Mesh(geometry, material );
  meshHalo.position.set(120000,-150000,-100000);
  meshHalo.scale.multiplyScalar(1.01);
  scene.add( meshHalo );
  // possible customisation of AtmosphereMaterial
  material.uniforms.glowColor.value	= new THREE.Color('cyan')
  material.uniforms.coeficient.value	= 1.1
  material.uniforms.power.value		= 1.8
}
