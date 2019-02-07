/*
Elements of a 3 x 3 matrix are stored in column-major order
All matrix parameters are Float32Arrays with 9 entries
*/

class matrix3
{
	constructor(){}
	static identity(matrix){
		matrix[0] = 1; matrix[4] = 0; matrix[8] = 0; matrix[12] = 0;
		matrix[1] = 0; matrix[5] = 1; matrix[9] = 0; matrix[13] = 0;
		matrix[2] = 0; matrix[6] = 0; matrix[10] = 1; matrix[14] = 0;
		matrix[3] = 0; matrix[7] = 0; matrix[11] = 0; matrix[15] = 1;
	}
	static multiply(matrixA, matrixB, product){
		product[0] = matrixA[0] * matrixB[0] + matrixA[3] * matrixB[1] + matrixA[6] * matrixB[2];
		product[1] = matrixA[1] * matrixB[0] + matrixA[4] * matrixB[1] + matrixA[7] * matrixB[2];
		product[2] = matrixA[2] * matrixB[0] + matrixA[5] * matrixB[1] + matrixA[8] * matrixB[2];

		product[3] = matrixA[0] * matrixB[3] + matrixA[3] * matrixB[4] + matrixA[6] * matrixB[5];
		product[4] = matrixA[1] * matrixB[3] + matrixA[4] * matrixB[4] + matrixA[7] * matrixB[5];
		product[5] = matrixA[2] * matrixB[3] + matrixA[5] * matrixB[4] + matrixA[8] * matrixB[5];

		product[6] = matrixA[0] * matrixB[6] + matrixA[3] * matrixB[7] + matrixA[6] * matrixB[8];
		product[7] = matrixA[1] * matrixB[6] + matrixA[4] * matrixB[7] + matrixA[7] * matrixB[8];
		product[8] = matrixA[2] * matrixB[6] + matrixA[5] * matrixB[7] + matrixA[8] * matrixB[8];
	}
	static transpose(matrix, transpose){
		transpose[0] = matrix[0]; transpose[1] = matrix[3]; transpose[2] = matrix[6];
		transpose[3] = matrix[1]; transpose[4] = matrix[4]; transpose[5] = matrix[7];
		transpose[6] = matrix[2]; transpose[7] = matrix[5]; transpose[8] = matrix[8];
	}
	static inverse(matrix, inverse){
		let a = new vector(matrix[0], matrix[3], matrix[6]);
		let b = new vector(matrix[1], matrix[4], matrix[7]);
		let c = new vector(matrix[2], matrix[5], matrix[8]);
		
		let bc = vector.cross(b, c);
		let ca = vector.cross(c, a);
		let ab = vector.cross(a, b);

		var invDet = 1 / vector.dot(ab, c);
		inverse[0] = invDet * bc.x; inverse[3] = invDet * bc.y; inverse[6] = invDet * bc.z; 
		inverse[1] = invDet * ca.x; inverse[4] = invDet * ca.y; inverse[7] = invDet * ca.z;
		inverse[2] = invDet * ab.x; inverse[5] = invDet * ab.y; inverse[8] = invDet * ab.z;
	}
}