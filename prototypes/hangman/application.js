var hangman;
var input = document.getElementById("inputBox");
var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 
'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

var newGameClick = function () {
    _initializeControls();
    _initializeButtons();
    hangman = new Hangman();
    drawCurrentWord();
    drawHangman();
};

var _initializeControls = function () {
    document.getElementById("you-win-message").classList = "hide";
    document.getElementById("you-lose-message").classList = "hide";
    document.getElementById("game").classList = "";
    document.getElementById("letters").innerHTML = "";
    input.value = '';
};

var _initializeButtons = function () {
    buttons = document.getElementById('buttons');
    letters = document.createElement('ul');

    for (var i = 0; i < alphabet.length; i++) {
      letters.id = 'alphabet';
      list = document.createElement('li');
      list.id = 'letter';
      list.innerHTML = alphabet[i];
      buttons.appendChild(letters);
      letters.appendChild(list);
      clickButton();
    }
  }

var _addLetter = function (letterToAdd) {
    document.getElementById("letters").innerHTML = document.getElementById("letters").innerHTML + letterToAdd;
};

var clickButton = function () {
    list.onclick = function () {
    makeGuess(this.innerHTML);
  }
}

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

// insertLetter funtion no longer being used. 
// was used to make guess on desktop without need for input field
var insertLetter = function (event) {
    if (event.keyCode < 65 || event.keyCode > 90) // make sure letter key
    return;

    var letterPressed  = String.fromCharCode(event.keyCode);
    makeGuess(letterPressed);
};

var makeGuess = function (letter) {
    letter = letter.toUpperCase();
    var correct = hangman.guessLetter(letter);

    if (correct !== undefined && !correct) {
        _addLetter(letter);
        drawHangman(); 
    } else {
        drawCurrentWord();
    }

    afterEachGuess();
}

var insertLetterUsingInputKeyboard = function () {
    for (var i = 0; i < input.value.length; i++) {
        makeGuess(input.value.charAt(i))
        console.log("lengtttth " + input.value.toString());
    }
    input.value = '';
};

var afterEachGuess = function () {
    input.value = ''; // clear input when text submitted
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

input.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
      // cancel default action, if needed
      event.preventDefault();
      insertLetterUsingInputKeyboard(); 
    }
});

window.onLoad = newGameClick();

document.getElementById("new-game-button").addEventListener("click", newGameClick);