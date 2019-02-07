var gl;//Rendering context
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
	angle = 45;
	skyTexture = textures['blue_sky'];
	shader = shaderPrograms['triangle'];
	triangle = new Triangle(gl, engine.ext, shader.programID);
	triangle.init();
	gl.enable(gl.DEPTH_TEST);
	renderLoop();
}

//Render loop
var renderLoop = function(){
		angle = performance.now() / 1000 / 3 * 2 * Math.PI;
		engine.renderStart();
		engine.update();
		triangle.update(shader, worldMatrix, angle);
		skyTexture.bind(gl.TEXTURE0);
		shader.setTextureUniform('uSampler', 0);
		engine.renderStart();
		triangle.draw();
		skyTexture.unbind();
		requestAnimationFrame(renderLoop);
};

//Called when body of HTML document has been loaded
function init(){
	console.log('Running');
	engine.initialize();
	gl = engine.gl;
	shaderName = 'triangle';
	var triangleShader = new CreateShader(gl);
	textureName = 'blue_sky';
	textureObj = new Texture('bluecloud_bk.jpg', gl.CLAMP_TO_EDGE, gl.CLAMP_TO_EDGE, gl.LINEAR, gl.LINEAR);
	textureObj.loadTexture();
	triangleShader.makeProgram("vertShader.txt", "fragShader.txt");
	var delay = 150;
	setTimeout(start, delay);
}