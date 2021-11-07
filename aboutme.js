var displayWindow = document.getElementById("display-window");





var homeworkOrganizer = document.getElementById("homework-organizer");

homeworkOrganizer.addEventListener("mouseover", function() {
  var githubLink = document.createElement("a");
  var linkImage = document.createElement("img");
  linkImage.src="images/github-logo.png";
  linkImage.style.width="40%";
  githubLink.append(linkImage);
  githubLink.href="https://github.com/JackScallan02/Homework-Organizer";


  clearWindow();

  displayWindow.appendChild(githubLink);
});




var schoolProjects = document.getElementById("school-projects");

schoolProjects.addEventListener("mouseover", function() {
  var githubLink = document.createElement("a");
  var linkImage = document.createElement("img");
  linkImage.src="images/github-logo.png";
  linkImage.style.width="40%";
  githubLink.append(linkImage);
  githubLink.href="https://github.com/JackScallan02/School-Projects";
  clearWindow();
  displayWindow.appendChild(githubLink);
});





var languages = document.getElementById("languages");

languages.addEventListener("mouseover", function() {
  var pythonImage = document.createElement("img");
  pythonImage.src="images/python-logo.png";
  var pythonLabel = document.createElement("p");

  var javaImage = document.createElement("img");
  javaImage.src = "images/java-icon.png";
  var javaLabel = document.createElement("p");

  var htmlImage = document.createElement("img");
  htmlImage.src = "images/html5-logo.png";
  var htmlLabel = document.createElement("p");

  var cssImage = document.createElement("img");
  cssImage.src = "images/css3-logo.png";
  var cssLabel = document.createElement("p");

  var jsImage = document.createElement("img");
  jsImage.src = "images/JS-icon.png";
  var jsLabel = document.createElement("p");

  var swiftImage = document.createElement("img");
  swiftImage.src = "images/swift-logo.png";
  var swiftLabel = document.createElement("p");


  clearWindow();



  addLanguage(pythonImage, pythonLabel, "Python", "Proficient");
  addLanguage(javaImage, javaLabel, "Java", "Intermediate");
  addLanguage(htmlImage, htmlLabel, "HTML", "Proficient");
  addLanguage(cssImage, cssLabel, "CSS", "Intermediate");
  addLanguage(jsImage, jsLabel, "Javascript", "Intermediate");
  addLanguage(swiftImage, swiftLabel, "Swift", "Basic");

  // console.log(displayWindow.children);
});



function addLanguage(image, caption, language, proficiency) {
  caption.innerHTML=language;
  caption.style.fontFamily="Inder";
  caption.style.color="white";
  caption.style.fontSize="20px";

  image.style.width="50%";

  var container = document.createElement("div");
  container.appendChild(image);
  container.appendChild(caption);

  proficiencyLabel = document.createElement("p");
  proficiencyLabel.innerHTML = proficiency;
  proficiencyLabel.style.fontFamily = "Inder";
  proficiencyLabel.style.color="white";
  proficiencyLabel.style.fontSize="12px";

  container.appendChild(proficiencyLabel);

  container.style.width="30%";
  displayWindow.appendChild(container);
}





var tools = document.getElementById("tools");

tools.addEventListener("mouseover", function() {
  var xcodeImage = document.createElement("img");
  xcodeImage.src="images/xcode-icon.png";
  var xcodeLabel = document.createElement("p");

  var awsImage = document.createElement("img");
  awsImage.src="images/aws-logo.png";
  var awsLabel = document.createElement("p");

  clearWindow();

  addTool(xcodeImage, xcodeLabel, "XCode", "Intermediate");
  addTool(awsImage, awsLabel, "AWS", "Basic");

});

function addTool(image, label, caption, proficiency) {
  label.innerHTML = caption;
  label.style.fontFamily="Inder";
  label.style.color="white";
  label.style.fontSize="20px";

  image.style.width="50%";

  proficiencyLabel = document.createElement("p");
  proficiencyLabel.innerHTML = proficiency;
  proficiencyLabel.style.fontFamily = "Inder";
  proficiencyLabel.style.color="white";
  proficiencyLabel.style.fontSize="12px";

  var container = document.createElement("div");

  container.appendChild(image);
  container.appendChild(label);
  container.appendChild(proficiencyLabel);
  container.style.width="30%";

  displayWindow.appendChild(container);
}


var classes=document.getElementById("classes");

classes.addEventListener("mouseover", function() {

  clearWindow();

  addClass("Calculus with Analytic Geometry");
  addClass("Calculus with Analytic Geometry II");
  addClass("Calculus and Vector Analysis");

  addClass("Programming & Computation I: Fundamentals");
  addClass("Programming & Computation II: Data Structures");
  addClass("Discrete Mathematics for Computer Science");
  addClass("Object Oriented Programming with Web-Based Applications");

  addClass("General Physics: Mechanics");
  addClass("General Physics: Electricity & Magnetism");

});

function addClass(className) {
  var classItem = document.createElement("p");
  classItem.innerHTML=className;
  classItem.style.fontFamily="Inder";
  classItem.style.fontSize="20px";
  classItem.style.color="white";
  displayWindow.appendChild(classItem);
}



var codepath = document.getElementById("codepath");

codepath.addEventListener("mouseover", function() {
  var certificate = document.createElement("img");
  certificate.src="images/certificate.png";
  certificate.style.width="100%";
  clearWindow();
  displayWindow.appendChild(certificate);
});


var leadership = document.getElementById("leadership");
leadership.addEventListener("mouseover", function() {
  var marchingBand = document.createElement("p");
  marchingBand.innerHTML = "Marching Band Section Leader";
  // marchingBand.style.fontFamily="Inder";
  // marchingBand.style.fontSize="20px";
  // marchingBand.style.color="white";
  clearWindow();
  displayWindow.appendChild(marchingBand);

});

var div1 = document.getElementById("body-div1");
div1.addEventListener("mouseover", function() {
  var languages = document.getElementById("languages");
  languages.style.fontSize="30px";
});

div1.addEventListener("mouseout", function() {
  var languages = document.getElementById("languages");
  languages.style.fontSize="25px";
});


var div2 = document.getElementById("body-div2");
div2.addEventListener("mouseover", function() {
  var tools = document.getElementById("tools");
  tools.style.fontSize="30px";
});

div2.addEventListener("mouseout", function() {
  var tools = document.getElementById("tools");
  tools.style.fontSize="25px";
});

var div3 = document.getElementById("body-div3");
div3.addEventListener("mouseover", function() {
  var lead = document.getElementById("leadership");
  lead.style.fontSize="30px";
});

div3.addEventListener("mouseout", function() {
  var lead = document.getElementById("leadership");
  lead.style.fontSize="25px";
});


var div4 = document.getElementById("body-div4");
div4.addEventListener("mouseover", function() {
  var work = document.getElementById("work");
  work.style.fontSize="30px";
});

div4.addEventListener("mouseout", function() {
  var work = document.getElementById("work");
  work.style.fontSize="25px";
});


var div5 = document.getElementById("body-div5");
div5.addEventListener("mouseover", function() {
  var cal = document.getElementById("calisthenics");
  cal.style.fontSize="30px";
});

div5.addEventListener("mouseout", function() {
  var cal = document.getElementById("languages");
  cal.style.fontSize="25px";
});



function clearWindow() {
  while (displayWindow.children.length != 0) {
    displayWindow.removeChild(displayWindow.lastChild);
  }
}
