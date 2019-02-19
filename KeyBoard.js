class KeyBoard
{
	constructor(canvas)
	{
		//Current state of the buttons
		this.buttons[] = {'65': false, '68': false, '83': false, '87': false};
		//Indicates which buttons are pressed during current frame
		this.buttonsDown[] = {'65': false, '68': false, '83': false, '87': false};
		//Indicates which buttons are released during current frame
		this.buttonsUp[] = {'65': false, '68': false, '83': false, '87': false};
		this.canvas = canvas;
		//Buttons' event handlers
		this.canvas.onkeydown = function(event) {keyDown(event);}
		this.canvas.onkeyup = function(event) {keyUp(event);}
	}

	//Handles the event when a button is pressed
	keyDown(event){ 
		let char = String.fromChar(event.which);
		if(char == '65' || char == '68' || char == '83' || char == '87'){
			if(this.buttons[char] == false){
				this.buttonsDown[char] = true;
				this.buttonsUp[char] = false;
			}
			this.buttons[char] = true;
			this.keyReleased = false;
		}
	}

	//Handles the event when a button is released
	keyUp(event){
		let char = String.fromChar(event.which);
		if(char == '65' || char == '68' || char == '83' || char == '87'){
			if(this.buttons[char] == false){
				this.buttonsDown[char] = false;
				this.buttonsUp[char] = true;
			}
			this.buttons[char] = false;
		}
	}
	
	get isKeyDown(key)
	{
		let state = this.buttons[key];
		this.buttonsDown[key] = false;
		return state;
	}
	
	get isKeyUp(key)
	{
		let state = this.buttons[key];
		this.buttonsUp[key] = false;
		return state;
	}
	//Gets the current state of the button
	buttonState(key)
	{
		return this.buttons[key];
	}
}