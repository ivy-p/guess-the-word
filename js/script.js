// =======Model Section=======

//  GLOBAL VARIABLES
// unordered list where player’s guessed letters will appear.
const guessedLetters = document.querySelector(".guessed-letters");
// The button with the text “Guess!” in it.
const guessButton = document.querySelector(".guess");
// The text input where the player will guess a letter.
const textInput = document.querySelector(".letter");
// The empty paragraph where the word in progress will appear.
const wordInProgress = document.querySelector(".word-in-progress");
// The paragraph where the remaining guesses will display.
const remainingGuesses = document.querySelector(".remaining");
// The span inside the paragraph where the remaining guesses will display.
const remainingGuessesSpan = document.querySelector(".remaining span");
// The empty paragraph where messages will appear when the player guesses a letter.
const message = document.querySelector(".message");
// The hidden button that will appear prompting the player to play again.
playAgainButton = document.querySelector(".play-again");

// Starting word to test game functionality pre-API fetch
const word = "magnolia";
//array to contain all the letters player guesses
const guessedLettersArray = [];

// =======View Section=======
//=======Controller Section=======


// circle symbols (●) will stay on the screen until the correct letter is guessed 
const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word);

guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    //empty message paragraph
    message.innerText = "";
    //grabbing what was entered in the input
    const guess = textInput.value;
    //Making sure it is a single letter with the validate function
    const goodGuess = validate(guess);

    if (goodGuess) {
        //We've confirmed a letter was entered. Let's guess
        makeGuess(guess);
    }
    textInput.value = "";
    });

//ensuring that the value entered into the website is a letter, not a number or special character.
const validate = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        //if the input box is empty
        message.innerText = "Please enter a letter to begin guessing.";
    } else if (input.length > 1) {
        //if more than one value was entered
        message.innerText = "Oops! Please enter one letter at a time.";
    } else if (!input.match(acceptedLetter)) {
        //a letter was not entered
        message.innerText = "Please enter a letter from A to Z.";
    } else {
        return input;
    }
};

const makeGuess = function (guess) {
   //check to see if your guessedLetters array already contains that letter 
   guess = guess.toUpperCase();
   if (guessedLettersArray.includes(guess)) {
    message.innerText = "Looks like you already guessed that letter! Try again.";
   } else {
    guessedLettersArray.push(guess);
    console.log(guessedLettersArray);
   }
};