//Play Game Button Animation
var playing = false;
var points = 0;
const pointsText = document.getElementById("points-text");
const bar = document.getElementById("air-time-bar");
var aboveAir = false;
var barFull = true;
var shark3Timer = null;
var shark4Timer = null;
var x;
var y;
let requestShark;



$(document).ready(function(){
  $("#play-game").click(function() {

    $(this).prop('disabled', true);
    $(this).fadeOut();
    $("#game-main").css('cursor', 'none');
    playing = true;

    var gameLayer = document.getElementById("game-layer");


    var lastYPos;
    var lastXPos;
    //For each shark that exists,
    //console.log(gameLayer.children.length);
    for (var i = 0; i < gameLayer.children.length; i++) {
      lastYPos = gameLayer.children[i].getBoundingClientRect().top - $("#game-main").offset().top + 50;
      lastXPos = gameLayer.children[i].getBoundingClientRect().left - $("#game-main").offset().left;
      gameLayer.children[i].style.animation = "slide-shark 1s linear";
      $("#game-layer").children().eq(i).bind('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd', function(e) { $(this).remove(); });
      gameLayer.children[i].style.left = `${lastXPos}px`;
      gameLayer.children[i].style.top = `${lastYPos}px`;

    }


    $("#background-div").css({
      animation: "slide 3s linear infinite"
    });


    $(document).mousemove(function(e) {
        x = e.pageX - $("#game-main").offset().left - 25;
        y = e.pageY - $("#game-main").offset().top - 20;

        //console.log("Mouse position: ", x);
        if (playing) {
          if (x >= 0 && y >= 0 && y <= 400 && x <= 720) {
            $("#fish").css({
              left: x,
              top: y,
            });
          } else if (x < 0 && y > 0 && y <= 400) {
            $("#fish").css({
              left: 0,
              top: y,
            });

          } else if (x > 0 && y < 0 && x <= 720) {
            $("#fish").css({
              left: x,
              top: 0,
            });
          } else if (x < 0 && y < 0) {
            $("#fish").css({
              left: 0,
              top: 0,
            });
          } else if (x > 0 && y > 400 && x < 720) {
            $("#fish").css({
              left: x,
              top: 400,
            });
          } else if (x < 0 && y > 400) {
            $("#fish").css({
              left: 0,
              top: 400,
            });
          } else if (x > 720 && y > 0 && y < 400) {
            $("#fish").css({
              left: 720,
              top: y
            });
          } else if (x > 720 && y > 400) {
            $("#fish").css({
              left: 720,
              top: 400,
            });
          }



          barX = bar.getBoundingClientRect().left;

          if (y <= 65 && aboveAir == false) {
            aboveAir = true;
            $("#air-time-bar").stop();

            $("#air-time-bar").animate({width:'toggle'},1500, function() {
              //If animation completes:
              barFull = false;
              if (playing == true) {
                endGame();
              }


            });

          } else if (y > 65 && aboveAir == true) {
            aboveAir = false;
            $("#air-time-bar").stop();
            $("#air-time-bar").animate({width:'toggle'},1500, function() {
              barFull = true;
            });

          }
      }

    });


  var gameLayer = document.getElementById("game-layer");
  var random = getRandomInt(120, 490);


  sendShark([1300, 1700], 1);
  sendShark([1100, 1400], 0.9);

  shark3Timer = setTimeout(function() {
    sendShark([1300, 1500], 0.7);
  }, getRandomInt(15000, 30000));


  shark4Timer = setTimeout(function() {
    sendShark([1200, 1600], 0.6);
  }, getRandomInt(40000, 60000));

});



  $(document).on('keydown', function(event) {
    setTimeout(function (){


       if (event.key == "Escape" && playing == true) {
           $("#background-div").css({
             animation: "none"
           });

           cancelAnimationFrame(requestShark);

           $("#game-main").css('cursor', 'auto');
           playing = false;
           $("#play-game").fadeIn(); //Play game button comes back
           setTimeout(function () {
             $("#play-game").prop('disabled', false);
           }, 1000);

           $("#play-game").html("Resume");
           $("#air-time-bar").stop();

           const gameLayer = document.getElementById("game-layer");
           const sharks = gameLayer.children;

           var lastYPos;
           var lastXPos;

           for (var i = 0; i < gameLayer.children.length; i++) {
             lastYPos = gameLayer.children[i].getBoundingClientRect().top - $("#game-main").offset().top + 50;
             lastXPos = gameLayer.children[i].getBoundingClientRect().left - $("#game-main").offset().left;

             gameLayer.children[i].style.animation = "none";
             gameLayer.children[i].style.left = `${lastXPos}px`;
             gameLayer.children[i].style.top = `${lastYPos}px`;

           }

       }
     }, 100);
   });
});


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.ceil(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function deleteSharks() {
  const gameLayer = document.getElementById("game-layer");
  gameLayer.innerHTML = "";
}






function sendShark(range, speed) {
  if (playing == false) {
    return;
  }

  var gameLayer = document.getElementById("game-layer");

  var shark = document.createElement("div");

  $(shark).css({
    width: "100px",
    height: "35px",
    position: "absolute",
    backgroundImage: 'url(images/shark.png)',
    backgroundSize: "cover",
    left: 810,
    top: random,
    animation: "slide-shark " + speed + "s linear",
    zIndex: 1,
    opacity: 100
  });

  $(shark).bind('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd', function(e) { $(this).remove(); });

  var variableTime;
  var random;
  var requestShark = function () {
    if (playing == false) {
      cancelAnimationFrame(requestShark);
      return;
    }

    variableTime = getRandomInt(range[0], range[1]);
    setTimeout(function(){

      if (playing) {
          random = getRandomInt(120, 475);
          $(shark).css({
            top: random,
          });

          gameLayer.appendChild(shark);

          var sharkPos;
          var sharkPosY;
          var interval = setInterval(function() {

            sharkPos = shark.getBoundingClientRect().left - $("#game-main").offset().left - 25;
            sharkPosY = random - 50;


            if (sharkPos <= 0) {
              points += 1;
              pointsText.innerHTML = "Points: " + points;
              clearInterval(interval);

            }

            if (playing == false) {
              clearInterval(interval);
            }

          }, 10);

          var interval2 = setInterval(function() {
            sharkPos = shark.getBoundingClientRect().left - $("#game-main").offset().left - 25;
            sharkPosY = random - 55;


            if ((sharkPos < x && sharkPos > x - 10) && ((sharkPosY > y && sharkPosY < y + 10) || sharkPosY < y && sharkPosY > y - 10)) {
              if (playing == true) {
                clearInterval(interval2);
                endGame();
              }


            }
          }, 1);

          window.requestAnimationFrame(requestShark);
       }
    }, variableTime)
  };


  window.requestAnimationFrame(requestShark);


}



function endGame() {
  if (barFull == false) {
    $("#air-time-bar").stop();
    $("#air-time-bar").animate({width:'toggle'},1500);
    }

    barFull = true;
    aboveAir = false;
    deleteSharks();
    cancelAnimationFrame(requestShark);



    clearTimeout(shark3Timer);
    clearTimeout(shark4Timer);

    $("#background-div").css({
      animation: "none"
    });
    $("#game-main").css('cursor', 'auto');
    playing = false;
    $("#fish").css({
      top: 200,
      left: 20
    });
    $("#play-game").html("Play Game");
    $("#play-game").fadeIn(); //Play game button comes back
    setTimeout(function () {
      $("#play-game").prop('disabled', false);
      pointsText.innerHTML = "Points: 0";
      points = 0;
    }, 1000);
}
