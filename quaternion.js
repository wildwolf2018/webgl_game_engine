class Quaternion
{
	constructor(x, y, z, w){
		this.x = x;
		this.y = y;
		this.z = z;
		this.w = w;
	}

	static createQuaternion(vec3, s){
		return new Quaternion(vec3.x, vec3.y, vec3.z, s);
	}

	static multiply(q1, q2){
		return new Quaternion(q1.x*q2.w + q1.y*q2.z - q1.z*q2.y + q1.w*q2.x,
							q1.y*q2.w + q1.z*q2.x + q1.w*q2.y - q1.x*q2.z,
							q1.z*q2.w + q1.w*q2.z + q1.x*q2.y - q1.y*q2.x,
							q1.w*q2.w - q1.x*q2.x - q1.y*q2.y - q1.z*q2.z);
	}

	getVectorPart(){
		return new vector(this.x, this.y, this.z);
	}

	getUnitQuaterninon(){
		let d_square = this.x*this.x + this.y*this.y + this.z*this.z + this.w*this.w;
		let d = Math.sqrt(d_square);
		return new Quaternion(this.x/d, this.y/d, this.z/d, this.w/d);
	}

	static createRotationQuat(axis, angleDegrees){
		let rotationAxis = axis.normalize();
		let halfAngle = degreesToRadians(angleDegrees) / 2;
		let halfSin = Math.sin(halfAngle);
		
		return new Quaternion(rotationAxis.x*halfSin, rotationAxis.y*halfSin, 
			rotationAxis.z*halfSin, Math.cos(halfAngle));
	}

	static rotateVector(vec3, quat){
		let b = quat.getVectorPart();
		let b2 = b.x * b.x + b.y * b.y + b.z * b.z;
		let v1 = vec3.scalarMultiply(quat.w*quat.w - b2);
		let scaler2 =  vector.dot(b, vec3) * 2.0;
		let v2 = b.scalarMultiply(scaler2);
		let tempVec = vector.cross(b, vec3);
		let v3 = tempVec.scalarMultiply(quat.w * 2.0);

		return new vector((v1.x + v2.x + v3.x).toFixed(2), (v1.y + v2.y + v3.y).toFixed(2),
					 (v1.z + v2.z + v3.z).toFixed(2));
	}

	setRotationMatrix(matrix){
		let x2 = this.x * this.x;
		let y2 = this.y * this.y; 
		let z2 = this.z * this.z; 
		let xy = this.x * this.y; 
		let xz = this.x * this.z; 
		let yz = this.y * this.z; 
		let wx = this.w * this.x; 
		let wy = this.w * this.y;
		let wz = this.w * this.z; 

		matrix[0] = 1.0 - 2 * (x2 + z2);
		matrix[1] = 2.0 * (xy + wz);
		matrix[2] = 2.0 * (xz - wy);
		matrix[4] = 2.0 * (xy - wz);
		matrix[5] = 1.0 - 2.0 * (x2 + z2);
		matrix[6] = 2.0 * (yz + wx);
		matrix[8] = 2.0 * (xz + wy);
		matrix[9] = 2.0 * (yz - wx);
		matrix[10] = 1.0 - 2.0 * (x2 + y2);

		matrix[3] = 0; matrix[7] = 0; matrix[11] = 0;
		matrix[12] = 0; matrix[13] = 0; matrix[14] = 0; matrix[15] = 1;
	}
}