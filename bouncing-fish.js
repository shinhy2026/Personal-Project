//THREEJS RELATED VARIABLES 

var scene, 
    camera,
    controls,
    fieldOfView,
  	aspectRatio,
  	nearPlane,
  	farPlane,
    shadowLight, 
    backLight,
    light, 
    renderer,
		container;

//SCENE


//SCREEN VARIABLES

var HEIGHT,
  	WIDTH,
    windowHalfX,
  	windowHalfY,
    mousePos = {x:0,y:0};

//INIT THREE JS, SCREEN AND MOUSE EVENTS

function init(){
  scene = new THREE.Scene();
  scene.fog = new THREE.Fog( 0x363d3d, -1, 3000 );
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;
  aspectRatio = WIDTH / HEIGHT;
  fieldOfView = 60;
  nearPlane = 1;
  farPlane = 2000; 
  camera = new THREE.PerspectiveCamera(
    fieldOfView,
    aspectRatio,
    nearPlane,
    farPlane);
  camera.position.z = 800;  
  camera.position.y = 300;
  camera.lookAt(new THREE.Vector3(0,0,0));    
  renderer = new THREE.WebGLRenderer({alpha: true, antialias: true });
  renderer.setSize(WIDTH, HEIGHT);
  renderer.shadowMapEnabled = true;
  container = document.getElementById('world');
  container.appendChild(renderer.domElement);
  windowHalfX = WIDTH / 2;
  windowHalfY = HEIGHT / 2;
  window.addEventListener('resize', onWindowResize, false);
  document.addEventListener('mousemove', handleMouseMove, false);
  document.addEventListener('mousedown', handleMouseDown, false);
  document.addEventListener('mouseup', handleMouseUp, false);
  document.addEventListener('touchstart', handleTouchStart, false);
	document.addEventListener('touchend', handleTouchEnd, false);
	document.addEventListener('touchmove',handleTouchMove, false);
  //*
  controls = new THREE.OrbitControls( camera, renderer.domElement);
  //*/
}

function onWindowResize() {
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;
  windowHalfX = WIDTH / 2;
  windowHalfY = HEIGHT / 2;
  renderer.setSize(WIDTH, HEIGHT);
  camera.aspect = WIDTH / HEIGHT;
  camera.updateProjectionMatrix();
}

function handleMouseMove(event) {
  mousePos = {x:event.clientX, y:event.clientY};
}

function handleMouseDown(event) {
  //
}
function handleMouseUp(event) {
  //
}

function handleTouchStart(event) {
  if (event.touches.length > 1) {
    event.preventDefault();
		mousePos = {x:event.touches[0].pageX, y:event.touches[0].pageY};
  }
}

function handleTouchEnd(event) {
    mousePos = {x:windowHalfX, y:windowHalfY};
}

function handleTouchMove(event) {
  if (event.touches.length == 1) {
    event.preventDefault();
		mousePos = {x:event.touches[0].pageX, y:event.touches[0].pageY};
  }
}

function createLights() {
  light = new THREE.HemisphereLight(0xffffff, 0xffffff, .5)
  
  shadowLight = new THREE.DirectionalLight(0xffffff, 0.8);
  shadowLight.position.set(200, 200, 200);
  shadowLight.castShadow = true;
  shadowLight.shadowDarkness = .2;
 	
  backLight = new THREE.DirectionalLight(0xffffff, 0.4);
  backLight.position.set(-100, 200, 50);
  backLight.shadowDarkness = .2;
  backLight.castShadow = true;
 	
  scene.add(backLight);
  scene.add(light);
  scene.add(shadowLight);
}

function createFishes(){
  fish = new Fish();
  scene.add(fish.threegroup);
  
}

Fish = function(){
  this.threegroup = new THREE.Group();
  this.whiteMat = new THREE.MeshLambertMaterial ({
    color: 0xffffff, 
    shading:THREE.FlatShading
  });
  
  this.blackMat = new THREE.MeshLambertMaterial ({
    color: 0x000000, 
    shading:THREE.FlatShading
  });
  
  this.greyMat = new THREE.MeshLambertMaterial ({
    color: 0x999999, 
    shading:THREE.FlatShading
  });
  
  this.pinkMat = new THREE.MeshLambertMaterial ({
    color: 0xfaa288, 
    shading:THREE.FlatShading
  });
  
  this.greenMat = new THREE.MeshLambertMaterial ({
    color: 0x6ec098, 
    shading:THREE.FlatShading
  });
  
  this.orangeMat = new THREE.MeshLambertMaterial ({
    color: 0xef704f, 
    shading:THREE.FlatShading
  });
  
  this.yellowMat = new THREE.MeshLambertMaterial ({
    color: 0xd7a25e, 
    shading:THREE.FlatShading
  });
  
  this.wireMat = new THREE.LineBasicMaterial ({
    color:0xffffff,
    linewidth:1,
    fog : true
  });
  
  var bodyGeom = new THREE.BoxGeometry(100, 100, 100);
  var spotGeom = new THREE.BoxGeometry(20,20, 20);
  var tailGeom  = new THREE.BoxGeometry(0,95, 85);
  tailGeom.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0, -20 ) );
  var faceGeom  = new THREE.BoxGeometry(100,100, 100);
  var ringGeom = new THREE.TorusGeometry(200, 3, 4, 4)
  var ringGeom2 = new THREE.TorusGeometry(40, 3, 4, 4)
  
  var wireGeom = new THREE.Geometry();
  wireGeom.vertices.push(
    new THREE.Vector3( 0, 0, 0 ),
    new THREE.Vector3( 0, 2000, 0 )
  );
  
  
  this.body = new THREE.Mesh(bodyGeom, this.pinkMat);
  
  // SPOTS
  
  this.spot1 = new THREE.Mesh(spotGeom, this.blackMat);
  this.spot1.position.y = 41;
  this.spot1.position.x = 41;
  this.spot1.position.z = 25;
  
  this.spot2 = new THREE.Mesh(spotGeom, this.blackMat);
  this.spot2.scale.set(2,2,2);
  this.spot2.position.y = 31;
  this.spot2.position.x = -31;
  this.spot2.position.z = -31;
  
  this.spot3 = new THREE.Mesh(spotGeom, this.blackMat);
  this.spot3.scale.set(2.5,2.5,2.5);
  this.spot3.position.y = -26;
  this.spot3.position.x = 26;
  this.spot3.position.z = 26;
  
  this.spot4 = new THREE.Mesh(spotGeom, this.blackMat);
  this.spot4.position.y = -41;
  this.spot4.position.x = 41;
  this.spot4.position.z = -41;
  
  // TAIL
  
  this.tail = new THREE.Mesh( tailGeom, this.whiteMat);
  this.tail.position.y = 0;
  this.tail.position.z = -40;
  
  // FACE
  
  this.face = new THREE.Mesh(faceGeom, this.pinkMat);
  this.face.position.z = 100;
  
  // EYES
  
  this.leftEye = new THREE.Mesh(spotGeom, this.whiteMat);
  this.leftEye.scale.set(1,2.5,2.5);
  this.leftEye.position.x = 41;
  this.leftEye.position.y = 26;
  this.leftEye.position.z = 100;
  
  this.rightEye = this.leftEye.clone();
  this.rightEye.position.x = -41;
  
  // IRIS
  
  this.leftIris = new THREE.Mesh(spotGeom, this.blackMat);
  this.leftIris.scale.set(.5,.5,.5);
  this.leftIris.position.x = 50;
  this.leftIris.position.y = 26;
  this.leftIris.position.z = 110;
  
  this.rightIris = this.leftIris.clone();
  this.leftIris.position.x = -50;
  
  // FINS
  
  this.leftFin = new THREE.Mesh(spotGeom, this.whiteMat);
  this.leftFin.scale.set(1, 3, 4.5);
  this.leftFin.position.x = 60;
  this.leftFin.position.y = 40;
  this.leftFin.position.z = 20;
  
  this.rightFin = this.leftFin.clone();
  this.leftFin.position.x = -60;
  
  // MOUTH
  this.mouth = new THREE.Mesh(spotGeom, this.blackMat);
  this.mouth.scale.set(1,1,1);
  this.mouth.position.y = -40;
  this.mouth.position.z = 141;
  
  // LIPS
  this.lips = new THREE.Mesh(spotGeom, this.pinkMat);
  this.lips.scale.set(2,.5,1);
  this.lips.position.y = -55;
  this.lips.position.z = 140;
  
  // RINGS
  this.ring1 = new THREE.Mesh(ringGeom, this.yellowMat);
  this.ring1.position.y = 0;
  this.ring1.position.z = 0;
  this.ring1.rotation.x = -Math.PI/8;
  
  this.ring2 = new THREE.Mesh(ringGeom, this.orangeMat);
  this.ring2.scale.set(1.3,1.3,1.3);
  this.ring2.position.y = 0;
  this.ring2.position.z = 25;
  this.ring2.rotation.x = -Math.PI/8;
  
  this.ring3 = new THREE.Mesh(ringGeom, this.greenMat);
  this.ring3.position.y = 0;
  this.ring3.position.z = 50;
  this.ring3.rotation.x = -Math.PI/8;
  
  this.ring4 = new THREE.Mesh(ringGeom2, this.yellowMat);
  this.ring4.position.y = 80;
  this.ring4.position.z = 100;
  this.ring4.rotation.x = -Math.PI/2;
  
  // WIRE
  this.wire = new THREE.Line(wireGeom, this.wireMat);
  this.wire.position.z = 50;
  
  this.threegroup.add(this.body);
  this.threegroup.add(this.spot1);
  this.threegroup.add(this.spot2);
  this.threegroup.add(this.spot3);
  this.threegroup.add(this.spot4);
  this.threegroup.add(this.tail);
  this.threegroup.add(this.face);
  this.threegroup.add(this.nostril1);
  this.threegroup.add(this.nostril2);
  this.threegroup.add(this.leftEye);
  this.threegroup.add(this.rightEye);
  this.threegroup.add(this.leftIris);
  this.threegroup.add(this.rightIris);
  this.threegroup.add(this.leftFin);
  this.threegroup.add(this.rightFin);
  this.threegroup.add(this.leftHorn);
  this.threegroup.add(this.rightHorn);
  this.threegroup.add(this.mouth);
  this.threegroup.add(this.lips);
  this.threegroup.add(this.ring1);
  this.threegroup.add(this.ring2);
  this.threegroup.add(this.ring3);
  this.threegroup.add(this.ring4);
  this.threegroup.add(this.wire);
  
  this.threegroup.traverse( function ( object ) {
		if ( object instanceof THREE.Mesh ) {
			object.castShadow = true;
			object.receiveShadow = true;
		}
	} );
}

Fish.prototype.blink = function(){
  TweenMax.to(this.leftEye.scale, .3, {y:0, ease:Strong.easeInOut, yoyo:true, repeat:3});
  
  TweenMax.to(this.rightEye.scale, .3, {y:0, ease:Strong.easeInOut, yoyo:true, repeat:3});
  
  TweenMax.to(this.leftIris.scale, .3, {y:0, ease:Strong.easeInOut, yoyo:true, repeat:3});
  TweenMax.to(this.rightIris.scale, .3, {y:0, ease:Strong.easeInOut, yoyo:true, repeat:3});
}

var angleLegs = 0;

function loop(){
  angleLegs += .2;
  var sin = Math.sin(angleLegs);
  var cos = Math.cos(angleLegs);
  
  render();
  fish.threegroup.rotation.y +=0.01;
  
  fish.ring1.rotation.z += .005;
  fish.ring2.rotation.z -= .005;
  fish.ring3.rotation.z += .01;
  fish.ring4.rotation.z += .1;
  
  fish.threegroup.position.y = cos*10;
  
  fish.leftFin.position.y = fish.rightFin.position.y = 5 + Math.sin(angleLegs)*5;
  fish.mouth.position.y = -40 + sin*5;
  fish.mouth.scale.set(1, .5 + Math.abs(cos)*.5, 1);
  fish.lips.position.y = -50 + sin*5;
  fish.tail.rotation.x = sin*Math.PI/4;
  fish.ring4.position.y = 80 + sin*10;
  requestAnimationFrame(loop);
}

function render(){
  if (controls) controls.update();
  renderer.render(scene, camera);
}

init();
createLights();
createFishes();
loop();
fish.blink();
blinkInterval = setInterval(function(){
  fish.blink();
}, 4000);