class RenderManager
{
	constructor(canvasID)
	{
		let engineCanvas = document.getElementById(canvasID);
	  	let engineGL = engineCanvas.getContext('webgl');
		if(!engineGL){
			engineGL = engineCanvas.getContext('experimental-webgl');
		}
		this.canvas = engineCanvas;//Drawing area
		this.gl = engineGL;//Rendering context
		this.ext = this.gl.getExtension('OES_vertex_array_object');//Vertex Array Object brower extension
		this.projectionMatrix = new Float32Array(16);
		this.matrix = new Float32Array(16);
		this.cam = new Camera(new vector(0.0, 0.0, 2.0));
		this.deltaTime = 0.0;
	}

	update()
	{
		this.cam.UpdateViewMatrix();
		matrix4.Calculate_Perspective_Matrix(this.projectionMatrix, glMatrix.toRadian(45), 
			this.canvas.width/this.canvas.height, 0.1, 1000.0);
	}

	renderStart()
	{
		var that = this.gl;
		that.clearColor(0.0, 0.0, 0.0, 1.0);
		that.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	}


}