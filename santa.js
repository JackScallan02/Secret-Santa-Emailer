window.onload = function() {
    if(!window.location.hash) {
        window.location = window.location + '#loaded';
        window.location.reload();
    }
}


function addPerson() { //Adds a div with 1 input into the form
  errorLabel = document.getElementById("error-label");
  errorLabel.style.opacity = 0;

  var form = document.getElementById("center-form");

  var div1 = document.createElement("div");
  div1.className = "form-center-flex";

  var input = document.createElement("input");
  input.type = "text";
  input.className = "textbox-name";

  var input2 = document.createElement("input");
  input2.type = "text";
  input2.className = "textbox-name";

  div1.appendChild(input);
  div1.appendChild(input2);
  form.appendChild(div1);
}


function getNumberOfPeople() {
  var form = document.getElementById("center-form");
  var total = 0;
  for (var i = 0; i < form.length / 2; i++) {
    if (form.children[i].children[0].value != '' && form.children[i].children[1].value != '') {
      total += 1;
    }
  }
  return total;
}


function getNumberOfInputs() {
  var form = document.getElementById("center-form");
  return form.length/2;
}



function displayError() {
  errorLabel = document.getElementById("error-label");
  errorLabel.style.opacity = 1;
  errorLabel.innerHTML = "You must have at least 3 people!";
}



function removePerson() {
  var numPeople = getNumberOfPeople();
  var numInputs = getNumberOfInputs();

  if (numPeople > 3 || numInputs > 3) {
    var form = document.getElementById("center-form");
    form.removeChild(form.lastChild);
  } else {
    displayError();
  }
}


function repeatedNames() {
    var inputs = enumerateInputs();
    var found = new Set();
    for (var i = 0; i < inputs.length; i++) {
	  if (found.has(inputs[i][0])) {
		    return true;
	  }
        found.add(inputs[i][0])
    }
    return false;
}

var submitButton = document.getElementById("submit-button");
submitButton.addEventListener("click", function() {
 var numPeople = getNumberOfPeople();
 if (numPeople < 3) {
    displayError();
    return;
  }

 if (repeatedNames() == true) {
    $("#error-label").css('opacity', '1');
    $("#error-label").html('You cannot have repeated names');
    return;
}

  var inputs = enumerateInputs();
  var pairs = createSantas(inputs);

  callPHP(pairs);

});


function enumerateInputs() {
  var form = document.getElementById("center-form");
  var numPeople = getNumberOfPeople();
  var people = makeEmptyArray();
  var emptyInputs = 0;

  for (var i = 0; i < form.children.length; i++) {
    if (form.children[i].children[0].value != '' && form.children[i].children[1].value != '') {
      for (var j = 0; j < 2; j++) {
        people[i - emptyInputs][j] = form.children[i].children[j].value;
      }
    } else {
      emptyInputs++;
    }
  }

  return people;
}


//inputs: 2D Array of format [[person, email], [person, email], ...]
//people: 2D Array as a dictionary format in which each key is a person and their value is None
          //will be returned as [person, [person they have, person's email]]
function createSantas(inputs) {

  var people = []
  for (var i = 0; i < inputs.length; i++) {
    people.push([inputs[i][0], null]);
  }

  shuffle(people); //Start iterating through each person in a random order
  var chooseArray = people.slice();
  var randomIndex;

  for (var i = 0; i < people.length; i++) {
    randomIndex = getRandomInt(0, chooseArray.length - 1);

    while (people[i][0] == chooseArray[randomIndex][0]) {
      randomIndex = getRandomInt(0, chooseArray.length - 1);
      if (people[i][0] == chooseArray[randomIndex][0] && chooseArray.length == 1) {
      	  createSantas(inputs);
	  return;
      }
    }

    for (var j = 0; j < inputs.length; j++) {
      if (inputs[j][0] == people[i][0]) {
        people[i][1] = [chooseArray[randomIndex][0], inputs[j][1]];
        break;
      }
    }

    chooseArray.splice(randomIndex, 1);

    if (chooseArray.length == 1) {
      if (people[i + 1][0] == chooseArray[0][0]) {
        return createSantas(inputs);
      } else {
        for (var j = 0; j < inputs.length; j++) {
          if (inputs[j][0] == people[i + 1][0]) {
            people[i + 1][1] = [chooseArray[0][0], inputs[j][1]];
            break;
          }
        }
        break;
      }
    }
  }

  return people;
}


function makeEmptyArray() {
  var form = document.getElementById("center-form");
  var numPeople = getNumberOfPeople();
  var arr = [];
  for (var i = 0; i < numPeople; i++) {
    arr.push([null, null]);
  }
  return arr;
}


function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.ceil(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


function logList(str, li) {
  console.log(str);
  li.forEach(function(item) {
    console.log(item);
  });
  console.log("");
}


function callPHP(pairs) {
    dataToSend = new Array();
    var jsonArg = new Object();

    for (var i = 0; i < pairs.length; i++) {
      jsonArg.key = pairs[i][0];
      jsonArg.value = pairs[i][1];
      dataToSend.push(jsonArg);
      jsonArg = new Object();
    }

    $.ajax({
        url: "send-emails.php",
        data: {myData: dataToSend},
        type: "POST",
	      success: function(response) {
	      if (response.substring(response.length - 2, response.length) != "-1") {
		        window.location.href = 'successpage.html';
		        $("#submit-button").prop("disabled", "true");
	      } else {
		        console.log("Failed to send emails");
		        $("#error-label").html("Invalid Email(s). Please check the emails and try again.");
		        $("#error-label").css("opacity", "1");
	      }
	 }
  });
}
