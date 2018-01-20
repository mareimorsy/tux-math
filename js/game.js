// When the window loads all its content
window.addEventListener("load", function(){
	playIfNotMute();
	getUserData();
	if (liveValue === 0)
	{
		gameOver();
	}else 
	{
		if (scoreValue === 0)
		{
			displayLevels(scoreValue);

		}else if(scoreValue === 1000 || scoreValue === 2000 || scoreValue === 3000)
		{
			displayLevels(scoreValue);
			liveValue++;
			maxNumRange = 10;
		}else if(scoreValue >= 500 || scoreValue >= 1500 || scoreValue >= 2500)
		{
			maxNumRange = 20;
			playAll();
		}else 
		{
			playAll();
		}
	}

	resetLives();
	resetScore();
});
