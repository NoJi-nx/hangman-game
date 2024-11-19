const startContainer = document.getElementById("start-cont");
const userInput = document.getElementById("user-input");
const keyBindings = document.getElementById("key-binds");
const resultContainer = document.getElementById("result-cont");
const resultText = document.getElementById("result-text");
const hangman = document.getElementById("hangman");
const newGameBtn = document.getElementById("play-again");
const hintContainer = document.getElementById("hint-container"); // Container to show hints
const hintBtn = document.getElementById("hint-btn");




let currentHint = "";
let gameStarted = false; 
let guesses = 0;
let rightGuess = 0;
let selectedWord = "";


let wordList = {
    answers: [
        { word: "Html", hint: "Markup language for web pages" },
        { word: "Css", hint: "Style sheet language for web pages" },
        { word: "Javascript", hint: "Popular programming language for web development" },
        { word: "Php", hint: "Server-side scripting language" },
        { word: "Sql", hint: "Language for managing databases" },
        { word: "Nosql", hint: "Database type for unstructured data" },
        { word: "React", hint: "JavaScript library for building UI" },
        { word: "Ruby", hint: "Dynamic programming language" },
        { word: "Typescript", hint: "Superset of JavaScript with static typing" },
        { word: "Python", hint: "High-level programming language with easy syntax" },
        { word: "Swift", hint: "Programming language for iOS development" },
        { word: "Scala", hint: "Programming language that combines functional and object-oriented paradigms" },
        { word: "Matlab", hint: "Language used for numerical computing" },
    ],
};

// start the game
const playGame = () => {
    gameStarted = true;
    keyBindings.classList.remove("hide");
    startContainer.innerHTML = "";

    // Choose a random word from the list
    const selectedEntry = wordList.answers[Math.floor(Math.random() * wordList.answers.length)];
    selectedWord = selectedEntry.word.toUpperCase();
    currentHint = selectedEntry.hint;

    console.log(selectedWord);

    // Display underscores for the word to guess
    let showDash = selectedWord.replace(/./g, '<span class="dashes">_</span>');
    userInput.innerHTML = showDash;

    // Enable all letter buttons
    const letterButtons = document.querySelectorAll('.keys');
    letterButtons.forEach(button => {
        button.disabled = false;
    });

    // Reset the canvas
    let { noFigure } = drawCanvas();
    noFigure();

    // Show the hint button when the game starts
    hintBtn.classList.remove("hide");

    // Hide hint container 
    hintContainer.style.display = "none";
};

// show the hint when the hint button is clicked
const showHint = () => {
    hintContainer.innerText = `Hint: ${currentHint}`;
    hintContainer.style.display = "block"; // Show the hint container
};

// Attach event listener to the hint button
hintBtn.addEventListener("click", showHint);

//  handle game button clicks 
const handleLetterClick = (button) => {
    if (!gameStarted) {
        return; // Ignore button clicks if game hasn't started
    }

    let keyArray = selectedWord.split("");
    let dashes = document.getElementsByClassName("dashes");

    if (keyArray.includes(button.innerText)) {
        keyArray.forEach((key, index) => {
            if (key === button.innerText) {
                dashes[index].innerText = key;
                rightGuess += 1;

                if (rightGuess == keyArray.length) {
                    resultText.innerHTML = `<h2 class='won-text'>Initializing</h2> <h2 class='result-won'>SUCCESS</h2>
                    <p>console.log("Answer is <span>${selectedWord}</span>")</p>`;
                    endGame();
                }
            }
        });
    } else {
        guesses += 1;
        hangmanGuess(guesses);

        if (guesses == 10) { // Adjusted to have 10 guesses total
            resultText.innerHTML = `<h2 class='result-lost'>Error!</h2> 
            <h2 class='lost-text'>Invalid answer</h2> 
            <p><i>let</i> coding = { <br>
                answer: ["<span>${selectedWord}</span>"]};</p>`;
            endGame();
        }
    }

    button.disabled = true; // Disable the button 
};

// Function to load the game setup on page load
const loadFunction = () => {
    guesses = 0;
    rightGuess = 0;
    gameStarted = false;

    // Hide unnecessary elements initially
    userInput.innerHTML = "";
    resultContainer.classList.add("hide");
    keyBindings.classList.add("hide");
    keyBindings.innerHTML = "";

    // Create and display a start button
    const startGameBtnEl = document.createElement("button");
    startGameBtnEl.classList.add("start");
    startGameBtnEl.textContent = "generateLanguage();";
    startGameBtnEl.onclick = playGame;
    startContainer.appendChild(startGameBtnEl);

    // Create letter buttons A-Z and disable them initially
    for (let i = 65; i < 91; i++) {
        let letterButtonEl = document.createElement("button");
        letterButtonEl.classList.add("keys");
        letterButtonEl.innerText = String.fromCharCode(i);
        letterButtonEl.disabled = true; // Disable until game starts
        letterButtonEl.addEventListener("click", () => handleLetterClick(letterButtonEl));
        keyBindings.append(letterButtonEl);
    }

    // Draw an empty canvas
    let { noFigure } = drawCanvas();
    noFigure();

    // Hide hint button initially
    hintBtn.classList.add("hide");
};



// Function to draw parts of the hangman as guesses progress
const drawCanvas = () => {
    let lineFigures = hangman.getContext("2d");
    lineFigures.strokeStyle = "#000";
    lineFigures.lineWidth = 2;

    // Set canvas dimensions explicitly
    hangman.width = 200;
    hangman.height = 250;

    // Clear the entire canvas before starting
    const noFigure = () => {
        lineFigures.clearRect(0, 0, hangman.width, hangman.height);
    };

   
    const ground = () => {
        lineFigures.beginPath();
        lineFigures.moveTo(10, 230);
        lineFigures.lineTo(190, 230);
        lineFigures.stroke();
    };

    const pole = () => {
        lineFigures.beginPath();
        lineFigures.moveTo(50, 230);
        lineFigures.lineTo(50, 20);
        lineFigures.stroke();
    };

    const holder = () => {
        lineFigures.beginPath();
        lineFigures.moveTo(50, 20);
        lineFigures.lineTo(150, 20);
        lineFigures.stroke();
    };

    const chain = () => {
        lineFigures.beginPath();
        lineFigures.moveTo(150, 20);
        lineFigures.lineTo(150, 50);
        lineFigures.stroke();
    };

    const ropeAndHead = () => {
        // Rope
        lineFigures.beginPath();
        lineFigures.moveTo(150, 50);
        lineFigures.lineTo(150, 80);
        lineFigures.stroke();
        // Head
        lineFigures.beginPath();
        lineFigures.arc(150, 100, 20, 0, Math.PI * 2, true);
        lineFigures.stroke();
    };

    const body = () => {
        lineFigures.beginPath();
        lineFigures.moveTo(150, 120);
        lineFigures.lineTo(150, 180);
        lineFigures.stroke();
    };

    const leftArm = () => {
        lineFigures.beginPath();
        lineFigures.moveTo(150, 140);
        lineFigures.lineTo(120, 160);
        lineFigures.stroke();
    };

    const rightArm = () => {
        lineFigures.beginPath();
        lineFigures.moveTo(150, 140);
        lineFigures.lineTo(180, 160);
        lineFigures.stroke();
    };

    const leftLeg = () => {
        lineFigures.beginPath();
        lineFigures.moveTo(150, 180);
        lineFigures.lineTo(130, 220);
        lineFigures.stroke();
    };

    const rightLeg = () => {
        lineFigures.beginPath();
        lineFigures.moveTo(150, 180);
        lineFigures.lineTo(170, 220);
        lineFigures.stroke();
    };

    // Return all figure drawing functions for easy calling later
    return { noFigure, ground, pole, holder, chain, ropeAndHead, body, leftArm, rightArm, leftLeg, rightLeg };
};

const hangmanGuess = (guesses) => {
    let lineFigures = hangman.getContext("2d");
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
};

// Function to end the game
const endGame = () => {
    gameStarted = false;
    const letterButtons = document.querySelectorAll('.keys');
    letterButtons.forEach(button => {
        button.disabled = true; // Disable all buttons once the game ends
    });
    resultContainer.classList.remove("hide");
};


const toResults = () => {
    resultContainer.classList.remove("hide");
};


hintBtn.addEventListener("click", () => {
    hintContainer.innerHTML = `<p>Hint: ${currentHint}</p>`;
});


newGameBtn.addEventListener("click", loadFunction);
window.onload = loadFunction;
