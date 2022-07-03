
var nextButton1 = document.getElementById("next-button-1");
var nextButton2 = document.getElementById("next-button-2");
var nextButton3 = document.getElementById("next-button-3");
var nextButton4 = document.getElementById("next-button-4");
var nextButton5 = document.getElementById("next-button-5");
var nextButton6 = document.getElementById("next-button-6");
addScrollEvent(nextButton1, 1300);
addScrollEvent(nextButton2, 1950);
addScrollEvent(nextButton3, 2600);
addScrollEvent(nextButton4, 3250);
addScrollEvent(nextButton5, 3700);
addScrollEvent(nextButton6, 0);

function addScrollEvent(button, scrollValue) {
  button.addEventListener("click", function() {
    window.scroll({
      top: scrollValue,
      left: 0,
      behavior: 'smooth'
    })
  });
}

$("#py-button").click(function() {
  $.ajax({
    url: "test.py",
    context: document.body
  })
});
