// if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var camera, scene, renderer, dirLight, hemiLight;
var mixers = [];
var stats;

var clock = new THREE.Clock();


var material, mesh;

//textures
var texture1 = THREE.ImageUtils.loadTexture( 'js.jpg' );
var texture2 = THREE.ImageUtils.loadTexture( "feature.jpg" );
var texture3 = THREE.ImageUtils.loadTexture( "programming-or-googling.jpg" );





init();
animate();

function init() {

  var container = document.getElementById( 'container' );

  camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 5000 );
  camera.position.set( 0, 0, 250 );

  scene = new THREE.Scene();

  scene.fog = new THREE.Fog( 0xffffff, 1, 5000 );
  scene.fog.color.setHSL( 0.6, 0, 1 );




  // LIGHTS

  hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
  hemiLight.color.setHSL( 0.6, 1, 0.6 );
  hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
  hemiLight.position.set( 0, 500, 0 );
  scene.add( hemiLight );

  //

  dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
  dirLight.color.setHSL( 0.1, 1, 0.95 );
  dirLight.position.set( -1, 1.75, 1 );
  dirLight.position.multiplyScalar( 50 );
  scene.add( dirLight );

  dirLight.castShadow = true;

  dirLight.shadowMapWidth = 2048;
  dirLight.shadowMapHeight = 2048;

  var d = 50;

  dirLight.shadowCameraLeft = -d;
  dirLight.shadowCameraRight = d;
  dirLight.shadowCameraTop = d;
  dirLight.shadowCameraBottom = -d;

  dirLight.shadowCameraFar = 3500;
  dirLight.shadowBias = -0.0001;
  //dirLight.shadowCameraVisible = true;





  // GROUND

  var groundGeo = new THREE.PlaneBufferGeometry( 10000, 10000 );
  var groundMat = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0x050505 } );
  groundMat.color.setHSL( 0.095, 1, 0.75 );

  var ground = new THREE.Mesh( groundGeo, groundMat );
  ground.rotation.x = -Math.PI/2;
  ground.position.y = -33;
  scene.add( ground );

  ground.receiveShadow = true;



  // SKYDOME

  var vertexShader = document.getElementById( 'vertexShader' ).textContent;
  var fragmentShader = document.getElementById( 'fragmentShader' ).textContent;
  var uniforms = {
    topColor:    { value: new THREE.Color( 0x0077ff ) },
    bottomColor: { value: new THREE.Color( 0xffffff ) },
    offset:      { value: 33 },
    exponent:    { value: 0.6 }
  };
  uniforms.topColor.value.copy( hemiLight.color );

  scene.fog.color.copy( uniforms.bottomColor.value );

  var skyGeo = new THREE.SphereGeometry( 4000, 32, 15 );
  var skyMat = new THREE.ShaderMaterial( { vertexShader: vertexShader, fragmentShader: fragmentShader, uniforms: uniforms, side: THREE.BackSide } );

  var sky = new THREE.Mesh( skyGeo, skyMat );
  scene.add( sky );





  // MODEL

  // var loader = new THREE.JSONLoader();
  //
  // loader.load( "models/animated/flamingo.js", function( geometry ) {
  //
  //   var material = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0xffffff, shininess: 20, morphTargets: true, vertexColors: THREE.FaceColors, shading: THREE.FlatShading } );
  //   var mesh = new THREE.Mesh( geometry, material );
  //
  //   var s = 0.35;
  //   mesh.scale.set( s, s, s );
  //   mesh.position.y = 15;
  //   mesh.rotation.y = -1;
  //
  //   mesh.castShadow = true;
  //   mesh.receiveShadow = true;
  //
  //   scene.add( mesh );
  //
  //   var mixer = new THREE.AnimationMixer( mesh );
  //   mixer.clipAction( geometry.animations[ 0 ] ).setDuration( 1 ).play();
  //   mixers.push( mixer );
  //
  // } );


//CUBE

  var texture3 = THREE.ImageUtils.loadTexture( "programming-or-googling.jpg" );

    var geometry = new THREE.BoxBufferGeometry( 50, 50, 50 );
    material = new THREE.MeshStandardMaterial( { map: texture3 } );
    mesh = new THREE.Mesh( geometry, material );
    var s = 0.35;
    mesh.scale.set( s, s, s );
    mesh.position.y = 15;
    mesh.rotation.y = -1;

    mesh.castShadow = true;
    mesh.receiveShadow = true;

    scene.add( mesh );






  // RENDERER

  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setClearColor( scene.fog.color );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( renderer.domElement );

  renderer.gammaInput = true;
  renderer.gammaOutput = true;

  renderer.shadowMap.enabled = true;
  renderer.shadowMap.renderReverseSided = false;

  // STATS
  //
  // stats = new Stats();
  // container.appendChild( stats.dom );

  //

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.25;
  controls.enableZoom = true;

  window.addEventListener( 'resize', onWindowResize, false );
  document.addEventListener( 'keydown', onKeyDown, false );

}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}

function onKeyDown ( event ) {

  switch ( event.keyCode ) {

    case 72: // h

    hemiLight.visible = !hemiLight.visible;
    break;

    case 68: // d

    dirLight.visible = !dirLight.visible;
    break;

  }

}

//

function animate() {

  requestAnimationFrame( animate );

  render();
  // stats.update();

}

function render() {

  var delta = clock.getDelta();

  //controls.update();

  for ( var i = 0; i < mixers.length; i ++ ) {

    mixers[ i ].update( delta );

  }

  renderer.render( scene, camera );

}





// CHANGE TEXTURE / IMAGES

var inputOne = document.getElementsByTagName('input')[0];
var inputTwo = document.getElementsByTagName('input')[1];
var inputThree = document.getElementsByTagName('input')[2];

var sizeBtn = document.getElementById('changeSizeBtn');

sizeBtn.addEventListener('click', function() {
  mesh.scale.x = Number(inputOne.value)
  mesh.scale.y = Number(inputTwo.value)
  mesh.scale.z = Number(inputThree.value);
});



$('button').click(function(event){
console.log('works');
// debugger
var clickedTexture = $(this).text()
if(clickedTexture === 'texture1'){
  material.map = texture1;
  material.needsUpdate = true;
} else if (clickedTexture === 'texture2'){
  material.map = texture2;
  material.needsUpdate = true;
} else if (clickedTexture === 'texture3'){
  material.map = texture3;
  material.needsUpdate = true;
}

})


window.addEventListener('keydown', onKeyboardEvent, false);




//light on L key

  lighting = true;

  ambient = new THREE.AmbientLight(0xffffff, 0.25);
  scene.add(ambient);

  keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(80, 100%, 75%)'), 1.0);
  keyLight.position.set(-100, 0, 100);

  fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(100, 100%, 75%)'), 0.75);
  fillLight.position.set(100, 0, 100);

  backLight = new THREE.DirectionalLight(0xffffff, 3.0);
  backLight.position.set(100, 0, -100).normalize();



function onKeyboardEvent(e) {

        if (e.code === 'KeyL') {
            // console.log('yes');
            lighting = !lighting;

            if (lighting) {

                ambient.intensity = 0.55;
                scene.add(keyLight);
                scene.add(fillLight);
                scene.add(backLight);

            } else {

                ambient.intensity = 0.10;
                scene.remove(keyLight);
                scene.remove(fillLight);
                scene.remove(backLight);

            }

        }

  }
