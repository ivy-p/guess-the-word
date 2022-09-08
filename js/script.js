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
const remaining = document.querySelector(".remaining");
// The span inside the paragraph where the remaining guesses will display.
const remainingGuessesSpan = document.querySelector(".remaining span");
// The empty paragraph where messages will appear when the player guesses a letter.
const message = document.querySelector(".message");
// The hidden button that will appear prompting the player to play again.
playAgainButton = document.querySelector(".play-again");

// Starting word to test game functionality pre-API fetch
let word = "magnolia";
//array to contain all the letters player guesses
const guessedLettersArray = [];
let remainingGuesses = 8;
// =======View Section=======
//=======Controller Section=======
const getWord = async function () {
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");

    const words = await response.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeholder(word);
}

getWord();

// circle symbols (●) will stay on the screen until the correct letter is guessed 
const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        //console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

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
    guessesLeft(guess);
    showGuessedLetters();
    updateWordInProgress(guessedLettersArray);
   }
};

//this function will update the page with the letters the player guesses.
const showGuessedLetters = function () {
    //clearing the list first
    guessedLetters.innerHTML = "";
    //Create a new list item for each letter inside your guessedLetters array (i.e., the global variable) and add it to the unordered list.
    for (const letter of guessedLettersArray) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLetters.append(li);
    }
};

//this function updates the word in progress, and will replace the circle symbols with any correct guesses.
const updateWordInProgress = function (guessedLettersArray) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];

    for (const letter of wordArray) {
        if (guessedLettersArray.includes(letter)) {
            revealWord.push(letter.toUpperCase());
        } else {
            revealWord.push("●");
        }
    }
    wordInProgress.innerText = revealWord.join("");
    winCheck();
};

const guessesLeft = function (guess) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)) {
        message.innerText = `Look like the word doesn't have a ${guess}. Guess again!`
        remainingGuesses -= 1;
    } else {
        message.innerText = "You got that one right! Keep going!";
    };

    if (remainingGuesses === 0) {
        message.innerHTML = `Game over! The word was <span class="highlight">${word}</span>`;
    } else if (remainingGuesses === 1) {
        remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
    } else if (remainingGuesses > 1) {
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    };
};

//this function checks if the player successfully guessed the word and won the game
const winCheck = function () {
    if (wordInProgress.innerText === word.toUpperCase()) {
        message.classList.add("win");
        message.innerHTML = "<p class='highlight'>You guessed correct the word! Congrats!</p>";
    }
};


