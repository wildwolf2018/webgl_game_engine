class KeyBoard
{
	constructor(canvas)
	{
		thisbuttons[] = {'65': false, '68': false, '83': false, '87': false};
		thisbuttonsDown[] = {'65': false, '68': false, '83': false, '87': false};
		thisbuttonsUp[] = {'65': false, '68': false, '83': false, '87': false};
		this.canvas = canvas;
		this.canvas.onkeydown = function(event) {keydown(event);}
		this.canvas.onkeyup = function(event) {keyup(event);}
		this.keyReleased = false;
	}

	keydown(event){ 
		let char = String.fromChar(event.which);
		if(char == '65' || char == '68' || char == '83' || char == '87'){
			this.keyReleased = false;
	}
	keyup(event){
		let char = String.fromChar(event.which);
		if(char == '65' || char == '68' || char == '83' || char == '87'){
			this.keyReleased = true;
	}
	keypress(){
		let char = String.fromChar(event.which);
		if(char == '65' || char == '68' || char == '83' || char == '87'){
			if(this.keyReleased == false && thisbuttons[char] == false){
				this.buttonsDown[char] = true;
				this.buttonsUp[char] = false;
			}
			if(this.keyReleased == true && thisbuttons[char] == true){
				thisbuttonsDown[char] = false;
				thisbuttonsUp[char] = true;
			}
			this.buttons[char] = !this.keyReleased == true;
		}
	}

	isKeyDown(key)
	{
		let state = this.buttons[key];
		this.buttonsDown = false;
		return state;
	}

	isKeyUp(key)
	{
		let state = this.buttons[key];
		this.buttonsDown = false;
		return state;
	}


}