var loadShaderFromFile = function(url, callback){
	var request = new XMLHttpRequest();
	request.open('GET', url + '?please-dont-cache' + Math.random(), true);
	var str = '';
	request.onload = function(){
		if(request.status < 200 || request.status > 299){
			callback('Error: HTTP Status ' + request.status, index);
		}
		else{
			callback(request.responseText);
		}
	};
	request.send();
}

function Texture(filename, wrappingModeS, wrappingModeT, minFilteringMode, magFilteringMode)
{
	this.filename = filename;
	this.wrappingModeS = wrappingModeS;
	this.wrappingModeS = wrappingModeT;
	this.minFilteringMode = minFilteringMode;
	this.magFilteringMode = magFilteringMode;
	this.loadTexture = function(){
		var img = new Image();
		img.onload = function() {
			var textureID = gl.createTexture();

			gl.activeTexture(gl.TEXTURE0);
			gl.bindTexture(gl.TEXTURE_2D, textureID);
			gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
			gl.bindTexture(gl.TEXTURE_2D, null);
			storeTexture(textureID);
		};
		img.src = this.filename;
	}
}

var texture2D = {
	textureID : 0,
	bind : function(textureUnit){
		gl.activeTexture(textureUnit);
		gl.bindTexture(gl.TEXTURE_2D, this.textureID);
	},
	unbind: function(){
		gl.bindTexture(gl.TEXTURE_2D, null);
	}
}; 

function ShaderProgram(program) 
{  
	this.programID = program;
	this.setMatrixUniform = function(name, matrix){
					var location = gl.getUniformLocation(this.programID, name);
					gl.uniformMatrix4fv(location, gl.FALSE, matrix);
				};
	this.setTextureUniform = function(name, textureLoc){
		var location = gl.getUniformLocation(this.programID, name);
		gl.uniform1i(location, textureLoc);
	};
	this.use = function(){
		gl.useProgram(this.programID);
	};
}

//Inserts program into shader program array
//0 -> triangle
var storeProgram = function(program){
	var _shader = new ShaderProgram(program);
	shaderPrograms[shaderName] = _shader;
};

//Gets the texture object
var storeTexture = function(ID){
	texture2D.textureID = ID;
	textures[textureName] = texture2D;
};