var gl;//Rendering context
var renderer;//Handles rendering of graphics
var keyboard;//Handles keyboard input
var shaderPrograms = []; //Container for shader programs created
var shader;//Shader program object
var shaderName;
var	textures = [];
var textureName;

//Starts the rendering loop if there's a least one shader programm
//created
function start()
{
	worldMatrix = new Float32Array(16);
	mat4.identity(worldMatrix);

	identityMatrix = new Float32Array(16);
	mat4.identity(identityMatrix);
	angle = 0;
	skyTexture = textures['blue_sky'];
	shader = shaderPrograms['triangle'];
	triangle = new Triangle(gl, renderer.ext, shader.programID);
	triangle.init();
	gl.enable(gl.DEPTH_TEST);
	last = Date.now();
	renderLoop(last);
}

//Render loop
var renderLoop = function(last){
	let velocity = -1.25, scale = 1e-12;
	let current = Date.now();
	renderer.deltaTime = (current - last) * scale;
	angle +=  velocity * renderer.deltaTime;
	last = current;
	let cameraSpeed = 0.001;
	let camFront = renderer.cam.Front;
	
	if(keyboard.buttons['W']){
		camFront.scalarMultiply(cameraSpeed);
		renderer.cam.Position = vector.add(renderer.cam.Position, camFront);
	}
	if(keyboard.buttons['S']){
		camFront.scalarMultiply(cameraSpeed);
		renderer.cam.Position = vector.subtract(renderer.cam.Position, camFront);
	}
	if(keyboard.buttons['A']){
		let temp = vector.cross(renderer.cam.Front, renderer.cam.Up).normalize();
		temp.scalarMultiply(cameraSpeed);
		renderer.cam.Position = vector.subtract(renderer.cam.Position, temp);
	}
	if(keyboard.buttons['D']){
		let temp = vector.cross(renderer.cam.Front, renderer.cam.Up).normalize();
		temp.scalarMultiply(cameraSpeed);
		renderer.cam.Position = vector.add(renderer.cam.Position, temp);
	}

	renderer.update();
	triangle.update(angle);

	shader.use();
	triangle.setMatrixUniforms(shader);
	shader.setMatrixUniform('mView',renderer.cam.viewMatrix);
	shader.setMatrixUniform('mProj', renderer.projectionMatrix);
	skyTexture.bind(gl.TEXTURE0);
	shader.setTextureUniform('uSampler', 0);

	renderer.renderStart();
	triangle.draw();
	skyTexture.unbind();
	
	requestAnimationFrame(renderLoop);
};

//Called when body of HTML document has been loaded
function init(){
	console.log('Running');
	renderer = new RenderManager("game_canvas");
	gl = renderer.gl;
	keyboard = new KeyBoard();

	shaderName = 'triangle';
	var triangleShader = new CreateShader(gl);
	textureName = 'blue_sky';
	textureObj = new Texture('bluecloud_bk.jpg', gl.CLAMP_TO_EDGE, gl.CLAMP_TO_EDGE, gl.LINEAR, gl.LINEAR);
	textureObj.loadTexture();
	triangleShader.makeProgram("vertShader.txt", "fragShader.txt");
	var delay = 150;
	if(navigator.userAgent.indexOf("Firefox") != -1){
		delay = 450;
	}
	setTimeout(start, delay);
}