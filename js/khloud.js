var m1 = document.getElementById(0); // Meteor 1
// var m2 = document.getElementById(1);
// var m3 = document.getElementById(2);
// var m4 = document.getElementById(3);
// var m5 = document.getElementById(4);
var endPlay = document.getElementById("gameOver");
// console.log(endPlay);
var smooth = 400; // increase this to get high smooth animations
var soundEnabled = true; // set this to false to mute the game
var mainAudio   = new Audio("audio/tuxi.ogg" ); // play music in the background
var answersArr  = [];
var oprations   = [];
var liveValue   = 5;
var scoreValue  = 0;
var maxNumRange = 20;

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
}
function resetScore() 
{
	
	score.innerHTML = " Score +" +scoreValue; 
}
function ReturnRandInt(min, max){
  var result= Math.floor(Math.random() * (max - min+1)) + min; 
  return result;
}

function isFound(arr,val)
{
	for(var i=0; i<arr.length ;i++)
	{
		if(arr[i]==val)
		{
			return i;
		}
	}
	return -1;
}
function findIndexById(self)
{
	index = -1;
	for(var i = 0; i < 5; i++)
	{
		if(self.id == i)
		{
			index = i;
		}
	}
	return index;
}
function generateQuestions (self,opration,min,max)
{
	answerIndex = findIndexById(self);
	if(opration == "-")
	{
		num1 							= ReturnRandInt(min,max);
		num2 							= ReturnRandInt(min,max);
		self.children[1].innerHTML 		= num1 +" - "+ num2 + "??";
		if(answerIndex!= -1)
		{
			answersArr[answerIndex]		= num1 - num2;
		}
		
	}else if(opration == "+")
	{
		num1 							= ReturnRandInt(min,max);
		num2 							= ReturnRandInt(min,max);
		self.children[1].innerHTML  	= num1 +" + "+ num2 + "??";
		if(answerIndex!= -1)
		{
			answersArr[answerIndex]		= num1 + num2;
		}
	}else if(opration == "*")
	{
		num1 							= ReturnRandInt(min,max);
		num2 							= ReturnRandInt(min,max);
		self.children[1].innerHTML 		= num1 +" X "+ num2 + "??";
		if(answerIndex!= -1)
		{
			answersArr[answerIndex]		= num1 * num2;;
		}	
	}else if(opration == "/")
	{
		var divisible = 0;
		while (divisible == 0 )
		{
			num1 						= ReturnRandInt(min,max);
			num2 						= ReturnRandInt(min,max);
			if(num1%num2 == 0 && num1 != 0 && num2 != 1)
			{
				self.children[1].innerHTML  	= num1 +" / "+ num2 + "??";
				if(answerIndex!= -1)
				{
					answersArr[answerIndex]		= num1 / num2;
				}
				divisible 	= 1 ;
			}
		}
	}
}
function setOprationsArr()
{
	if(scoreValue < 100)
	{
		oprations = ["+"];
	}else if (scoreValue < 200)
	{
		oprations = ["+","-"];
	}else if (scoreValue < 300)
	{
		oprations = ["+","-","*"];
	}else if (scoreValue < 400)
	{
		oprations = ["+","-","*","/"];
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
function answerChecking (answer)
{
		// console.log("true");
		document.getElementById(index).explode();
		scoreValue += 10 ;
		resetScore();
		if(scoreValue === 100 || scoreValue === 200 || scoreValue === 300)
		{
			maxNumRange += 10;
			liveValue++;
			resetLives();
		}
		document.getElementById(index).setText(randomOperation(),0,maxNumRange);
		document.getElementById(index).loop();	
}
// function recursion(self)
// {
// 	// console.log(self);
// 	self.animateY(window.innerHeight - m1.offsetHeight,6000 - (scoreValue * 10), function()
// 	{
		
// 		 liveValue--;

// 		if(liveValue === 0 )
// 		{
// 			resetLives();
// 			stopAll();
// 			endPlay.innerHTML = "GAME OVER";
// 		}else 
// 		{
// 			resetLives()
// 			self.setText(randomOperation(),0,maxNumRange);// create new question.//replace the old answer from Answers Array with the new one.
// 			// self.right(console.log(ReturnRandInt(0,window.innerWidth-m1.offsetWidth)));
// 			self.goUp();
// 			self.up(200);
// 			//loop
// 		}
// 		self.burn(function(){
// 			console.log(self);
// 			self.loop();
// 		});
// 	})
// }
// When the window loads all its content
window.addEventListener("load", function(){

	m1.right(500); // set meteor position to the right by 750px
	m1.goUp(); // set meteor top position outside screen range
	// m1.loop(); // start an infinity loop to aninmate the meteor
	recursion();
	// mainAudio.play(); // play music in the background
	screenValue(); // initiate Lina's screen.
});

function startGame()
{
	resetLives();
	// console.log("hi");
	m1.right(500);
	m2.right(200);
	m3.right(900);
	m4.right(700);
	m5.right(400);
	m1.setText(randomOperation(),0,maxNumRange);
	m2.setText(randomOperation(),0,maxNumRange);
	m3.setText(randomOperation(),0,maxNumRange);
	m4.setText(randomOperation(),0,maxNumRange);
	m5.setText(randomOperation(),0,maxNumRange);
	m1.loop();
	m2.loop();
	m3.loop();
	m4.loop();
	m5.loop();
}
//startGame();