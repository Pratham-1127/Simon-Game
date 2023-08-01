var buttoncolors = ["red", "blue", "yellow", "green"];
var gamepattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function(){
    if(!started){
        nextSequence();
        started = true;
    }
});

$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatepress(userChosenColor);
    checkPattern(userClickedPattern.length-1);
});


function checkPattern(currentLevel){
    if(gamepattern[currentLevel] === userClickedPattern[currentLevel]){
        if(gamepattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSequence()
            }, 1000);
        }
    }
    else{
        var over = new Audio("./sounds/wrong.mp3");
        over.play();
        $("h1").text("Game Over");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over !! Press any key to restart");
        startover();
    }
}

function startover(){
    level = 0;
    started = false;
    gamepattern = [];
}


function nextSequence(){
    userClickedPattern = [];
    level++;
    $("h1").text("Level-"+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomchoosencolor = buttoncolors[randomNumber];
    gamepattern.push(randomchoosencolor);
    $(buttoncolors[randomchoosencolor]).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomchoosencolor);
    animatepress(randomchoosencolor);
}

function playSound(name){
    var playSound = new Audio("sounds/"+name+".mp3");
    playSound.play();
}

function animatepress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}





