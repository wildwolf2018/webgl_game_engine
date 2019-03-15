//Trianthate shape object constructor
function Triangle(gl, ext, programID){
	this.gl = gl;
	this.ext = ext;
	this.vao = null;
	this.program = programID;
	this.map = new Map();	
	this.draw = function(){
		var that = this.gl;
		var _ext = this.ext;
		_ext.bindVertexArrayOES(this.vao);
		that.drawArrays(that.TRIANGLE_STRIP, 0, 4);
		_ext.bindVertexArrayOES(null);
	};
	this.update = function(angle){
		let axis = new vector(0.0, 0.0, 1.0);
		let q = Quaternion.createRotationQuat(axis, angle);
		let _map = this.map;
		matrix4.identity(_map.get("rotate"));
		q.setRotationMatrix(_map.get("rotate"));
		matrix4.multiply(_map.get("rotate"), _map.get("scale"), _map.get("model"));
	}
}

//Trianthate shape object methods
Triangle.prototype = {

	init: function(){
		//Vertex positions
		var vertices = [-0.5, 0.5,
						  -0.5, -0.5,
						  0.5, 0.5,
						  0.5, -0.5];
		//Texture coordinates				  
	  	var texCoords = [0.0, 1.0, 
  						 0.0, 0.0,
  						 1.0, 1.0,
  						 1.0, 0.0];
		var that = this.gl;
		var ext_ = this.ext;
		this.vao = ext_.createVertexArrayOES();
		ext_.bindVertexArrayOES(this.vao);
		var vertexBufferObject = that.createBuffer();
		var texBufferObject = that.createBuffer();//Vertex colors buffer

		that.bindBuffer(that.ARRAY_BUFFER, vertexBufferObject);
		that.bufferData(that.ARRAY_BUFFER, new Float32Array(vertices), that.STATIC_DRAW);//Create ertex positions buffer
		that.bindBuffer(that.ARRAY_BUFFER, texBufferObject);
		that.bufferData(that.ARRAY_BUFFER, new Float32Array(texCoords), that.STATIC_DRAW);//Create vertex colors buffer
	   
	    var program = this.program;
		that.useProgram(program);
		var vertPositionLocation = that.getAttribLocation(program, 'vPosition');
		var vertTexLocation = that.getAttribLocation(program, 'vTexCoords');
		
		that.bindBuffer(that.ARRAY_BUFFER, vertexBufferObject);
		that.vertexAttribPointer(vertPositionLocation, 2, that.FLOAT, that.FALSE, 2 * Float32Array.BYTE_PER_ELEMENT, 0);
		that.bindBuffer(that.ARRAY_BUFFER, texBufferObject);
		that.vertexAttribPointer(vertTexLocation, 2, that.FLOAT, that.FALSE, 2 * Float32Array.BYTE_PER_ELEMENT, 0);
		that.enableVertexAttribArray(vertPositionLocation);
		that.enableVertexAttribArray(vertTexLocation);
		ext_.bindVertexArrayOES(null);

		let _map = this.map;
        _map.set("scale", new Float32Array(16));// Scale matrix
        _map.set("rotate", new Float32Array(16)); // Rotation matrix
        _map.set("model", new Float32Array(16));// Model matrix
        matrix4.identity(_map.get("scale"));
        matrix4.scale(_map.get("scale"), 1.0, 1.0, 1.0);
	},
	setMatrixUniform: function(name, matrix){
		var location = gl.getUniformLocation(this.program, name);
		gl.uniformMatrix4fv(location, gl.FALSE, matrix);
	},

	setMatrixUniforms(shader)
	{
		shader.setMatrixUniform('mWorld', this.map.get("model"));
	}
}