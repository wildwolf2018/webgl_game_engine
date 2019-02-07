var  engine = {
	gl: null,//Rendering context
    ext: null,//Vertex Array Object brower extension
	canvas: null,//Drawing region

	viewMatrix : new Float32Array(16),
	projectionMatrix : new Float32Array(16),

	initialize: function(){
		var engineCanvas = document.getElementById('game_canvas');
		var engineGL;
	  	engineGL = engineCanvas.getContext('webgl');
		if(!engineGL){
			engineGL = engineCanvas.getContext('experimental-webgl');
		}
		this.canvas = engineCanvas;
		this.gl = engineGL;
		this.ext = this.gl.getExtension('OES_vertex_array_object');
		//mat4.lookAt(this.viewMatrix, [0.0, 0.0,  2.0], [0.0, 0.0, 0.0], [0.0, 0.1, 0.0]);
		let position = new vector(0.0, 0.0, 2.0);
		let target = new vector(0.0, 0.0, 0.0);
		let worldUp = new vector(0.0, 1.0, 0.0);
		matrix4.Calculate_LookAt_Matrix(this.viewMatrix, position, target, worldUp);
		mat4.perspective(this.projectionMatrix, glMatrix.toRadian(45), this.canvas.width/this.canvas.height, 0.1, 1000.0);
	},

	update : function(){
		shader = shaderPrograms['triangle'];
		shader.use();
		shader.setMatrixUniform('mView', this.viewMatrix);
		shader.setMatrixUniform('mProj', this.projectionMatrix);
	},
	renderStart: function(){
		var that = this.gl;
		that.clearColor(0.0, 0.0, 0.0, 1.0);
		that.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	}
}