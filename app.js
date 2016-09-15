//https://manu.ninja/webgl-3d-model-viewer-using-three-js


var camera, scene, renderer;
var material, mesh; //cube
var lighting, ambient, keyLight, fillLight, backLight;
var geometry;
var meshBox;

var material1, material2, material3, material4;

var lambert = new THREE.MeshLambertMaterial({color: 0xffffff, map: texture3})


//textures
var texture1 = THREE.ImageUtils.loadTexture( 'js.jpg' );
var texture2 = THREE.ImageUtils.loadTexture( "feature.jpg" );
var texture3 = THREE.ImageUtils.loadTexture( "programming-or-googling.jpg" );


init();
animate();



function init() {

  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 5, 1000 );
  camera.position.z = 10;
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




//BASIC CUBE
  geometry = new THREE.BoxBufferGeometry( 2, 2, 2 );
  material = new THREE.MeshStandardMaterial( { map: texture3 } );

  mesh = new THREE.Mesh( geometry, material );
  scene.add( mesh );



//OBJ BOX

material1 = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true } );
// material2 = new THREE.MeshStandardMaterial( { map: texture1 } );
material3 = new THREE.MeshPhongMaterial( { color: 0x00ff00 } );
// material4 = new THREE.MeshStandardMaterial( { map: texture3, overdraw: 0.5 } );
var material5 = new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'feature.jpg' ) } ) ;
material4 = new THREE.MeshStandardMaterial();


  var loader = new THREE.OBJLoader();
  loader.load( 'box.obj', function ( object ) {
    // object.scale = new THREE.Vector3( 25, 25, 25 );

    object.position.x -= 2.2;
    object.position.y += 2.8;

    object.scale.x = 1;
    object.scale.y = 1;
    object.scale.z = 1;

    var texture = THREE.ImageUtils.loadTexture('js.jpg');
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

    texture.repeat.set(2,2);

    var material4 = new THREE.MeshStandardMaterial({
      map: texture
    });

    object.traverse( function(child) {
      if (child instanceof THREE.Mesh){
        child.material.map = texture
      }
    })

    // object.material = material4;

    // debugger
    // material4.map = loader.load('feature.jpg');

    // debugger

    // material4.map.wrapS = THREE.RepeatWrapping;

    // scene.add( object );
    //
    //
    // // meshBox = new THREE.Mesh( material );
    //
    // object.traverse(function(child) {
    //     if (child instanceof THREE.Mesh){
    //         child.material = material5;
    //         // myMesh = child;
    //         // // myMesh.material.map = THREE.ImageUtils.loadTexture( 'js.jpg');
    //         // myMesh.material.needsUpdate = true;
    //     }
    // });
    scene.add( object );

  } );







//ground
  var groundGeo = new THREE.PlaneBufferGeometry( 20, 20 );
  var groundMat = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0x050505 } );
  groundMat.color.setHSL( 0.095, 1, 0.75 );

  var ground = new THREE.Mesh( groundGeo, groundMat );
  ground.rotation.x = -Math.PI/2;
  ground.position.y = -5;
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
