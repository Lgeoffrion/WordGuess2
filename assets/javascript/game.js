//Variables
var heroChoices = ["CAPTAIN AMERICA", "IRON MAN", "ANT MAN", "VISION", "BLACK PANTHER", "THE INCREDIBLE HULK", "SPIDER MAN", "STAR LORD", "GROOT", "DOCTOR STRANGE", "ROCKET RACOON", "GAMORA"];
var guesses = 6;
var wins = 0;
var losses = 0;
var wordToGuess = [];
var lettersGuessed = [];
var alreadyGuessed = false;
var winner = true;

//Start button runs function to pick a name and start the game
function startGame() {
      //reset guessed letter array
      lettersGuessed = [];
      $("#guessed-letters").html(lettersGuessed);
      //reset guesses
      guesses = 6;
      $("#guessesLeft").html(guesses);
    //generates a random number based of the length of the heroChoices array. 
    // Uses that number to select the hero within the array
    randomHero = Math.floor((Math.random() * heroChoices.length));
    currentHero = heroChoices[randomHero];
    console.log(currentHero); //for testing purposes so i know what hero was selected
    //reset array for new game
    wordToGuess = [];

    //Generates spaces or _ for the hero name to be revealed with correct guesses
    for (var i = 0; i < currentHero.length; i++) {
        if (currentHero[i] === " ") {
            wordToGuess[i] = " ";
        } else {
            wordToGuess[i] = ("_");
        }
        $("#currentHero").html(wordToGuess);
    }
}

//Recording Letter guesses on keyup
document.onkeyup = function (event) {
    var guessLetter = String.fromCharCode(event.which).toUpperCase();
    // console.log(event.which);
    console.log(guessLetter);

    //Check to see if letter was already guessed
    for (var i = 0; i < lettersGuessed.length; i++) {
        if (guessLetter === lettersGuessed[i]) {
            alreadyGuessed = true;
            console.log("alreadyGuessed ", alreadyGuessed);
        }
    }

    //Looks to see if letter is in the hero to guess - if correct displays letter
    for (var i = 0; i < currentHero.length; i++) {
        if (currentHero[i] === guessLetter) {
            wordToGuess[i] = currentHero[i];
            correctGuess = true;
            console.log ("correct guess =", correctGuess)
        }
    }

    //if letter hasnt been guesses and is not in the word the following happens
    if (alreadyGuessed == false && correctGuess == false) {
        lettersGuessed.push(guessLetter);
        guesses--;
        $("#guessesLeft").html("You have " + guesses + " left.");
    }

    //displayed guess letters and hidden hero that is being guessed at
    $("#guessed-letters").html(lettersGuessed);
    $("#currentHero").html(wordToGuess);
    //resets booleans
    alreadyGuessed = false;
    correctGuess = false;

    //win lose checks
    if (lettersGuessed.length == 6) {
        losses++;
        $("#losses").html(losses);
        $("#winOrLose").html(currentHero + " lost! Thanos has destroyed half of all life.")
        startGame();
    } else {
        winCheck();
    }
}

//function checking to see if a winner
function winCheck() {
    //checking to see if any _ still exist - if they do no win
    for (var i = 0; i < currentHero.length; i++) {
        if (wordToGuess[i] == "_") {
            winner = false;
            console.log("Not a winner yet")
        }
    }

    //all _ filled in = winner!
    if (winner == true) {
        console.log("You're a winner!");
        $("#winOrLose").html(currentHero + " has defeated Thanos!");
        wins++;
        $("#wins").html(wins);
        startGame();
    }
    winner = true;
};




$(document).ready(function () {
    $("#startButton").click(function () {
        startGame();
      
        document.getElementById("startButton").style.display = "none";
    });
});