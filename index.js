
var topButton = document.getElementById("next-button-6");
topButton.addEventListener("click", function() {
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth'
  })
});




$("#py-button").click(function() {
  $.ajax({
    url: "test.py",
    context: document.body
  })
});
