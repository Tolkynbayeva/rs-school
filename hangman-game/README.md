# Hangman Game
## 📌 Project Description
Hangman is a classic word game where players try to guess a secret word letter by letter before a stick figure is fully drawn. This project implements a Hangman game using JavaScript, dynamically generating all elements in the DOM.
## 🎯 Features
- Randomized Questions: Each game starts with a new randomly selected question and secret word.
- Keyboard Input Support: Users can play using both virtual (on-screen) and physical keyboards.
- Dynamic DOM Generation: The entire game is created dynamically via JavaScript.
- Hint System: Each word has a corresponding hint to help players guess.
- 6 Attempts: The game ends when all 6 body parts are drawn.
- Game Over Modal: Displays either a win or lose message, along with the correct word.
- Play Again Functionality: Restarts the game with a new word and resets all elements.
## 🕹 How to Play
1. The game presents a hint and a secret word masked as underscores.
2. Click on the virtual keyboard or use your physical keyboard to guess letters.
3. If the letter is correct, it appears in the word.
4. If the letter is incorrect, a body part is added to the hangman.
5. The game ends when the player either guesses the word or runs out of attempts.
6. A modal window appears with the game result and an option to play again.
## 🔧 Installation & Setup
1. Clone the repository:
```
git clone git@github.com:Tolkynbayeva/hangman-game.git
```
2. Navigate to the project directory:
```
cd hangman-game
```
3. Open index.html in a browser.
## 🚀 Technologies Used
- JavaScript (Vanilla JS): Game logic and DOM manipulation.
- HTML/CSS: Structuring and styling the game.
- Event Listeners: Handling user interactions.
## 📂 Project Structure
```
/hangman-game
│── index.html        # Main HTML file
│── css               # Styles for the game
│── script.js         # JavaScript logic for the game
│── img/              # Images for the game
```