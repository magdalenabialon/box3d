var camera, scene, renderer;
var mesh; //cube
var material;


var texture1 = THREE.ImageUtils.loadTexture( 'js.jpg' );
var texture2 = THREE.ImageUtils.loadTexture( "feature.jpg" );
var texture3 = THREE.ImageUtils.loadTexture( "programming-or-googling.jpg" );


init();
animate();



function init() {

  camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
  camera.position.z = 200;
  scene = new THREE.Scene();



  // var ambient = new THREE.AmbientLight( 0x444444 );
	// scene.add( ambient );

	// var directionalLight = new THREE.DirectionalLight( 0xffeedd );
	// directionalLight.position.set( 0, 0, 2 ).normalize();
	// scene.add( directionalLight );



  //var texture = new THREE.TextureLoader().load( 'http://3.bp.blogspot.com/_5ke3OeOEo0g/TLnFQf5KHhI/AAAAAAAACp4/qJuSAwYdcW0/s1600/1_store.jpg' );
  // var usertext1 = new THREE.TextureLoader().load( 'js.jpg' );
  // var usertext2 = new THREE.TextureLoader().load( 'feature.jpg' );
  // var usertext3 = new THREE.TextureLoader().load( 'programming-or-googling.jpg' );

  var geometry = new THREE.BoxBufferGeometry( 50, 50, 50 );
  material = new THREE.MeshBasicMaterial( { map: texture3 } );


  mesh = new THREE.Mesh( geometry, material );
  scene.add( mesh );


  var onProgress = function ( xhr ) {
    if ( xhr.lengthComputable ) {
      var percentComplete = xhr.loaded / xhr.total * 100;
      console.log( Math.round(percentComplete, 2) + '% downloaded' );
    }
  };

  var onError = function ( xhr ) { };


    THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );

    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setPath( '/' );
    mtlLoader.load( 'mesh-box.mtl', function( materials ) {

      materials.preload();
      //
      // var objLoader = new THREE.OBJLoader();
      // objLoader.setMaterials( materials );
      // objLoader.setPath( '/' );
      // objLoader.load( 'male02.obj', function ( object ) {
      //
      //   object.position.y = - 95;
      //   scene.add( object );
      //
      // }, onProgress, onError );

  });




  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  //

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.25;
  controls.enableZoom = false;

  window.addEventListener( 'resize', onWindowResize, true );

}




function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );

}




function animate() {

  requestAnimationFrame( animate );

  // mesh.rotation.x += 0.005;
  // mesh.rotation.y += 0.01;

  renderer.render( scene, camera );

}


// window.addEventListener('mousemove', function (e) {
//   var mouseX = ( e.clientX - window.innerWidth / 2 );
//   var mouseY = ( e.clientY - window.innerHeight / 2 );
//   mesh.rotation.x = mouseY * 0.005;
//   mesh.rotation.y = mouseX * 0.005;
//
//   renderer.render( scene, camera );
// }, false);



// event listener to scale and move box
// document.addEventListener('click', function() {
//   mesh.scale.x += .2;
//   mesh.position.x += 20;
//   console.log(mesh);
// });


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
  }else if (clickedTexture === 'texture3'){
    material.map = texture3;
    material.needsUpdate = true;
  }

})
