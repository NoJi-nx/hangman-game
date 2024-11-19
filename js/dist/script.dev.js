"use strict";

var startContainer = document.getElementById("start-cont");
var userInput = document.getElementById("user-input");
var keyBindings = document.getElementById("key-binds");
var resultContainer = document.getElementById("result-cont");
var resultText = document.getElementById("result-text");
var hangman = document.getElementById("hangman");
var newGameBtn = document.getElementById("play-again");
var hintContainer = document.getElementById("hint-container"); // Container to show hints

var hintBtn = document.getElementById("hint-btn");
var currentHint = ""; // This variable will store the current hint

var gameStarted = false; // Tracks if the game has started

var guesses = 0;
var rightGuess = 0;
var selectedWord = ""; // Array of words for the game

var wordList = {
  answers: [{
    word: "Html",
    hint: "Markup language for web pages"
  }, {
    word: "Css",
    hint: "Style sheet language for web pages"
  }, {
    word: "Javascript",
    hint: "Popular programming language for web development"
  }, {
    word: "Php",
    hint: "Server-side scripting language"
  }, {
    word: "Sql",
    hint: "Language for managing databases"
  }, {
    word: "Nosql",
    hint: "Database type for unstructured data"
  }, {
    word: "React",
    hint: "JavaScript library for building UI"
  }, {
    word: "Ruby",
    hint: "Dynamic programming language"
  }, {
    word: "Typescript",
    hint: "Superset of JavaScript with static typing"
  }, {
    word: "Python",
    hint: "High-level programming language with easy syntax"
  }, {
    word: "Swift",
    hint: "Programming language for iOS development"
  }, {
    word: "Scala",
    hint: "Programming language that combines functional and object-oriented paradigms"
  }, {
    word: "Matlab",
    hint: "Language used for numerical computing"
  }]
}; // Function to start the game

var playGame = function playGame() {
  gameStarted = true;
  keyBindings.classList.remove("hide");
  startContainer.innerHTML = ""; // Choose a random word from the list along with its hint

  var selectedEntry = wordList.answers[Math.floor(Math.random() * wordList.answers.length)];
  selectedWord = selectedEntry.word.toUpperCase();
  currentHint = selectedEntry.hint;
  console.log(selectedWord); // Display underscores for the word to guess

  var showDash = selectedWord.replace(/./g, '<span class="dashes">_</span>');
  userInput.innerHTML = showDash; // Enable all letter buttons

  var letterButtons = document.querySelectorAll('.keys');
  letterButtons.forEach(function (button) {
    button.disabled = false;
  }); // Reset the canvas

  var _drawCanvas = drawCanvas(),
      noFigure = _drawCanvas.noFigure;

  noFigure(); // Show the hint button when the game starts

  hintBtn.classList.remove("hide"); // Hide hint container initially

  hintContainer.style.display = "none";
}; // Function to show the hint when the hint button is clicked


var showHint = function showHint() {
  hintContainer.innerText = "Hint: ".concat(currentHint);
  hintContainer.style.display = "block"; // Show the hint container
}; // Attach event listener to the hint button


hintBtn.addEventListener("click", showHint); // Function to handle game button clicks (triggered only if gameStarted is true)

var handleLetterClick = function handleLetterClick(button) {
  if (!gameStarted) {
    return; // Ignore button clicks if game hasn't started
  }

  var keyArray = selectedWord.split("");
  var dashes = document.getElementsByClassName("dashes");

  if (keyArray.includes(button.innerText)) {
    keyArray.forEach(function (key, index) {
      if (key === button.innerText) {
        dashes[index].innerText = key;
        rightGuess += 1;

        if (rightGuess == keyArray.length) {
          resultText.innerHTML = "<h2 class='won-text'>Initializing</h2> <h2 class='result-won'>SUCCESS</h2>\n                    <p>console.log(\"Answer is <span>".concat(selectedWord, "</span>\")</p>");
          endGame();
        }
      }
    });
  } else {
    guesses += 1;
    hangmanGuess(guesses);

    if (guesses == 10) {
      // Adjusted to have 10 guesses total
      resultText.innerHTML = "<h2 class='result-lost'>Error!</h2> \n            <h2 class='lost-text'>Invalid answer</h2> \n            <p><i>let</i> coding = { <br>\n                answer: [\"<span>".concat(selectedWord, "</span>\"]};</p>");
      endGame();
    }
  }

  button.disabled = true; // Disable the button after it has been clicked
}; // Function to load the game setup on page load


var loadFunction = function loadFunction() {
  guesses = 0;
  rightGuess = 0;
  gameStarted = false; // Hide unnecessary elements initially

  userInput.innerHTML = "";
  resultContainer.classList.add("hide");
  keyBindings.classList.add("hide");
  keyBindings.innerHTML = ""; // Create and display a start button

  var startGameBtnEl = document.createElement("button");
  startGameBtnEl.classList.add("start");
  startGameBtnEl.textContent = "generateLanguage();";
  startGameBtnEl.onclick = playGame;
  startContainer.appendChild(startGameBtnEl); // Create letter buttons A-Z and disable them initially

  var _loop = function _loop(i) {
    var letterButtonEl = document.createElement("button");
    letterButtonEl.classList.add("keys");
    letterButtonEl.innerText = String.fromCharCode(i);
    letterButtonEl.disabled = true; // Disable until game starts

    letterButtonEl.addEventListener("click", function () {
      return handleLetterClick(letterButtonEl);
    });
    keyBindings.append(letterButtonEl);
  };

  for (var i = 65; i < 91; i++) {
    _loop(i);
  } // Draw an empty canvas


  var _drawCanvas2 = drawCanvas(),
      noFigure = _drawCanvas2.noFigure;

  noFigure(); // Hide hint button initially

  hintBtn.classList.add("hide");
}; // Function to draw parts of the hangman as guesses progress


var drawCanvas = function drawCanvas() {
  var lineFigures = hangman.getContext("2d");
  lineFigures.strokeStyle = "#000";
  lineFigures.lineWidth = 2; // Set canvas dimensions explicitly

  hangman.width = 200;
  hangman.height = 250; // Clear the entire canvas before starting

  var noFigure = function noFigure() {
    lineFigures.clearRect(0, 0, hangman.width, hangman.height);
  }; // Individual parts of the hangman drawing


  var ground = function ground() {
    lineFigures.beginPath();
    lineFigures.moveTo(10, 230);
    lineFigures.lineTo(190, 230);
    lineFigures.stroke();
  };

  var pole = function pole() {
    lineFigures.beginPath();
    lineFigures.moveTo(50, 230);
    lineFigures.lineTo(50, 20);
    lineFigures.stroke();
  };

  var holder = function holder() {
    lineFigures.beginPath();
    lineFigures.moveTo(50, 20);
    lineFigures.lineTo(150, 20);
    lineFigures.stroke();
  };

  var chain = function chain() {
    lineFigures.beginPath();
    lineFigures.moveTo(150, 20);
    lineFigures.lineTo(150, 50);
    lineFigures.stroke();
  };

  var ropeAndHead = function ropeAndHead() {
    // Rope
    lineFigures.beginPath();
    lineFigures.moveTo(150, 50);
    lineFigures.lineTo(150, 80);
    lineFigures.stroke(); // Head

    lineFigures.beginPath();
    lineFigures.arc(150, 100, 20, 0, Math.PI * 2, true);
    lineFigures.stroke();
  };

  var body = function body() {
    lineFigures.beginPath();
    lineFigures.moveTo(150, 120);
    lineFigures.lineTo(150, 180);
    lineFigures.stroke();
  };

  var leftArm = function leftArm() {
    lineFigures.beginPath();
    lineFigures.moveTo(150, 140);
    lineFigures.lineTo(120, 160);
    lineFigures.stroke();
  };

  var rightArm = function rightArm() {
    lineFigures.beginPath();
    lineFigures.moveTo(150, 140);
    lineFigures.lineTo(180, 160);
    lineFigures.stroke();
  };

  var leftLeg = function leftLeg() {
    lineFigures.beginPath();
    lineFigures.moveTo(150, 180);
    lineFigures.lineTo(130, 220);
    lineFigures.stroke();
  };

  var rightLeg = function rightLeg() {
    lineFigures.beginPath();
    lineFigures.moveTo(150, 180);
    lineFigures.lineTo(170, 220);
    lineFigures.stroke();
  }; // Return all figure drawing functions for easy calling later


  return {
    noFigure: noFigure,
    ground: ground,
    pole: pole,
    holder: holder,
    chain: chain,
    ropeAndHead: ropeAndHead,
    body: body,
    leftArm: leftArm,
    rightArm: rightArm,
    leftLeg: leftLeg,
    rightLeg: rightLeg
  };
};

var hangmanGuess = function hangmanGuess(guesses) {
  var lineFigures = hangman.getContext("2d");
  lineFigures.strokeStyle = "#000";
  lineFigures.lineWidth = 2;

  switch (guesses) {
    case 1:
      lineFigures.beginPath();
      lineFigures.moveTo(10, 230);
      lineFigures.lineTo(190, 230);
      lineFigures.stroke();
      break;

    case 2:
      lineFigures.beginPath();
      lineFigures.moveTo(50, 230);
      lineFigures.lineTo(50, 20);
      lineFigures.stroke();
      break;

    case 3:
      lineFigures.beginPath();
      lineFigures.moveTo(50, 20);
      lineFigures.lineTo(150, 20);
      lineFigures.stroke();
      break;

    case 4:
      lineFigures.beginPath();
      lineFigures.moveTo(150, 20);
      lineFigures.lineTo(150, 50);
      lineFigures.stroke();
      break;

    case 5:
      lineFigures.beginPath();
      lineFigures.moveTo(150, 50);
      lineFigures.lineTo(150, 80);
      lineFigures.stroke();
      lineFigures.beginPath();
      lineFigures.arc(150, 100, 20, 0, Math.PI * 2, true);
      lineFigures.stroke();
      break;

    case 6:
      lineFigures.beginPath();
      lineFigures.moveTo(150, 120);
      lineFigures.lineTo(150, 180);
      lineFigures.stroke();
      break;

    case 7:
      lineFigures.beginPath();
      lineFigures.moveTo(150, 140);
      lineFigures.lineTo(120, 160);
      lineFigures.stroke();
      break;

    case 8:
      lineFigures.beginPath();
      lineFigures.moveTo(150, 140);
      lineFigures.lineTo(180, 160);
      lineFigures.stroke();
      break;

    case 9:
      lineFigures.beginPath();
      lineFigures.moveTo(150, 180);
      lineFigures.lineTo(130, 220);
      lineFigures.stroke();
      break;

    case 10:
      lineFigures.beginPath();
      lineFigures.moveTo(150, 180);
      lineFigures.lineTo(170, 220);
      lineFigures.stroke();
      break;

    default:
      break;
  }
}; // Function to end the game


var endGame = function endGame() {
  gameStarted = false;
  var letterButtons = document.querySelectorAll('.keys');
  letterButtons.forEach(function (button) {
    button.disabled = true; // Disable all buttons once the game ends
  });
  resultContainer.classList.remove("hide");
}; // Show the result screen when the game ends


var toResults = function toResults() {
  resultContainer.classList.remove("hide");
}; // Show the hint when the hint button is clicked


hintBtn.addEventListener("click", function () {
  hintContainer.innerHTML = "<p>Hint: ".concat(currentHint, "</p>");
}); // Reload the game when "New Game" button is clicked

newGameBtn.addEventListener("click", loadFunction);
window.onload = loadFunction;