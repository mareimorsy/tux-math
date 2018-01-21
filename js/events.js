// To make background music loop when it ends.
mainAudio.addEventListener("ended", function(){
	//play randome audio
	if (ReturnRandInt (0, 1)) {
		mainAudio.src = "audio/tuxi.ogg";
	}else{
		mainAudio.src = "audio/rush.ogg";
	}
	
	this.play();
});