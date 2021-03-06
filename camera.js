class Camera
{
	constructor(position, front = new vector(0.0, 0.0, -1.0), up = new vector(0.0, 1.0, 0.0), pitch = 0.0, yaw = 0.0){
		this.Position = position;
		this.Front = front;
		this.WorldUp = up;
		this.Up = null;
		this.Right = null;

		this.pitch = pitch;
		this.yaw = yaw;
		/*this.Rotation = {};
		let PITCH = Symbol("pitch");
        this.Rotation[PITCH] = pitch;
		let YAW = Symbol("yaw");*/
		//this.Rotation[YAW] = yaw;
		this.viewMatrix = new Float32Array(16),
		this.UpdateVectors();
	}

	UpdateViewMatrix()
	{
		let target = vector.add(this.Position, this.Front);
		matrix4.Calculate_LookAt_Matrix(this.viewMatrix, this.Position, target, this.WorldUp);
	}

	UpdateVectors()
	{
		//Direction of the camera
		let front = new vector(0.0, 0.0, -1.0);
		//Rotation about the x axis by angle Pitch
		let q1 = Quaternion.createRotationQuat(new vector(1.0, 0.0, 0.0), this.pitch);
		//Rotation about the y axis by angle Yaw
		let q2 = Quaternion.createRotationQuat(new vector(0.0, 0.1, 0.0), this.yaw);
		//Calculate final camera rotation
		let q1q2 = Quaternion.multiply(q1, q2);

		this.Front = (Quaternion.rotateVector(front, q1q2)).normalize(); //Calculate the front vector
		//Calculate the right vector
		let tempRight = vector.cross(this.Front, this.WorldUp);
		this.Right = tempRight.normalize();
		//Calculate the up vector
		let tempUp = vector.cross(this.Right, this.Front);
		this.Up = tempUp.normalize(); 
	}
}