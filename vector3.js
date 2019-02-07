/*Performs vector operations on 3 component Float32Arrays*/
class vector
{
	constructor(x, y, z){
		this.x = x;
		this.y = y; 
		this.z = z;
	}
	multiply(vecA, vecB){
		return new vector(vecA.x * vecB.x, vecA.y * vecB.y, vecA.z * vecB.z);
	}
	scalarMultiply(scalar){
		return new vector(this.x * scalar, this.y * scalar, this.z * scalar);
	}
	magnitude(){
		let square = this.x * this.x + this.y * this.y + this.z * this.z; 
		return Math.sqrt(square);
	}
	normalize(){
		let scalar = 1 / this.magnitude();
		return new vector(this.x * scalar, this.y * scalar, this.z * scalar);
	}
	static dot(vecA, vecB){
		return vecA.x * vecB.x + vecA.y * vecB.y + vecA.z * vecB.z;
	}
	static cross(vecA, vecB){
		return new vector(vecA.y * vecB.z - vecA.z * vecB.y, vecA.z * vecB.x - vecA.x * vecB.z,
			vecA.x * vecB.y - vecA.y * vecB.x);
	}
	static add(vecA, vecB){
		return new vector(vecA.x + vecB.x, vecA.y + vecB.y, vecA.z + vecB.z);
	} 
	static subtract(vecA, vecB){
		return new vector(vecA.x - vecB.x, vecA.y - vecB.y, vecA.z - vecB.z);
	}
}
var vec3 = { 
	multiply: function(vecA, vecB, resultVec){
		resultVec[0] = vecA[0] * vecB[0];
		resultVec[1] = vecA[1] * vecB[1];
		resultVec[2] = vecA[2] * vecB[2];
	},
	scalarMultiply: function(vector, scalar){
		vector[0] *= scalar;
		vector[1] *= scalar;
		vector[2] *= scalar;
	},
	scalarMultiply2: function(vector, scalar){
		var temp = new Float32Array(3);
		temp[0] = vector[0] * scalar;
		temp[1] = vector[1] * scalar;
		temp[2] = vector[2] * scalar;
		return temp;
	},
	magnitude: function(vector){
		var square = vector[0]*vector[0] + vector[1]*vector[1] + vector[2]*vector[2];
		return Math.sqrt(square);
	},
	normalize: function(vector){
		var scalar = 1 / this.magnitude();
		this.scalarMultiply(vector, scalar);
	},
	dot: function(vecA, vecB){
		return vecA[0] * vecB[0] + vecA[1] * vecB[1] + vecA[2] * vecB[2];
	},
	cross: function(vecA, vecB, resultVec){
		resultVec[0] = vecA[1] * vecB[2] - vecA[2] * vecB[1];
		resultVec[1] = vecA[2] * vecB[0] - vecA[0] * vecB[2];
		resultVec[2] = vecA[0] * vecB[1] - vecA[1] * vecB[0];
	},
	add: function(vecA, vecB, resultVec){
		resultVec[0] = vecA[0] + vecB[0];
		resultVec[1] = vecA[1] + vecB[1];
		resultVec[2] = vecA[2] + vecB[2];
	},
	subtract: function(vecA, vecB, resultVec){
		resultVec[0] = vecA[0] - vecB[0];
		resultVec[1] = vecA[1] - vecB[1];
		resultVec[2] = vecA[2] - vecB[2];
	}
};
const degreesToRadians = (angleDegrees) => {return angleDegrees * (Math.PI / 180)};
