class matrix4
{
	constructor(){}

	//Calculates the product of two 4x4 matrices
	static multiply(matrixA, matrixB, product){
		product[0] = matrixA[0] * matrixB[0] + matrixA[4] * matrixB[1] + matrixA[8] * matrixB[2] + 
							matrixA[12] * matrixB[3];
		product[1] = matrixA[1] * matrixB[0] + matrixA[5] * matrixB[1] + matrixA[9] * matrixB[2] + 
							matrixA[13] * matrixB[3];
		product[2] = matrixA[2] * matrixB[0] + matrixA[6] * matrixB[1] + matrixA[10] * matrixB[2] + 
							matrixA[14] * matrixB[3];
		product[3] = matrixA[3] * matrixB[0] + matrixA[7] * matrixB[1] + matrixA[11] * matrixB[2] + 
							matrixA[15] * matrixB[3];
		product[4] = matrixA[0] * matrixB[4] + matrixA[4] * matrixB[5] + matrixA[8] * matrixB[6] + 
							matrixA[12] * matrixB[7];
		product[5] = matrixA[1] * matrixB[4] + matrixA[5] * matrixB[5] + matrixA[9] * matrixB[6] + 
							matrixA[13] * matrixB[7];
		product[6] = matrixA[2] * matrixB[4] + matrixA[6] * matrixB[5] + matrixA[10] * matrixB[6] + 
							matrixA[14] * matrixB[7];
		product[7] = matrixA[3] * matrixB[4] + matrixA[7] * matrixB[5] + matrixA[11] * matrixB[6] + 
							matrixA[15] * matrixB[7];
		product[8] = matrixA[0] * matrixB[8] + matrixA[4] * matrixB[9] + matrixA[8] * matrixB[10] + 
							matrixA[12] * matrixB[11];
		product[9] = matrixA[1] * matrixB[8] + matrixA[5] * matrixB[9] + matrixA[9] * matrixB[10] + 
							matrixA[13] * matrixB[11];
		product[10] = matrixA[2] * matrixB[8] + matrixA[6] * matrixB[9] + matrixA[10] * matrixB[10] + 
							matrixA[14] * matrixB[11];
		product[11] = matrixA[3] * matrixB[8] + matrixA[7] * matrixB[9] + matrixA[11] * matrixB[10] + 
							matrixA[15] * matrixB[11];
		product[12] = matrixA[0] * matrixB[12] + matrixA[4] * matrixB[13] + matrixA[8] * matrixB[14] + 
							matrixA[12] * matrixB[15];
		product[13] = matrixA[1] * matrixB[12] + matrixA[5] * matrixB[13] + matrixA[9] * matrixB[14] + 
							matrixA[13] * matrixB[15];
		product[14] = matrixA[2] * matrixB[12] + matrixA[6] * matrixB[13] + matrixA[10] * matrixB[14] + 
							matrixA[14] * matrixB[15];
		product[15] = matrixA[3] * matrixB[12] + matrixA[7] * matrixB[13] + matrixA[11] * matrixB[14] + 
							matrixA[15] * matrixB[15];
	}

	//Calculates the inverse of a 4x4 matrix
	static inverse(matrix, inverse){
		let x = matrix[12], y = matrix[13], z = matrix[14], w = matrix[15];
		let a = new vector(matrix[0], matrix[4], matrix[8]), b = new vector(matrix[1], matrix[5], matrix[9]);
		let c = new vector(matrix[2], matrix[6], matrix[10]), d = new vector(matrix[3], matrix[7], matrix[11]);

		let a2 = a.scalarMultiply(y), b2 = b.scalarMultiply( x);
		let c2 = c.scalarMultiply(w), d2 = d.scalarMultiply(z);
		let u = vector.subtract(a2, b2);
		let v = vector.subtract(c2, d2);

		let s = vector.cross(a, b), t = vector.cross(c, d);
		let bv = vector.cross(b, v), va = vector.cross(v, a);
		let du = vector.cross(d, u), uc = vector.cross(u, c);

		let t2 = t.scalarMultiply(y), t3 = t.scalarMultiply(x); 
		let s2 = s.scalarMultiply(w), s3 = s.scalarMultiply(z);
		let r0 = vector.add(bv, t2);
		let r1 = vector.subtract(va, t3);
		let r2 = vector.add(du, s2);
		let r3 = vector.subtract(uc, s3);

		let invDet = 1 / (vector.dot(s, v) + vector.dot(t,u));
		r0 = r0.scalarMultiply(invDet);
		r1 = r1.scalarMultiply(invDet);
		r2 = r2.scalarMultiply(invDet);
		r3 = r3.scalarMultiply(invDet);
		
		inverse[0] = r0.x; inverse[4] = r0.y; inverse[8] = r0.z;inverse[1] = r1.x; 
		inverse[5] = r1.y; inverse[9] = r1.z; inverse[2] = r2.x; inverse[6] = r2.y; inverse[10] = r2.z;
		inverse[3] = r3.x; inverse[7] = r3.y; inverse[11] = r3.z; inverse[12] = -1 * vector.dot(b, t) * invDet; 
		inverse[13] = vector.dot(a, t) * invDet; inverse[14] = -1 * vector.dot(d, s) * invDet; 
		inverse[15] = vector.dot(c, s) * invDet; 
	}

	//Calculates a 4x4	identity matrix
	static identity(matrix){
		matrix[0] = 1; matrix[4] = 0; matrix[8] = 0; matrix[12] = 0;
		matrix[1] = 0; matrix[5] = 1; matrix[9] = 0; matrix[13] = 0;
		matrix[2] = 0; matrix[6] = 0; matrix[10] = 1; matrix[14] = 0;
		matrix[3] = 0; matrix[7] = 0; matrix[11] = 0; matrix[15] = 1;
	}

	//Calculates a translation matrix
	static translate(modelMatrix, x, y, z){
		let transMatrix = new Float32Array(16);
		transMatrix[12] = x; transMatrix[13] = y; transMatrix[14] = z;
		transMatrix[0] = 1; transMatrix[5] = 1; transMatrix[10] = 1; transMatrix[15] = 1;
		transMatrix[1] = 0;transMatrix[2] = 0;transMatrix[3] = 0; transMatrix[4] = 0;
		transMatrix[6] = 0;transMatrix[7] = 0;transMatrix[8] = 0;transMatrix[9] = 0;
		transMatrix[11] = 0;

		let product = new Float32Array(16);
		this.multiply(transMatrix, modelMatrix, product);
		for(let i = 0; i < modelMatrix.length; i++){
			modelMatrix[i] = product[i];
		}
	}

	//Calculates a 4x4 scale matrix
	static scale(modelMatrix, x, y, z){
		modelMatrix[0] = x; modelMatrix[5] = y; modelMatrix[10] = z; 
		modelMatrix[1] = 0;modelMatrix[2] = 0;modelMatrix[3] = 0; modelMatrix[4] = 0;
		modelMatrix[6] = 0;modelMatrix[7] = 0;modelMatrix[8] = 0;modelMatrix[9] = 0;
		modelMatrix[11] = 0; modelMatrix[12] = 0; modelMatrix[13] = 0; modelMatrix[14] = 0;
		modelMatrix[15] = 1;
	}

	//Calculates a 4x4 rotation matrix
	static rotate(matrix, angle, axis){
		let theta = degreesToRadians(angle);
		let c = Math.cos(theta); 
		let s = Math.sin(theta); 
		let d = 1.0 - c; 
		let x = axis.x * d; 

		let y = axis.y * d;
		let z = axis.z * d; 
		let axay = x * axis.y; 
		let axaz = x * axis.z; 
		let ayaz = y * axis.z; 

		matrix[0] = c + x * axis.x;
		matrix[1] = axay -s * axis.z;
		matrix[2] = axaz + s * axis.y; matrix[3] = 0.0;
		matrix[4] = axay + s * axis.z; 
		matrix[5] = c + y* axis.y;
		matrix[6] =  ayaz - s * axis.x; matrix[7] = 0.0;
		matrix[8] = axaz - s * axis.y;
		matrix[9] = ayaz + s * axis.x;
		matrix[10] = c+ z * axis.z;
		matrix[11] = 0.0;  matrix[12] = 0.0;  matrix[13] = 0.0;
		matrix[14] = 0.0;  matrix[15] = 0.1;
	}

	//Calculates the view matrix from given postion, look-at point and up vector
	//of the camera
	static Calculate_LookAt_Matrix(viewMatrix, position, target, worldUp){
		//Calculate camera direction
		let zaxis =  (vector.subtract(position, target)).normalize();
		//Calculate the right axis
		let tempAxis = vector.cross(worldUp.normalize(), zaxis);
		let xaxis = tempAxis.normalize();
		//Calculate the camera up direction
		let yaxis = vector.cross(xaxis, zaxis);

		//Column 1
		viewMatrix[0] = xaxis.x; viewMatrix[1] = xaxis.y; viewMatrix[2] = xaxis.z; viewMatrix[3] = 0.0;
		//Column 2
		viewMatrix[4] = yaxis.x; viewMatrix[5] = yaxis.y; viewMatrix[6] = yaxis.z; viewMatrix[7] = 0.0;
		//Column 3
		viewMatrix[8] = zaxis.x; viewMatrix[9] = zaxis.y; viewMatrix[10] = zaxis.z; viewMatrix[11] = 0.0;
		//Column 4
		//Translation vector
		viewMatrix[12] = -1 * position.x; viewMatrix[13] = -1 * position.y; viewMatrix[14] = -1 * position.z; 
		viewMatrix[15] = 1.0;
	}

	//Calculates the perspective projection matrix
	static Calculate_Perspective_Matrix(matrix, verticalViewAngle, aspectRatio, nearPlaneDistance, farPlaneDistance)
	{
		let top = Math.tan(verticalViewAngle/2) * nearPlaneDistance;
		let bottom = -1 * top;
		let right = top * aspectRatio;
		let left = -1 * right;

		let rigthMinusLeft = right - left;
		let topMinusBottom = top - bottom;
		let farMinusNear = farPlaneDistance - nearPlaneDistance;
		let doubleNear = 2 * nearPlaneDistance;

		matrix[0] = doubleNear / rigthMinusLeft; matrix[1] = 0.0; matrix[2] = 0.0; matrix[3] = 0.0;
		matrix[4] = 0.0; matrix[5] = doubleNear / topMinusBottom; matrix[6] = 0.0; matrix[7] = 0.0;
		matrix[8] = (right + left) / rigthMinusLeft; matrix[9] = (top + bottom) / topMinusBottom;
				 matrix[10] = -1 * (farPlaneDistance + nearPlaneDistance) / farMinusNear; matrix[11] = -1.0;
		matrix[12] = 0; matrix[13] = 0; 
		matrix[14] = (-2.0 * farPlaneDistance * nearPlaneDistance) / farMinusNear; matrix[15] = 0.0;
	}

	//Calculates the orthographic projection matrix
	static Calculate_Orthographic_Matrix(matrix, left, right, bottom, top, near, far)
	{
		let rigthMinusLeft = right - left;
		let topMinusBottom = top - bottom;
		let farMinusNear = far - near;

		matrix[0] = 2 / rigthMinusLeft; matrix[1] = 0.0; matrix[2] = 0.0; matrix[3] = 0.0;
		matrix[4] = 0.0; matrix[5] = 2 / topMinusBottom; matrix[6] = 0.0; matrix[7] = 0.0;
		matrix[8] = 0.0; matrix[9] = 0.0; matrix[10] = -2.0 / farMinusNear; matrix[11] = 0.0;
		matrix[12] = -1.0 * (right + left) / rigthMinusLeft; matrix[13] = -1.0 * (top + bottom) / topMinusBottom; 
		matrix[14] = -1.0 * (far + near) / farMinusNear; matrix[15] = 1.0;
	}
}