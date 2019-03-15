class KeyBoard
{
	constructor()
	{
		this.pressed = false;
		//Current state of the buttons
		this.buttons = {'A': false, 'D': false, 'S': false, 'W': false};
		//Indicates which buttons are pressed during current frame
		this.buttonsDown = {'A': false, 'D': false, 'S': false, 'W': false};
		//Indicates which buttons are released during current frame
		this.buttonsUp = {'A': false, 'D': false, 'S': false, 'W': false};

		//Buttons' events
		//keyboard is globally created object of type KeyBoard 
		document.onkeydown = function(event) { 
			keyboard.pressed = true;
			keyboard.keyPress(event);
		};
		document.onkeyup = function(event) { 
			keyboard.pressed = false;
			keyboard.keyPress(event);
		};
	}

	//Handles the event when a button is pressed or released
	keyPress(event){
		let char = String.fromCharCode(event.keyCode);
		if(char == 'A' || char == 'D' || char == 'S' || char == 'W'){
			if(this.buttons[char] == false && this.pressed == true){
				this.buttonsDown[char] = true;
				this.buttonsUp[char] = false;
			}

			if(this.buttons[char] == true && this.pressed == false){
				this.buttonsDown[char] = false;
				this.buttonsUp[char] = true;
			}
			this.buttons[char] = this.pressed;
		}
	}

	isKeyDown(key){
		let state = this.buttons[key];
		this.buttonsDown[key] = false;
		return state;
	}
	
	isKeyUp(key){
		let state = this.buttons[key];
		this.buttonsUp[key] = false;
		return state;
	}
	
	//Gets the current state of the button
	buttonState(key){ return this.buttons[key];}
}