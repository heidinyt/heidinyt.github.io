var hangman;

var newGameClick = function () {
    _initializeControls();
    hangman = new Hangman();
    drawCurrentWord();
};

var _initializeControls = function () {
    document.getElementById("you-win-message").classList = "hide";
    document.getElementById("you-lose-message").classList = "hide";
    document.getElementById("game").classList = "";
    document.getElementById("letters").innerHTML = "";
    // document.getEle"click", function() {
    //     $('#inputTest').focus();
    //   });
    //   $('#inputTest').focus();
};

var _addLetter = function (letterToAdd) {
    document.getElementById("letters").innerHTML = document.getElementById("letters").innerHTML + letterToAdd;
};

var resetCurrentWord = function () {
    var word = document.getElementById("currentWord");
  
    while (word.firstChild) {
      word.removeChild(word.firstChild);
    }
};
  
var drawCurrentWord = function (word) {
    resetCurrentWord();

    var currentWord = word || hangman.getCurrentWordStatus();
    var currentWordDom = document.getElementById("currentWord");

    currentWord.forEach(function (letter) {
        var spanLetter = document.createElement("span");
        var content = document.createTextNode(letter);

        spanLetter.appendChild(content);
        currentWordDom.appendChild(spanLetter);
    });
};

var drawHangman = function () {
    document.getElementById("hangmanImg").src = "images/wire" + (5-hangman.incorrectGuessesLeft) + ".PNG";
}

var insertLetter = function (event) {
    if (event.keyCode < 65 || event.keyCode > 90) // make sure letter key
    return;

    // check if letter is in answer?
    var letterPressed  = String.fromCharCode(event.keyCode);
    var correct = hangman.guessLetter(letterPressed);

    if (correct !== undefined && !correct) {
        _addLetter(letterPressed);
        drawHangman(); 
    } else {
        drawCurrentWord();
    }

    afterEachGuess();
};

var afterEachGuess = function () {
    var status = hangman.gameStatus();
  
    if (!status)
      return;
  
    if(status.toLowerCase() === "win") {
      document.getElementById("you-win-message").classList = "";
    } else {
      drawCurrentWord(hangman.answer.split(""));
      document.getElementById("you-lose-message").classList = "";
    }
  
    hangman = undefined;
};

document.addEventListener("keydown", insertLetter);

document.getElementById("new-game-button").addEventListener("click", newGameClick);

