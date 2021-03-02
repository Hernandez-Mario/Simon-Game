//Global scope variables

var userClickedPattern = []; //An array to hold user click pattern

var gamePattern = []; //An array to hold game patter

var level = 0; // A variable to hold the games current level, begins at 0

//End of Global scope variables


$(document).on("keydown", startGame); //adds a keydown event listener to the entire html document, if a keydown is pressed call startGame function

$(".btn").on("click", handler); //adds a click event listener to all html elements that have a ".btn" class. The green, red, yellow, & blue div containers. Then calls the handler function to handle the click event

//Functions

function startGame(){ //StartGame starts the inital game. Is called at the initial load of the website or when a user wants to restart game due to gameOver function being called
  if($("h1").text() === "Press A Key to Start" || $("h1").text() === "Game Over, Press Any Key to Restart"){ //If h1 text equals either string then proceed
    setTimeout(nextSequence, 500); //call nextSequence after 500 miliseconds
  }
}

function nextSequence(){ //nextSequence holds the logic of the game flow. Is called at the start of a new game or when a user has successfully completed a level

  userClickedPattern = []; //reset userClickedPattern Array to an empty array, is refilled after each level based on user clicks

  var randomNumber = Math.round(Math.random()*3); //returns a random number between 0-3 and assigns it to a randomNumber

  var buttonColors = ["red", "blue", "green", "yellow"]; //creates an array corresponding to the possible color square choices

  var randomChosenColor = buttonColors[randomNumber]; //using randomNumber, returns an element in buttonColors array

  gamePattern.push(randomChosenColor); //adds the random element to the gamePattern array

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100); //selects the HTML element that has a unique id of the color chosen and creates the animation to show user which color is next is simon game

  playSound(randomChosenColor); //calls playSound function and passes in the random color chosen

  level++; //Increase level by 1

  $("h1").text("Level " + level); //Select h1 element in HTML document and changes the text to display the new level

}

function handler(){ //function to handle the click event

  var userChosenColor = this.id; //stores the id to the div container (red blue yellow blue rectangles) and stores the id (red blue yellow or green) in a variable

  userClickedPattern.push(userChosenColor); //adds the element to the userClickedPattern array

  playSound(userChosenColor); //calls playSound function and passes in userChosenColor (red blue green yellow)

  animatePress(userChosenColor); //calls animatePress function and passes in userChosenColor

  checkAnswer(userClickedPattern.length-1); //calls checkAnswer and passes in the position of the current element that was added to the userClickedPattern array

}


function playSound(name){ //function to play the corresponding sound audio of the string passed in

  var audio = new Audio(name + ".mp3") //creates new Audio object and passes in the source of the audio file

  audio.play(); //plays audio file
}

function animatePress(currentColor){ //function to animate user clicks based on color chosen

  var buttonClicked = $("#" + currentColor); //selects the HTML element with the id = to currentColor and assins it to a variable

  buttonClicked.addClass("pressed"); //adds a css class ".pressed" to the html element

  setTimeout(function(){ //after 100 miliseconds removes ".pressed" class
    buttonClicked.removeClass("pressed")
  }, 100);

}

function checkAnswer(currentLevel){ //function to add logic to check if the user click patterns matches the game sequence pattern or does not

  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){ //if the element in the position of both arrays match procceed
    if(gamePattern.length === userClickedPattern.length){ //if both arrays are the same length then call nextSequence after 500 miliseconds
      setTimeout(nextSequence, 500);
    }
  }
  else { //else call gameOver function
   gameOver();
 }

}

function gameOver(){ //function to end the game

  playSound("wrong"); //play wrong audio file

  $("body").addClass("game-over"); //show game over animation to user

  setTimeout(function(){ //remove game over animation after 200 miliseconds
    $("body").removeClass("game-over");
  }, 200);

  $("h1").text("Game Over, Press Any Key to Restart"); //select HTML element h1 and change text

  startOver(); //call startOver function

}


function startOver(){//function that resets all global variables to original values

  userClickedPattern = [];

  gamePattern = [];

  level = 0;
}
