const questions = [
  {secretWord: "FUTURE", hint: "I’m always ahead of you, but you can never catch me. What am I?"},
  {secretWord: "MAP", hint: "I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. What am I?"},
  {secretWord: "CIRCLE", hint: "I have no beginning, middle, or end. What am I?"}
];

function getRandomQuestion() {
  const randomIndex = Math.floor(Math.random() * questions.length);
  return questions[randomIndex];
}

const randomQuestion = getRandomQuestion();
let secretWord = randomQuestion.secretWord;
let hint = randomQuestion.hint;

let incorrectGuesses = 0;
const maxWrong = 6;
let guessedLetters = [];
let gameOver = false;

const container = document.createElement("div");
container.classList.add("wrapper");

const title = document.createElement("h1");
title.classList.add("hangman-title");
title.textContent = "Hangman Game";

container.appendChild(title);

const gameContainer = document.createElement("div");
gameContainer.classList.add("game-container");

const imageContainer = document.createElement("div");
imageContainer.classList.add("image-container");

const hangmanBodyParts = [
  "head",
  "body",
  "handOne",
  "handTwo",
  "legOne",
  "legTwo",
];

hangmanBodyParts.forEach(part => {
  const hangmanBodyPart = document.createElement("div");
  hangmanBodyPart.classList.add(part, "hidden");
  imageContainer.appendChild(hangmanBodyPart);
});


gameContainer.appendChild(imageContainer);

const hangmanContent = document.createElement("div");
hangmanContent.classList.add("hangman-content");
const wordContainer = document.createElement("div");
wordContainer.classList.add("word-container");
function displayWord() {
  let display = "";
  for (let i = 0; i < secretWord.length; i++) {
    const letter = secretWord[i];
    if (guessedLetters.includes(letter)) {
      display += letter + " ";
    } else {
      display += "_ ";
    }
  }
  wordContainer.textContent = display.trim();
}

displayWord();

const hintText = document.createElement("p");
hintText.classList.add("hint-text");
hintText.textContent = "Hint: " + hint;

const errorText = document.createElement("p");
errorText.classList.add("error-text");
updateErrorText();

function updateErrorText() {
  errorText.innerHTML = `
    <span class="error-text">Incorrect guesses:</span> 
    <span class="error-text__red">${incorrectGuesses} / ${maxWrong}</span>
  `;
}

const alphabetContainer = document.createElement("div");
alphabetContainer.classList.add("alphabet-container");

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
alphabet.forEach(letter => {
  const btn = document.createElement("button");
  btn.classList.add("btn");
  btn.textContent = letter;
  btn.addEventListener("click", () => handleGuess(letter, btn));
  alphabetContainer.appendChild(btn);
});


hangmanContent.appendChild(wordContainer);
hangmanContent.appendChild(hintText);
hangmanContent.appendChild(errorText);
hangmanContent.appendChild(alphabetContainer);

gameContainer.appendChild(hangmanContent);
container.appendChild(gameContainer);
document.body.appendChild(container);

document.addEventListener("keydown", (event) => {
  if (gameOver) return;
  
  const letter = event.key.toUpperCase();
  if (alphabet.includes(letter)) {
    const btn = [...alphabetContainer.children].find(
      (button) => button.textContent === letter && !button.disabled
    );
    if (btn) {
      btn.classList.add("active");
      setTimeout(() => btn.classList.remove("active"), 200);
      handleGuess(letter, btn);
    }
  }
});

const modal = document.createElement("div");
modal.classList.add("modal", "hidden");
const modalContent = document.createElement("div");
modalContent.classList.add("modal-content");
const modalMessage = document.createElement("p");
modalMessage.classList.add("modal-message");
const modalSecretWord = document.createElement("p");
modalSecretWord.classList.add("modal-secret-word");
const playAgainButton = document.createElement("button");
playAgainButton.textContent = "Play Again";
playAgainButton.classList.add("btn-play");
playAgainButton.addEventListener("click", () => {
  modal.classList.add("hidden");
  resetGame();
});

modalContent.appendChild(modalMessage);
modalContent.appendChild(modalSecretWord);
modalContent.appendChild(playAgainButton);
modal.appendChild(modalContent);
document.body.appendChild(modal);

function showModal(message, word) {
  modalMessage.textContent = message;
  modalSecretWord.textContent = word;
  modal.classList.remove("hidden");
}

function checkWin() {
  for (let letter of secretWord) {
    if (!guessedLetters.includes(letter)) {
      return false;
    }
  }
  return true;
}

function resetGame() {
  guessedLetters = [];
  incorrectGuesses = 0;
  gameOver = false;

  const randomQuestion = getRandomQuestion();
  secretWord = randomQuestion.secretWord;
  hint = randomQuestion.hint;
  
  hintText.textContent = "Hint: " + hint;
  updateErrorText();
  displayWord();

  const buttons = alphabetContainer.querySelectorAll("button");
  buttons.forEach(b => b.disabled = false);

  hangmanBodyParts.forEach(part => {
    document.querySelector(`.${part}`).classList.add("hidden");
  });
}

function handleGuess(letter, btn) {
  if (gameOver) return;
  btn.disabled = true;

  if (secretWord.includes(letter)) {
    guessedLetters.push(letter);
    displayWord();

    if (checkWin()) {
      gameOver = true;
      setTimeout(() => {
        showModal("Congratulations! You Win!", `The word was: ${secretWord}`)
      }, 200)
    }
  } else {
    if (incorrectGuesses < maxWrong) {
      document.querySelector(`.${hangmanBodyParts[incorrectGuesses]}`).classList.remove("hidden");
    }
    incorrectGuesses++;
    updateErrorText();

    if (incorrectGuesses === maxWrong) {
      gameOver = true;
      setTimeout(() => {
        showModal("You Lose!", `The word was: ${secretWord}`);
      }, 500)
    }
  }
}