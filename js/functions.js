// To Mute and Unmute the game sound
function playIfNotMute(){

	if (localStorage.getItem("muteSound") === null) {
		localStorage.setItem("muteSound") = "false";
	}

	if (localStorage.getItem("muteSound") == "false") {
		soundEnabled = true;
	}else{
		soundEnabled = false;
	}

	if (soundEnabled) {
		mainAudio.play();
	}
}

// To play a sound file in audio folder by the filename
function playAudio(filename){
	if (soundEnabled) {
		var audio = new Audio("audio/" + filename) ;
		audio.play();
	}
}
//  Khloud functions
function resetLives()
{
	if(liveValue > 4 )
	{
		live.innerHTML = " Lives <img src='imgs/meteor.gif'>" + liveValue + "<img src='imgs/meteor.gif'>";
	}else
	{
		live.innerHTML = "Lives ";
		for(var i = 0; i < liveValue; i++)
		{
			live.innerHTML +="<img src='imgs/meteor.gif'>";
		}
	}
	setUserData();
}
function resetScore() 
{
	score.innerHTML = " Score +" +scoreValue;
	setUserData();
	var HighScoreLabel = document.getElementById("high-score");
	HighScoreLabel.innerHTML = "High Score : " + localStorage.getItem("HighScore") || 0;  
}
function recursion(self)
	// self.animateY(window.innerHeight - self.offsetHeight, 50000 - (scoreValue * 10), function(){
{
	var endRandomVal = 25000 - (scoreValue * 5);
	self.animateY(window.innerHeight - self.offsetHeight, 50000 - ReturnRandInt (0, endRandomVal) , function(){
		 liveValue--;
		 resetLives();

		if(liveValue === 0 )
		{
			gameOver();
		}
			self.burn(function(){
			// lifes -1
			// check if game is over
			if (liveValue) {
				self.setText(randomOperation(),0,maxNumRange);// create new question.//replace the old answer from Answers Array with the new one.
				self.setPosition();
				self.loop();
			}
		});
		// here you can decrease life by 1 and check if the game is over.
		// create new question.
		// replace the old answer from Answers Array with the new one.
	});

}
function ReturnRandInt(min, max){
  var result= Math.floor(Math.random() * (max - min+1)) + min; 
  return result;
}
function generateQuestions (self,opration,min,max)
{
	if(opration == "-")
	{
		num1 							= ReturnRandInt(min,max);
		num2 							= ReturnRandInt(min,max);
		self.children[1].innerHTML 		= num1 +" - "+ num2 + "  ?";	
		answersArr[self.id]		        = num1 - num2;
	
	}else if(opration == "+")
	{
		num1 							= ReturnRandInt(min,max);
		num2 							= ReturnRandInt(min,max);
		self.children[1].innerHTML  	= num1 +" + "+ num2 + "  ?";
		answersArr[self.id]		        = num1 + num2;
	}else if(opration == "*")
	{
		num1 							= ReturnRandInt(min,max);
		num2 							= ReturnRandInt(min,max);
		self.children[1].innerHTML 		= num1 +" X "+ num2 + "  ?";
		answersArr[self.id]		        = num1 * num2;	
	}
}
function setOprationsArr()
{
	if(scoreValue < 1000)
	{
		oprations = ["+"];
	}else if (scoreValue < 2000)
	{
		oprations = ["+","-"];
	}else if (scoreValue < 3000)
	{
		oprations = ["+","-","*"];
	}
}
function randomOperation ()
{
	setOprationsArr();
	var index = ReturnRandInt(0,oprations.length-1);
	return oprations[index];
}
function stopAll ()
{
	m1.stop();
	m2.stop();
	m3.stop();
	m4.stop();
	m5.stop();
}
function isFound(arr,val)
{
	for(var i=0; i<arr.length ;i++)
	{
		if(arr[i]==val)
		{
			return 1;
		}
	}
	return 0;
}
function repeatedAns(arr,val)
{
	var k=0;
	for(var i=0; i<arr.length;i++)
	{
		if(val==arr[i])
		{
			answerChecking(i);
			k++;	
		}
	}
	if(k > 1)
	{
		playAudio("cheer.wav");
	}
}
function answerChecking (index)
{

	document.getElementById(index).explode(function()
	{
		document.getElementById(index).setText(randomOperation(),0,maxNumRange);
		document.getElementById(index).loop();
	});
	scoreValue += 10 ;
	resetScore();
	if(scoreValue === 500  || scoreValue === 1500 || scoreValue === 2500)
	{
		maxNumRange += 10;
	}else if(scoreValue === 1000 || scoreValue === 2000 || scoreValue === 3000)
	{
		displayLevels(scoreValue);
		maxNumRange = 20;
		liveValue++;
		resetLives();

	}	
}
function playAll (){
		resetLives();
		resetScore();
		m1.setPosition(); 
		m2.setPosition();
		m3.setPosition(); 
		m4.setPosition(); 
		m5.setPosition(); 
		setTimeout(function(){
			m1.setText(randomOperation(), 0, maxNumRange);
			m1.loop(); // start an infinity loop to aninmate the meteor
		}, 100);

		setTimeout(function(){
			m2.setText(randomOperation(), 0, maxNumRange);
			m2.loop(); // start an infinity loop to aninmate the meteor

		}, 3000);


		setTimeout(function(){
			m3.setText(randomOperation(), 0, maxNumRange);
			m3.loop(); // start an infinity loop to aninmate the meteor

		}, 6000);

		setTimeout(function(){
			m4.setText(randomOperation(), 0, maxNumRange);
			m4.loop(); // start an infinity loop to aninmate the meteor
		}, 9000);

		setTimeout(function(){
			m5.setText(randomOperation(), 0, maxNumRange);
			m5.loop(); // start an infinity loop to aninmate the meteor
		}, 12000);

		playIfNotMute(); // play music in the background
		screenValue(); // initiate Lina's screen.
		
}
function stopAll ()
{
	m1.stop();
	m2.stop();
	m3.stop();
	m4.stop();
	m5.stop();
}
function animateAll()
{
	m1.animation = true;
	m2.animation = true;
	m3.animation = true;
	m4.animation = true;
	m5.animation = true;
}
function displayLevels (scoreValue)
{
	levelNum = (scoreValue / 1000)+1;
	var i = 3 ;
	var levelTimer = setInterval(function () 
	{
		if(i > -1 )
		{
			stopAll();
			levels.innerHTML = "LEVEL "+ levelNum + "<br> " + i;
			i--; 
		}else if (i==-1) 
		{
			levels.innerHTML = "";
			animateAll();
			playAll();
			clearInterval(levelTimer);
		}
	},1000)
	
}
function getUserData()
{
	if (localStorage.getItem("HighScore") === null) {
		localStorage.setItem("HighScore",0);
	}

	for(var i=0;i<Object.keys(localStorage).length;i++)
	{
        if(Object.keys(localStorage)[i]=="Lives")
        {
        	liveValue = parseInt(localStorage[Object.keys(localStorage)[i]]);
        	
        }else if (Object.keys(localStorage)[i]=="Score")
        {
        	scoreValue = parseInt(localStorage[Object.keys(localStorage)[i]]);
        }
    }
}
function setUserData()
{
	localStorage.setItem("Lives",liveValue);
	localStorage.setItem("Score",scoreValue);
}
function gameOver()
{
 	stopAll();
	levels.innerHTML = "GAME OVER";

	localStorage.removeItem("Lives");
	 if (localStorage.getItem("HighScore") === null) {
	 	localStorage.setItem("HighScore",scoreValue);
	 }else{
	 	if (scoreValue > localStorage.getItem("HighScore")) {
	 		localStorage.setItem("HighScore",scoreValue);
	 	}
	 }

	 //TODO
	 // if start from scratch is enabled
		localStorage.setItem("Score",0);
	 // else
	    // localStorage.setItem("Score",scoreValue);
}