// CREATE PLANET
function createPlanet(){

  if(!devMode){
    var planetTexture = new THREE.TextureLoader().load( "img/planetTexture.jpg" );
    var cloudTexture = new THREE.TextureLoader().load( "img/planetClouds.jpg" );
  }

  // ATMOSPHERE GLOW
  var atmosphereMaterial = new THREE.ShaderMaterial(
    {
        uniforms:
      {
        "c":   { type: "f", value: 1 },
        "p":   { type: "f", value: 2.0 },
        glowColor: { type: "c", value: new THREE.Color(0x5f94cf) },
        viewVector: { type: "v3", value: camera.position }
      },
      vertexShader:   atmosphereVertexShader,
      fragmentShader: atmosphereFragmentShader,
      side: THREE.FrontSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false
    }
);

  // ATMOSPHERE CLOUDS
  var planetAtmosphereCloudMaterial = new THREE.MeshLambertMaterial(
    {
      side: THREE.FrontSide,
      blending: THREE.AdditiveBlending,
      map: cloudTexture,
      opacity:1,
      transparent: true
    }
  )


  // PLANET
  var planetGeometry = new THREE.SphereGeometry(200000,64,64);
  var planetColor = parseInt ( getRandomColor().replace("#","0x"), 16 );
  var planetMaterials = [
  new THREE.MeshLambertMaterial( { opacity:1,
                                   //color: planetColor,
                                   map: planetTexture } )
  ];
  if(devMode){
    planet = new THREE.Mesh(planetGeometry, new THREE.MeshBasicMaterial({color: planetColor}));
    console.log('devMode active')
  } else {
    planet = new THREE.SceneUtils.createMultiMaterialObject(planetGeometry, planetMaterials);
  }
  planet.position.set(120000,-150000,-100000);
  planet.rotation.y = 100;
  scene.add(planet);

  // ATMOSPHERE
  planetAtmosphere = new THREE.Mesh( planetGeometry.clone(), atmosphereMaterial.clone() );
  planetAtmosphere.scale.multiplyScalar(1.01);
  planetAtmosphereClouds = new THREE.Mesh( planetGeometry.clone(), planetAtmosphereCloudMaterial.clone() );
  planetAtmosphereClouds.scale.multiplyScalar(1.005);
  planetAtmosphere.position.copy(planet.position);
  planetAtmosphereClouds.position.copy(planet.position);

  if(!devMode){
    scene.add(planetAtmosphere);
    scene.add(planetAtmosphereClouds);
  }



  // // create the mesh for the halo with AtmosphereMaterial
  // var geometry	= planetGeometry.clone()
  // THREEx.dilateGeometry(geometry, 0.5)
  // var material	= THREEx.createAtmosphereMaterial()
  // var meshHalo	= new THREE.Mesh(geometry, material );
  // meshHalo.position.set(120000,-150000,-100000);
  // meshHalo.scale.multiplyScalar(1.01);
  // //scene.add( meshHalo );
  // // possible customisation of AtmosphereMaterial
  // material.uniforms.glowColor.value	= new THREE.Color('cyan')
  // material.uniforms.coeficient.value	= 1.0
  // material.uniforms.power.value		= 1.8
}
