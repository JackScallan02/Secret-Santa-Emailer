

var wordsRemaining = document.getElementById("words-left");
var textarea = document.getElementById("contact-textarea");

prevLength = 0;
textarea.addEventListener("keyup", function() {

  userInput = textarea.value;
  const key = event.keyCode || event.charCode;
  userInput = textarea.value;

  if ((key == 32 || key == 8 || key == 46) || Math.abs(prevLength - userInput.length >= 2)) {
    //If user presses space, backspace, or delete, respectively, or deletes/pastes multiple values at once
    numRemaining = 100 - getCount(userInput);
  }

  if (userInput.length == 0) {
    numRemaining = 100;
  }

  prevLength = userInput.length;

  if (numRemaining == 0) {
    $('input').keypress(function(e) {
      e.preventDefault();
    });
  }

  wordsRemaining.innerHTML = `Words remaining: ${numRemaining}`;

});


function getCount(str) {
  //Counts number of spaces in string, excluding consecutive spaces
  count = 0;
  for (var i = 0; i < str.length; i++) {
    if (str[i] == " ") {
      count += 1;
      if (i != 0 && str[i - 1] == " ") {
        count -= 1;
      }
    }
  }
  return count;
}
