//https://manu.ninja/webgl-3d-model-viewer-using-three-js


var camera, scene, renderer;
var material, mesh; //cube
var lighting, ambient, keyLight, fillLight, backLight;
var geometry;

//textures
var texture1 = THREE.ImageUtils.loadTexture( 'js.jpg' );
var texture2 = THREE.ImageUtils.loadTexture( "feature.jpg" );
var texture3 = THREE.ImageUtils.loadTexture( "programming-or-googling.jpg" );


init();
animate();



function init() {

  camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 5, 1200 );
  camera.position.z = 200;
  // camera.focus
  scene = new THREE.Scene();



//light on L key

  lighting = true;

  ambient = new THREE.AmbientLight(0xffffff, 1.25);
  scene.add(ambient);

  keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(80, 100%, 75%)'), 1.0);
  keyLight.position.set(-100, 0, 100);

  fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(100, 100%, 75%)'), 0.75);
  fillLight.position.set(100, 0, 100);

  backLight = new THREE.DirectionalLight(0xffffff, 3.0);
  backLight.position.set(100, 0, -100).normalize();





  geometry = new THREE.BoxBufferGeometry( 15, 15, 15 );

  material = new THREE.MeshStandardMaterial( { map: texture3 } );

  mesh = new THREE.Mesh( geometry, material );
  scene.add( mesh );



//ground
  var groundGeo = new THREE.PlaneBufferGeometry( 100, 100 );
  var groundMat = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0x050505 } );
  groundMat.color.setHSL( 0.095, 1, 0.75 );

  var ground = new THREE.Mesh( groundGeo, groundMat );
  ground.rotation.x = -Math.PI/2;
  ground.position.y = -30;
  scene.add( ground );

  ground.receiveShadow = true;

  //trying to add different shape than the cube

  // /* Model */
  //
  // var mtlLoader = new THREE.MTLLoader();
  // mtlLoader.setBaseUrl('/');
  // mtlLoader.setPath('/');
  // mtlLoader.load('box.mtl', function (materials) {
  //
  //     // materials.preload();
  //     //
  //     // materials.materials.default.map.magFilter = THREE.NearestFilter;
  //     // materials.materials.default.map.minFilter = THREE.LinearFilter;
  //
  //     var objLoader = new THREE.OBJLoader();
  //     // objLoader.setMaterials(materials);
  //     objLoader.setPath('/');
  //     objLoader.load('box.obj', function (object) {
  //
  //         geometry = object
  //     });
  //
  // });


  /* Model */
  //
  // var mtlLoader = new THREE.MTLLoader();
  // mtlLoader.setBaseUrl('/');
  // mtlLoader.setPath('/');
  // mtlLoader.load('box.mtl', function (materials) {
  //
  //     materials.preload();

      // materials.materials.default.map.magFilter = THREE.NearestFilter;
      // materials.materials.default.map.minFilter = THREE.LinearFilter;

      // var objLoader = new THREE.OBJLoader();
      // // objLoader.setMaterials(materials);
      // objLoader.setPath('/');
      // var material = new THREE.MeshBasicMaterial( { map: texture3 } );
      // console.log(objLoader.setMaterials(material));
      // objLoader.load('box.obj', function (object) {
      //     // mesh = new THREE.Mesh( object, material );
      //     scene.add( object );
      //     // scene.add( object, material );
      // });
  //
  // });




  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  //

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.25;
  controls.enableZoom = true;

  window.addEventListener( 'resize', onWindowResize, true );

}




function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );

}

function onKeyboardEvent(e) {

        if (e.code === 'KeyL') {
            // console.log('yes');
            lighting = !lighting;

            if (lighting) {

                ambient.intensity = 2.25;
                scene.add(keyLight);
                scene.add(fillLight);
                scene.add(backLight);

            } else {

                ambient.intensity = 1.0;
                scene.remove(keyLight);
                scene.remove(fillLight);
                scene.remove(backLight);

            }

        }

    }





function animate() {

  requestAnimationFrame( animate );

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
  } else if (clickedTexture === 'texture3'){
    material.map = texture3;
    material.needsUpdate = true;
  }

})

window.addEventListener('keydown', onKeyboardEvent, false);
