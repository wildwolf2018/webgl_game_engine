//Shader object constructor
function CreateShader(gl){
	this.program = -1;
	this.gl = gl;
}

//Shader object methods
CreateShader.prototype = {
	makeProgram: function(vShaderFile, fShaderFile){
		this.vShaderStr = null;
		this.fShaderStr = null;
		loadShaderFromFile(vShaderFile, this.vLoadedShader);
		loadShaderFromFile(fShaderFile, this.fLoadedShader);
	},
	compileShader: function(shaderText, shaderType){
		var shaderObj = gl.createShader(shaderType);
		gl.shaderSource(shaderObj, shaderText);
		gl.compileShader(shaderObj);
		if(!gl.getShaderParameter(shaderObj, gl.COMPILE_STATUS))
		{
			console.log('Error compiling ' + shaderType + '  shader', gl.getShaderInfoLog(shaderObj));
		}
		return shaderObj;
	},
	linkProgram: function(vertShaderText, fragShaderText){
		var programID = gl.createProgram();
		var vShaderID = this.compileShader(vertShaderText, gl.VERTEX_SHADER);
		var fShaderID = this.compileShader(fragShaderText, gl.FRAGMENT_SHADER);
		gl.attachShader(programID, vShaderID);
		gl.attachShader(programID, fShaderID);
		gl.linkProgram(programID);
		if(!gl.validateProgram(programID)){
			if(!gl.getProgramParameter(programID, gl.VALIDATE_STATUS)){
				console.log(gl.getProgramInfoLog(programID));
			}
		}
		return programID;
	},

	vLoadedShader: function(str){		
		var fragShaderStr = this.fShaderStr;
		var vertShaderStr = str;
		this.vShaderStr = vertShaderStr;
			if(fragShaderStr){
				this.program = CreateShader.prototype.linkProgram(vertShaderStr, fragShaderStr);
				storeProgram(this.program);
			}
	},
	fLoadedShader: function(str){	
		var vertShaderStr = this.vShaderStr;
		var fragShaderStr = str;
		this.fShaderStr = fragShaderStr;	 
			if(vertShaderStr){
				this.program = CreateShader.prototype.linkProgram(vertShaderStr, fragShaderStr);
				storeProgram(this.program);
			}
	}
}

