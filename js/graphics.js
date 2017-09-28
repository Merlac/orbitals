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

  requestAnimationFrame( animate );
  controls.update();
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
  var uniforms = {
      topColor: {type: "c", value: new THREE.Color(0xdb4a13)},
      bottomColor: {type: "c", value: new THREE.Color(0x560b09)},
      offset: {type: "f", value: 200000}, exponent: {type: "f", value: 4}
  }
  var skyMaterial= new THREE.ShaderMaterial( {
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      uniforms: uniforms,
      side: THREE.DoubleSide
  } );
  var skyGeometry = new THREE.SphereGeometry(200000, 256, 256);
  var skyMesh = new THREE.Mesh(skyGeometry, skyMaterial);
  scene.add(skyMesh);
}
