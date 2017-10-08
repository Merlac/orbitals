vertexShader = [
"varying vec3 vWorldPosition;",
"void main() {",
"  vec4 worldPosition = modelMatrix * vec4( position, 1.0 );",
"  vWorldPosition = worldPosition.xyz;",
"  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
"}",
].join("\n");

atmosphereVertexShader = [
"uniform vec3 viewVector;",
"uniform float c;",
"uniform float p;",
"varying float intensity;",
"void main() {",
"  vec3 vNormal = normalize( normalMatrix * normal );",
"  vec3 vNormel = normalize( normalMatrix * viewVector );",
"  intensity = pow( c - dot(vNormal, vNormel), p );",
"  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0);",
"}",
].join("\n");

fragmentShader = [
"uniform vec3 topColor;",
"uniform vec3 bottomColor;",
"uniform float offset;",
"uniform float exponent;",
"varying vec3 vWorldPosition;",
"void main() {",
"  float h = normalize( vWorldPosition + offset ).y;",
"  gl_FragColor = vec4( mix( bottomColor, topColor, max( pow( h, exponent ), 0.0 ) ), 1.0 );",
"}",
].join("\n");

atmosphereFragmentShader = [
"uniform vec3 glowColor;",
"varying float intensity;",
"void main() {",
"  vec3 glow = glowColor * intensity;",
"  gl_FragColor = vec4( glow, 1.0 );",
"}",
].join("\n");


// MAIN ANIMATION FUNCTION
function animate() {

  planet.rotation.y += 0.00006;
  planetAtmosphereClouds.rotation.y += 0.00003
  requestAnimationFrame( animate );
  controls.update();
  $( ".camerapos" ).html( "X: " + Math.round(camera.position.x) + ' / Y: ' + Math.round(camera.position.y) + ' / Z: ' + Math.round(camera.position.z));
  $( ".camerarot" ).html( "X: " + controls.target.x.toFixed(2) + ' / Y: ' + controls.target.y.toFixed(2) + ' / Z: ' + controls.target.z.toFixed(2));

  render();
}

// MAIN RENDER FUNCTION
function render() {
  // renderer.render( scene, camera );

  renderer.clear();
  renderer.render( scene, camera );

}


// FUNCTION FOR CREATING SKYBOX
function addSkybox() {
  var skyColor1 = getRandomColor();
  var skyColor2 = getRandomColor();
  console.log('Sky colors: ' + skyColor1 + ' / ' + skyColor2);

  var uniforms = {
      topColor: {type: "c", value: new THREE.Color(0x343e5c)},
      bottomColor: {type: "c", value: new THREE.Color(0x9db782)},
      // topColor: {type: "c", value: new THREE.Color(parseInt ( skyColor1.replace("#","0x"), 16 ))},
      // bottomColor: {type: "c", value: new THREE.Color(parseInt ( skyColor2.replace("#","0x"), 16 ))},
      offset: {type: "f", value: 400000}, exponent: {type: "f", value: 3}
  }
  var skyMaterial= new THREE.ShaderMaterial( {
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      uniforms: uniforms,
      side: THREE.BackSide
  } );
  var skyGeometry = new THREE.SphereGeometry(400000, 64, 64);
  var skyMesh = new THREE.Mesh(skyGeometry, skyMaterial);
  scene.add(skyMesh);
}


// FUNCTION FOR RANDOM HEX COLOR
function getRandomColor() {
    var color = '#' + Math.floor(Math.random()*16777215).toString(16);
    return color;
}


function addLights(){
  scene.add( new THREE.AmbientLight( 0x404040, 3 ) );
}
