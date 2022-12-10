var camera, scene, renderer;
var image;

init();
animate();

//add textureloader

function init() {

  renderer = new THREE.WebGLRenderer( {alpha: true});
	renderer.setSize(window.innerWidth/2, window.innerWidth/2);
  renderer.setPixelRatio(2);
	document.body.appendChild( renderer.domElement );

	scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xffd663 );

  camera = new THREE.OrthographicCamera( -10, 10, 10,  -10, -10, 10); 
  
  var texture = new THREE.TextureLoader().load( 'https://s33.postimg.cc/zaty10vot/out.png' );
  var texture2 = new THREE.TextureLoader().load( 'https://s33.postimg.cc/x69kzy9hp/middle.png' );

	var material = new THREE.MeshBasicMaterial( {
		map: texture
	} );
  
  	var material2 = new THREE.MeshBasicMaterial( {
		map: texture2
	} );

  material.transparent = true;
  material2.transparent = true;

	var geometry = new THREE.SphereGeometry(9.98, 50, 50 );
  mesh = new THREE.Mesh( geometry, material);
  
  var geometry2 = new THREE.SphereGeometry( 10, 50, 50 );
  mesh2 = new THREE.Mesh( geometry2, material2);

  scene.add( mesh2 );
  scene.add( mesh );
}

function animate() {
	requestAnimationFrame( animate );
	render();
}

function render() {
	renderer.render( scene, camera );
  mesh2.rotation.y -=0.02;
  mesh.rotation.y +=0.01;
}

 $(document).on("mousemove touchmove touchstart", function( e ) {

  e.preventDefault();     
  pos = (((360*(event.pageX - window.innerWidth/2)/window.innerWidth)* Math.PI / 180)) - Math.PI/2;
  
  pos2 = ((360*(event.pageY - window.innerHeight/2)/window.innerHeight)* Math.PI / 180) - Math.PI/2;
     
  mesh2.rotation.y=-pos - Math.PI;
  mesh.rotation.y=pos;

  mesh2.rotation.x=pos2/10;
  mesh.rotation.x=pos2/10;
 });