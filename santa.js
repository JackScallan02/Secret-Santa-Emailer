

function addPerson() { //Adds a div with 2 inputs into the form

  errorLabel = document.getElementById("error-label");
  errorLabel.style.opacity = 0;

  var form = document.getElementById("center-form");

  var div1 = document.createElement("div");
  div1.className = "form-center-flex";

  var input = document.createElement("input");
  input.type = "text";
  input.className = "textbox-name";

  div1.appendChild(input);

  var input = document.createElement("input");
  input.type = "text";
  input.className = "textbox-email";
  div1.appendChild(input);

  form.appendChild(div1);
}

function removePerson() {
  var form = document.getElementById("center-form");
  if ((form.length / 2) > 3) {
    form.removeChild(form.lastChild);
  } else {
    errorLabel = document.getElementById("error-label");
    errorLabel.style.opacity = 1;
    errorLabel.innerHTML = "You must have at least 3 people!";
  }
}


function getData() {
  var emails = document.getElementById("center-form");

  var people = [];

  numPeople = emails.length / 2;

  for (var i = 0; i < numPeople; i++) {
    let name = emails.children[i].children[0].value;
    let email = emails.children[i].children[1].value;

    if (name != "" && email != "") {
      people.push([name, email]);
    }

  }

  return people;
}


var submitButton = document.getElementById("submit-button");

submitButton.addEventListener("click", function() {

  var info = getData();

  var errorLabel = document.getElementById("error-label");

  if ((info.length >= 3) ) {
    var santas = createSantas(info)
    errorLabel.style.opacity = 0;
    sendEmails(santas)
  } else {
    console.log("Not enough people!");
    errorLabel.style.opacity = 1;
    errorLabel.innerHTML = "Not enough people!";
  }

  var form = document.getElementById("center-form");

});


function createSantas(info) {
  randomIndex = getRandomInt(1, info.length - 1);
  out = [];
  dynamicList = info.slice();

  for (var i = 0; i < info.length; i++) {
    while (info[i] == dynamicList[randomIndex]) {
      randomIndex = getRandomInt(0, dynamicList.length - 1);
      if (dynamicList.length == 1) {
          break;
      }
    }

    out.push([info[i][0], dynamicList[randomIndex][1]]);
    dynamicList.splice(randomIndex, 1)

    if (dynamicList.length > 0) {
      randomIndex = getRandomInt(0, dynamicList.length - 1);
    }
  }

  logList("Final OutList:", out);
  return out;
}

function sendEmails(santas) {
  santas.forEach(function(item) {
    console.log("Name given: " + item[0] + "; Email: " + item[1]);
    //send name item[0] to email item[1]
    var errorLabel = document.getElementById("error-label");
    errorLabel.style.opacity = 1;
    errorLabel.innerHTML = "Correlations logged in console";
  });


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
