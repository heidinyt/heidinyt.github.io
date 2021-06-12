var answer;

function Hangman () {
    this.possibleWords = ["ZOE", "BEEATRICE", "EVERDEEN", "JOHNATHAN", "HEIDI"];
    this.answer = "hi";
    this.letters = []; // guesses player has already made
    this.incorrectGuessesLeft = 5;

    this.answer = this._chooseAnswer();
}

Hangman.prototype._chooseAnswer = function () {
    var randomNum = Math.floor(Math.random() * this.possibleWords.length);
    return this.possibleWords[randomNum];
};

// return undefined if letter already inserted, true if letter in answer, false if not
Hangman.prototype.guessLetter = function (letter) {
    letter = letter.toUpperCase();
    console.log("letter guessed: "+ letter); //COME BACK HERE
    if (this.letters.indexOf(letter) > -1) {
      return;
    }
  
    this.letters.push(letter);
    var correct = this.answer.indexOf(letter) > -1;
  
    if (!correct) {
      console.log("incorrect");
      this.incorrectGuessesLeft -= 1;
    }
    return correct;
};

// iterate over letters in answer, and represent 
// letters not yet selected by player as underscore
Hangman.prototype.getCurrentWordStatus = function () {
    var that = this;
    var currentWordStatus = [];

    if(this.answer !== undefined)  {
      var charsInWord = this.answer.toString().split("");

        charsInWord.forEach(function (letter) {
            if (that.letters.indexOf(letter) > -1) {
              currentWordStatus.push(letter);
            } else {
              currentWordStatus.push("_");
            }
        }
         ) } 
    ;

    return currentWordStatus;
};

Hangman.prototype._gameWon = function () {
    return this.getCurrentWordStatus().indexOf("_") < 0;
};

Hangman.prototype._gameLost = function () {
    return this.incorrectGuessesLeft === 0;
};

Hangman.prototype.gameStatus = function () {
    if (this._gameWon()) {
      return "win";
    } else if (this._gameLost()) {
      return "lose";
    }
};