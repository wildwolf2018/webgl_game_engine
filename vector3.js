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

const degreesToRadians = (angleDegrees) => {return angleDegrees * (Math.PI / 180)};
