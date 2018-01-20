// To make background music loop when it ends.
mainAudio.addEventListener("ended", function(){
	// todo play randome audio when Alaa's function is ready
	this.play();
});

// console.log();

if (ReturnRandInt (0, 1)) {
	mainAudio.src = "audio/tuxi.ogg";
}else{
	mainAudio.src = "audio/rush.ogg";
}