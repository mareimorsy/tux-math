window.addEventListener("load", function(e) {

		document.getElementById("disc_div").innerHTML="Let's PLAY !";
		document.getElementById('0').setAttribute("style","background-color: #00aaee; opacity: 1px;");

	var audio=document.getElementById("audio-player");
		audio.autoplay = true;
		if (localStorage.getItem("muteSound") === null) {
			localStorage.setItem("muteSound", "false");
		}

		if(localStorage.getItem("muteSound").toLowerCase()=="true")
			audio.muted=true;
		else
			audio.muted=false;	
});



//------------------------------------------------------ sound control ------------------------------------------------------------------------//

var sound=document.getElementById("audio-player");

//------------------------------------------------------- move bigtux --------------------------------------------------------------------------//

function moveBigTuxEyes(i, interval) {
    setTimeout(function () {

            	var bigtux=document.getElementById("bigtux").src="imgs/menu/bigtux"+ i +".png";

				i++;

            	if(i==7){ // if counter exceeded images number reset it back to 0
            		i=0;
            	}

            	if (i == 1) { // if this is the first image just pause for a longer time
            		interval = 2500;
            	}else{ // otherwise make it faster
            		interval = 250;
            	}

            	moveBigTuxEyes(i, interval); // it's just invokes it self again with new parameters
        			
    }, interval);
};

//------------------------------------------------------------ Full Screen -----------------------------------------------------------------------//

var gameFrame = document.getElementById("game_frame");
var fullScreenToggleCounter = 1;
var isFullScreen = 0;

function startGame(){
	gameFrame.src = "game.html";
	gameFrame.style.display = 'block';
	gameFrame.allowFullscreen = true;
	var requestFullScreen = gameFrame.requestFullscreen || gameFrame.msRequestFullscreen || gameFrame.mozRequestFullScreen || gameFrame.webkitRequestFullscreen;
	requestFullScreen.call(gameFrame);
	sound.pause();
	setTimeout(function(){
		gameFrame.focus();
	}, 1000);
}

if (document.addEventListener)
{
    document.addEventListener('webkitfullscreenchange', exitHandler, false);
    document.addEventListener('mozfullscreenchange', exitHandler, false);
    document.addEventListener('fullscreenchange', exitHandler, false);
    document.addEventListener('MSFullscreenChange', exitHandler, false);
}

function exitHandler()
{
    if (document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement !== null)
    {
        if (fullScreenToggleCounter % 2 != 0) {
        	isFullScreen = 1;
        }else{
        	isFullScreen = 0;
        	gameFrame.src = "";
        	gameFrame.style.display = "none";
        	sound.play();
        	var currentScore = localStorage.getItem("Score") || 0;
        	var highScore = localStorage.getItem("HighScore") || 0;

        	if ( currentScore > highScore) {
        		localStorage.setItem("HighScore", currentScore);
        	}

        }
        fullScreenToggleCounter++;
    }
}

//------------------------------------------------------------ mouse move -----------------------------------------------------------------------//
function mouseMove()
{
	var menuChilds=document.getElementsByClassName("child");

	menuChilds[0].addEventListener("mousedown",function() {
			//window.location.href = "game.html";

startGame()
			//	 window.location.href = "file:///E:/Alaa/javascript/Game%20Project/Alaa%20Task/Game_day5/Game/index.html";
	});	

menuChilds[0].addEventListener("mouseover",function() {
			document.getElementById("disc_div").innerHTML="Let's PLAY !";
			document.getElementById('options').setAttribute("style","display:none;");

});

menuChilds[1].addEventListener("mouseover",function() {
			document.getElementById("disc_div").innerHTML="More Options :  Volume Setting";
			document.getElementById("arrow").setAttribute("style","top: 210px;")
			document.getElementById('0').setAttribute("style","background-color: #0000ab; opacity: 1px; ");
			document.getElementById('1').setAttribute("style","background-color: #00aaee; opacity: 1px; ");
});	
menuChilds[1].addEventListener("mouseleave",function() {
			document.getElementById("disc_div").innerHTML="Let's PLAY !";
			document.getElementById("arrow").setAttribute("style","top: 150px;")
			document.getElementById('1').setAttribute("style","background-color: #0000ab; opacity: 1px; ");
			document.getElementById('2').setAttribute("style","background-color: #0000ab; opacity: 1px; ");
			document.getElementById('0').setAttribute("style","background-color: #00aaee; opacity: 1px; ");
});	
menuChilds[1].addEventListener("mousedown",function() {
		document.getElementById("disc_div").innerHTML="sound control";
						//document.getElementsByClassName("parentDiv")[0].setAttribute("style","display:none");
						document.getElementById('options').setAttribute("style","");
						//document.getElementById("arrow").setAttribute("style","display:none;");
											document.getElementById("mute").addEventListener("click",function()
							{
    							sound.muted = true;
    							localStorage.setItem("muteSound", "true");
    							document.getElementById('options').setAttribute("style","display:none;");
							});
						document.getElementById("play").addEventListener("click",function()
							{
    							sound.muted = false;
    							 localStorage.setItem("muteSound", "false");
    							document.getElementById('options').setAttribute("style","display:none;");

							});});	
	
menuChilds[2].addEventListener("mouseover",function() {
			document.getElementById("disc_div").innerHTML="Quiting the game";
			document.getElementById("arrow").setAttribute("style","top: 277px;");
			document.getElementById('0').setAttribute("style","background-color: #0000ab; opacity: 1px; ");
			document.getElementById('1').setAttribute("style","background-color: #0000ab; opacity: 1px; ");
			document.getElementById('2').setAttribute("style","background-color: #00aaee; opacity: 1px; ");
			 document.getElementById('options').setAttribute("style","display:none;");

});	

menuChilds[2].addEventListener("mouseleave",function() {
			document.getElementById("disc_div").innerHTML="Let's PLAY !";
			document.getElementById("arrow").setAttribute("style","top: 150px;");
			document.getElementById('1').setAttribute("style","background-color: #0000ab; opacity: 1px; ");
			document.getElementById('2').setAttribute("style","background-color: #0000ab; opacity: 1px; ");
			document.getElementById('0').setAttribute("style","background-color: #00aaee; opacity: 1px; ");
});
	menuChilds[2].addEventListener("mousedown",function() {
	if(confirm("Are you sure you want to quit?"))
	{
		window.close();
	}
});

document.getElementById("cls").addEventListener("click",function(){
		window.close();
	});

document.getElementById("options").addEventListener("mouseover",function()
	{
			document.getElementById("arrow").setAttribute("style","top: 210px;")
			document.getElementById('0').setAttribute("style","background-color: #0000ab; opacity: 1px; ");
			document.getElementById('1').setAttribute("style","background-color: #00aaee; opacity: 1px; ");
	});
}

//------------------------------------------------- move up/down function -------------------------------------------------//
	var down=0;
	var go=0;
function move(e)
{
if (e.keyCode == 27) {
	gameFrame.src = "";
}
if( e.keyCode =='40' || e.which== '40') //down
{ 
	down++;
	if(down==1)
	{	
		go=1;
		document.getElementById(down-1).setAttribute("style","background-color: #0000ab; opacity: 1px; ");
		document.getElementById("disc_div").innerHTML="More Options :  Volume Setting";
		document.getElementById('0').setAttribute("style","background-color: #0000ab; opacity: 1px; ");
		document.getElementById(down).setAttribute("style","background-color: #00aaee; opacity: 1px; ");
		document.getElementById("arrow").setAttribute("style","top: 210px;");
	}
	else if(down==2)
	{
		go=2;
		document.getElementById(down-1).setAttribute("style","background-color: #0000ab; opacity: 1px; ");
		document.getElementById("disc_div").innerHTML="Quit the game";
		document.getElementById('0').setAttribute("style","background-color: #0000ab; opacity: 1px; ");
		document.getElementById(down).setAttribute("style","background-color: #00aaee; opacity: 1px; ");
		document.getElementById("arrow").setAttribute("style","top: 277px;");
		document.getElementById('options').setAttribute("style","display:none;");

	}
	else if(down>2)
	{
		go=0;
		document.getElementById(down-1).setAttribute("style","background-color: #0000ab; opacity: 1px; ");
		document.getElementById("disc_div").innerHTML="Let's PLAY !";
		document.getElementById('0').setAttribute("style","background-color: #00aaee; opacity: 1px; ");
		document.getElementById("arrow").setAttribute("style","top: 150px;");
		 document.getElementById('options').setAttribute("style","display:none;");

		down=0;
	}
}
if( e.keyCode =='38' || e.which== '38') //up
{	
	down--;
	if(down==1)
	{	
		go=1;
		document.getElementById(down+1).setAttribute("style","background-color: #0000ab; opacity: 1px; ");
		document.getElementById('0').setAttribute("style","background-color: #0000ab; opacity: 1px; ");
		document.getElementById("disc_div").innerHTML="More Options :  Volume Setting";
		document.getElementById(down).setAttribute("style","background-color: #00aaee; opacity: 1px; ");
		document.getElementById("arrow").setAttribute("style","top: 210px;");
	}
	else if(down==0)
	{
		go=0;
		document.getElementById(down+1).setAttribute("style","background-color: #0000ab; opacity: 1px; ");
		document.getElementById("disc_div").innerHTML="Let's PLAY! ";
		document.getElementById('0').setAttribute("style","background-color: #00aaee; opacity: 1px; ");
		document.getElementById("arrow").setAttribute("style","top: 150px;");
		document.getElementById('options').setAttribute("style","display:none;");

	}
	else if(down<0)
	{	
		go=2;
		document.getElementById('0').setAttribute("style","background-color: #0000ab; opacity: 1px; ");
		document.getElementById('1').setAttribute("style","background-color: #0000ab; opacity: 1px; ");
		document.getElementById("disc_div").innerHTML="Quit the game";
		document.getElementById('2').setAttribute("style","background-color: #00aaee; opacity: 1px; ");
		document.getElementById("arrow").setAttribute("style","top: 277px;");
	  document.getElementById('options').setAttribute("style","display:none;");
		down=2;
	}
}

//------------------------------------------------- Enter btn functionality -------------------------------------------------//
		if( e.keyCode=='13' || e.which =='13')
			{
				if(go==0)
					{
						startGame();
					}
				if(go==1)
					{	
						//alert(document.getElementById('1').children[0].children[0].textContent);	 
						var sound=document.getElementById("audio-player");
						document.getElementById("disc_div").innerHTML="sound control";
						//document.getElementsByClassName("parentDiv")[0].setAttribute("style","display:none");
						document.getElementById('options').setAttribute("style","");
						//document.getElementById("arrow").setAttribute("style","display:none;");
						document.getElementById("mute").addEventListener("click",function()
							{
    							sound.muted = true;
    							localStorage.setItem("muteSound", "true");
    							document.getElementById('options').setAttribute("style","display:none;");
							});
						document.getElementById("play").addEventListener("click",function()
							{
    							sound.muted = false;
    							 localStorage.setItem("muteSound", "false");
    							document.getElementById('options').setAttribute("style","display:none;");

							});
					}					
				if(go==2)
					{		if(confirm("Are you sure you want to quit?"))
								{
									window.close();
								}}
				}
}

//--------------------------------------------------------------------------------------------------------------------------//
document.addEventListener("keydown",move);
moveBigTuxEyes(0, 0); // i = 0, time = 0
mouseMove();


