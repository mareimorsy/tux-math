HTMLElement.prototype.animation = true; // allow element to move otherwise it will freeze

HTMLElement.prototype.left = function(offset = 5){
   this.style.left = (this.getX() - offset) + 'px';
}

HTMLElement.prototype.stop = function(){
   this.animation = false;
}

HTMLElement.prototype.right = function(offset = 5){
   this.style.left = (this.getX() + offset) + 'px';
}

HTMLElement.prototype.up = function(offset = 5){
   this.style.top = (this.getY() - offset) + 'px';
}

HTMLElement.prototype.down = function(offset = 5){
   this.style.top = (this.getY() + offset) + 'px';
}

HTMLElement.prototype.position = function(x, y){
	this.style.left = x + 'px';
	this.style.top = y + 'px';
}

HTMLElement.prototype.hide = function(milliseconds = 0, Func){
	var interval = 0;
	var opacity_val = 1;
	var self = this;

	if (milliseconds < 100 && milliseconds !=0) {
		interval = 100/milliseconds;
	}else{
		interval = milliseconds/100;
	}

	if (interval == 0) {
		this.style.display = 'none';
	}else{
		var myTimer = setInterval(function(){
			opacity_val -=0.01;
			self.style.opacity = opacity_val;
			if (opacity_val<0) {
				clearInterval(myTimer);
				self.style.display = 'none';
				if (typeof Func != 'undefined'){
					Func();
				}
			}
		}, interval);
	}
}

HTMLElement.prototype.show = function(milliseconds = 0){
	var interval = 0;
	var opacity_val = 0;
	var self = this;
	this.style.opacity = opacity_val;
	this.style.display = 'block';

	if (milliseconds < 100 && milliseconds !=0) {
		interval = 100/milliseconds;
	}else{
		interval = milliseconds/100;
	}

	if (interval == 0) {
		this.style.opacity = 1;
	}else{
		var myTimer = setInterval(function(){
			opacity_val +=0.01;
			self.style.opacity = opacity_val;
			if (opacity_val>1) {
				clearInterval(myTimer);
			}
		}, interval);
	}
}

HTMLElement.prototype.getX = function(){
	var xPos = parseInt(this.style.left);
	if (isNaN(xPos)){
		this.style.left = '0px';
		return 0;
	}
	return xPos;
}

HTMLElement.prototype.getY = function(){
	var yPos = parseInt(this.style.top);
	if (isNaN(yPos)){
		this.style.top = '0px';
		return 0;
	}
	return yPos;
}

HTMLElement.prototype.animateX = function(x, milliseconds = 1000, Func){
	if (xPos != x) {

		var interval = 0;
		var self = this;
		var xPos = this.getX();
		var distance = Math.abs(x - xPos);

		if (milliseconds < smooth) {
			interval = smooth/milliseconds;
		}else{
			interval = milliseconds/smooth;
		}

		var increment = distance/smooth;


		var myTimer = setInterval(function(){
			if (self.animation) {
				if (xPos < x) {//moveRight
					self.right(increment);
					if (self.getX()>=x) {
						clearInterval(myTimer);
						if (typeof Func != 'undefined'){
							Func();
						}
					}
				}else if (xPos > x) {//moveLeft
					self.left(increment);
					if (self.getX()<=x) {
						clearInterval(myTimer);
						if (typeof Func != 'undefined'){
							Func();
						}
					}
				}
			}else{
				clearInterval(myTimer);
				this.animation = true;
			}
			
		}, interval);
	}
}

HTMLElement.prototype.animateY = function(y, milliseconds = 1000, Func){
	if (yPos != y) {

		var interval = 0;
		var self = this;
		var yPos = this.getY();
		var distance = Math.abs(y - yPos);

		if (milliseconds < smooth) {
			interval = smooth/milliseconds;
		}else{
			interval = milliseconds/smooth;
		}

		var increment = distance/smooth;

		var myTimer = setInterval(function(){
			if (self.animation) {
				if (yPos < y) {//moveDown
					self.down(increment);
					if (self.getY()>=y) {
						clearInterval(myTimer);
						if (typeof Func != 'undefined'){
							Func();
						}
					}
				}else if (yPos > y) {//moveDown
					self.up(increment);
					if (self.getY()<=y) {
						clearInterval(myTimer);
						if (typeof Func != 'undefined'){
							Func();
						}
					}
				}
			}else{
				clearInterval(myTimer);
				this.animation = true;
			}
			
		}, interval);
	}
}

HTMLElement.prototype.animate = function(x, y, milliseconds = 1000){
	this.animateX(x, milliseconds);
	this.animateY(y, milliseconds);
}

HTMLElement.prototype.burn = function(Func){
	var self = this;
	this.children[0].style.width = '140px';
	this.children[0].src = 'imgs/Crash-Burn.gif';
	this.down(35);
	this.children[1].hide();
	playAudio("burn.wav");
	this.children[0].hide(4000, function(){
		self.goUp();
		if (typeof Func != 'undefined'){
			Func();
		}
	});
}

HTMLElement.prototype.explode = function(Func){
	var self = this;
	self.stop();
	this.children[0].style.width = '140px';
	this.children[0].src = 'imgs/tseo.gif';
	this.down(70);
	this.right(30);
	this.children[1].hide();
	playAudio("explode.wav");
	this.children[0].hide(900, function(){
		self.left(30);
		self.goUp();
		if (typeof Func != 'undefined'){
			self.animation = true;
			Func();
		}
	});
}

HTMLElement.prototype.goUp = function(){
	this.children[0].style.width = '85px';
	this.children[0].src = 'imgs/meteor.gif';
	this.children[0].show();
	this.children[1].show();
	this.position(this.getX(), -173); //173 = offsetHeight
}


//  Day 4

HTMLElement.prototype.loop = function(){
	var self = this;
	recursion(self);
}
HTMLElement.prototype.setText = function (opration, min, max)
{
	var self = this;
	generateQuestions(self,opration,min,max)
}

HTMLElement.prototype.setPosition = function ()
{
	this.position(ReturnRandInt(10, window.innerWidth - (this.offsetWidth+10) ), 0- this.offsetHeight);

}