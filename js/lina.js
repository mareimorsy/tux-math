var canvas = document.getElementById('counter') ;
var ctx = canvas.getContext("2d");

ctx.font = "42px Orbitron";
ctx.textAlign="center";

var enteredValue=0;
var count = 0;
var minusFlag = false;

var counterValue = function(e){


    if( e.keyCode == 189){
        if(minusFlag == false){
            counter++;
                if(enteredValue == 0){
                    minusFlag = true;
                    enteredValue = "-";
                }
                else if(count == 4){
                    minusFlag = true;
                    var temp = enteredValue.toString();
                    temp = temp.replace(enteredValue[3],"")
                    enteredValue = "-";
                    enteredValue += temp;
                } 
                else{
                    minusFlag = true;
                    var temp = enteredValue.toString();
                    enteredValue = "-";
                    enteredValue += temp;   
                }   
        }
        else if (minusFlag == true){
            counter--;
                var temp = enteredValue.toString()    
                enteredValue = temp.replace(enteredValue[0],"")
                minusFlag = false;
        }
    ;    
    }

    if ((e.keyCode >= 48) && (e.keyCode <= 57) && (count < 4)){
        count++;
        var res = e.keyCode - 48;

        if(minusFlag == true){
                if(res == 0){
                    enteredValue = 0;
                }
                else{
                    var temp = enteredValue.toString();       
                    enteredValue = temp + res.toString();
                }
        }
        else{
            if(enteredValue == 0){
                enteredValue = res;
            }
            else{
                var temp = enteredValue.toString();       
                enteredValue = temp + res.toString(); 
            }    
        }
    }
    else if((e.keyCode >= 48) && (e.keyCode <= 57) && (count >= 4)){
        enteredValue = 0;
        count = 0;
        count++;
        minusFlag = false;

        var res = e.keyCode - 48;
        if((minusFlag == true) && (res == 0)){
            enteredValue = 0;
        }
        else{
            if(enteredValue == 0){
                enteredValue = res;
            }
            else{
                var temp = enteredValue.toString();       
                enteredValue = temp + res.toString(); 
            }    
        }
    }

    if (e.keyCode == 46){
        enteredValue = 0;
        count = 0;
        minusFlag = false;
    }

    if (e.keyCode == 8){

        if(enteredValue.length == 1){
            enteredValue = 0;
            count = 0;
            minusFlag = false;
        }
        else if(enteredValue.length > 1){
        var lastIndex = enteredValue.length -1;
        var temp = enteredValue.toString();
        enteredValue = temp.replace(enteredValue[lastIndex],"")
        count --;
        }   
    }

    else if (e.keyCode == 13 || (e.keyCode == 32)){
            
                playAudio('laser.wav'); // play laser sound

                if (enteredValue == -0 || enteredValue == "-"){
                    enteredValue = 0;
                }
                
                if (isFound(answersArr,enteredValue) != 0 ){
                    repeatedAns(answersArr,enteredValue);
                }
                else{
                    playAudio('buzz.wav'); // play laser sound
                }        
        enteredValue = 0; 
        count =0; 
        minusFlag = false;  
    
    // play sound while typing
    playAudio('tock.wav'); // todo : playsound only when the key is valid
    }
    screenValue();
} 

function screenValue(){ 
    ctx.clearRect(0, 0, 165, 49);
    ctx.fillStyle = "white";
    ctx.fillText(enteredValue, 82, 38);
} 
    
window.addEventListener("keyup", counterValue);