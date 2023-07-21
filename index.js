
//creating array for button colors
var btnColors=["red","blue","green","yellow"];

// creating a var to save the game pattern
var gamePattern=[];

//creating a var to save the user clicked pattern
var userClickedPattern=[];

// now the game has not started,so false
var started=false;

//and game not started so,level is 0
var level=0;


// creating a function to tell the user to press a key to start the game
$(document).keypress(function(){

    // !started because, here we want to display the level 1, level 2 text.
    // started has a value false, so if not started is true.
    // it means if started is true display level 1 ,,,,,,etc...
    //and if started is false, then change then display "press any key to start"
   if(!started){
    $("#level-title").text("Level"+level);
    nextSequence();
    started=true;
   }
});

$(".btn").click(function(){
    //creating a var to store the id of the button that is clicked
    var userChosenColor =$(this).attr("id");

    //add the pattern which the user clicked to the userchoosencoloe
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);


    checkAnswer(userClickedPattern.length-1);
});

// creating a function for sequence generation   
function nextSequence()
{

    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    //generating random number from 0 to 3
    var randomNum=Math.floor(Math.random()*4);

    // choosing random button color from array btncolors
    var randomChoosenColor=btnColors[randomNum];

    //adding the randomly choosen color to the array gamePattern
    gamePattern.push(randomChoosenColor);
    // adding flash effect
    $("#"+randomChoosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
   // playing sound
   playSound(randomChoosenColor);
    
}

function playSound(name){
// playing sound
var audio=new Audio("sounds/"+name+".mp3");
audio.play();
}
// function to create animation when pressed
function animatePress(currentColor){

    // currentcolor is the var used to store the btn pressed and we r adding the pressed class to make the effect work
    $("#"+currentColor).addClass("pressed");
    
// setting timeout to remove the effect
// using # symbol to represent the id of the pressed btn plus mentioning the currentcolor function added to it
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
    
}


function checkAnswer(currentLevel){
  //checking the current level of the game patternis equal to the current level of the user click
    if(gamePattern[currentLevel]=== userClickedPattern[currentLevel]){
        console.log("success");
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function () {
                nextSequence();
                
            },1000);
        }

    } else{
        console.log("wrong");
        //playing the sound wrong when user gets it wrong
        playSound("wrong");
         // setting timeout to remove the game over effect
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        },200);

        $("#level-title").text("Oops! ,You got it wrong. Refresh the page to restart")
    }    

     }
    // the user clicks wrong then using the function startover
     function startOver(){
     //now all the variables have no values, and they start over again
        level=0;
        gamePattern=[];
        started=false;
     }

