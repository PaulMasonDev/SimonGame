var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

function nextSequence(){
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    playSound(randomChosenColor);
    $("." + randomChosenColor).fadeOut(100).fadeIn(100);
    level++;
    $("h1").text("Level " + level);
}

$(".btn").click(function(){
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
    console.log(userClickedPattern);
});

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

$(document).keypress(function(event){
    nextSequence();
});

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if(userClickedPattern.length ===  gamePattern.length){
            setTimeout(function() {
                nextSequence();
                userClickedPattern = [];
            }, 1000);
        }
    } else {
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        console.log("WRONG");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart"); 
        startOver();  
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}