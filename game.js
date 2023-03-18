buttonColours = ["red", "blue", "green", "yellow"];

//General Variables:
var gamePattern = [];
var userClickPattern = [];
var level = 0

// START THE GAME
var started = false;
$(document).keydown(function(){
  while(started===false) {nextSequence();
  started = true;
  $("h1").text("Level "+level+".")}
});


// PERSON USER
$(".btn").click( function(){
  userChosenColour = $(this).attr("id");

  animatedPress(userChosenColour);

  userClickPattern.push(userChosenColour);

  makeSound(userChosenColour);

  checkAnswer(userClickPattern.length-1);
});

// COMPUTER USER
function nextSequence(){
  userClickPattern = [];

  level++;
  $("h1").text("Level "+level+".");

  randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  makeSound(randomChosenColour);
  console.log(gamePattern); ff
}


// LOGIC OF THE GAME

function checkAnswer(currentLevel) {
  var lastUser = userClickPattern[currentLevel];
  var lastGame = gamePattern[currentLevel];

  if (lastGame === lastUser) {
    console.log("success");
    if(gamePattern.length  ===  userClickPattern.length ){
      setTimeout(function () {
        nextSequence();
      }, 500);
    }

  } else{
    console.log("wrong");
    var wrongSound = new Audio('sounds/wrong.mp3');
    wrongSound.play();
    $("body").css("backgroundColor", "red");
    $("h1").text("Press A Key to Start");
    startOver();
  }
}



// FUNCTIONS

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}

function animatedPress(currentColour){
  $("."+currentColour).addClass("pressed");
  setTimeout(function () {
    $("."+currentColour).removeClass("pressed");
  }, 100);
}

function makeSound(name) {
  var audio = new Audio('sounds/'+name+'.mp3');
  audio.play();
}
