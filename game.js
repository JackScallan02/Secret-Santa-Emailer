var playing = false;
var points = 0;
var totalPoints = 0;

var shark3Timer = null;
var shark4Timer = null;
var shark3Time = getRandomInt(15000, 30000);
var shark4Time = getRandomInt(40000, 60000);
var shark3TimeRemaining = shark3Time;
var shark4TimeRemaining = shark4Time;
var timeElapsed = 0;
var beginTime;
var equippedFish = "#harold-button";

var gameStarted = false;
var gameEnded = false;
var fishPosX = document.getElementById("fish").getBoundingClientRect().left - $("#game-main").offset().left + 25;
var fishPosY = document.getElementById("fish").getBoundingClientRect().top - $("#game-main").offset().top + 20;

$(document).ready(function(){
  $("#play-game").click(function() {
    if (gameStarted == false) {
      beginTime = Date.now();
      gameStarted = true;
    }
    $(this).prop('disabled', true);
    $(this).fadeOut();
    $("#game-main").css('cursor', 'none');
    playing = true;
    gameEnded = false;
    $("#lose-div").fadeOut(300, function() {
      $("#lose-div").remove();
    });


    var gameLayer = document.getElementById("game-layer");

    //For each shark that exists,
    for (var i = 0; i < gameLayer.children.length; i++) {
      gameLayer.children[i].classList.toggle("paused");
    }


    $("#background-div").css({
      animation: "slide 3s linear infinite"
    });

    var barIncreasing = false;
    var barDecreasing = false;

    $(document).mousemove(function(e) {
        x = e.pageX - $("#game-main").offset().left - 25;
        y = e.pageY - $("#game-main").offset().top - 20;


        if (playing) {
          if (x >= 0 && y >= 0 && y <= 400 && x <= 720) {
            $("#fish").css({
              left: x,
              top: y,
            });
            fishPosX = x;
            fishPosY = y;
          } else if (x < 0 && y > 0 && y <= 400) {
            $("#fish").css({
              left: 0,
              top: y,
            });
            fishPosX = 0;
            fishPosY = y;

          } else if (x > 0 && y < 0 && x <= 720) {
            $("#fish").css({
              left: x,
              top: 0,
            });
            fishPosX = x;
            fishPosY = 0;
          } else if (x < 0 && y < 0) {
            $("#fish").css({
              left: 0,
              top: 0,
            });
            fishPosX = 0;
            fishPosY = 0;
          } else if (x > 0 && y > 400 && x < 720) {
            $("#fish").css({
              left: x,
              top: 400,
            });
            fishPosX = x;
            fishPosY = 400;
          } else if (x < 0 && y > 400) {
            $("#fish").css({
              left: 0,
              top: 400,
            });
            fishPosX = 0;
            fishPosY = 400;
          } else if (x > 720 && y > 0 && y < 400) {
            $("#fish").css({
              left: 720,
              top: y
            });
            fishPosX = 720;
            fishPosY = y;
          } else if (x > 720 && y > 400) {
            $("#fish").css({
              left: 720,
              top: 400,
            });
            fishPosX = 720;
            fishPosY = 400;
          }


          if (y <= 65 && barDecreasing == false) {
            $("#air-time-bar").stop();
            barDecreasing = true;
            barIncreasing = false;
            $("#air-time-bar").animate({width:'0%'},1500, function() {
              //If animation completes:
              if (playing == true) {
                endGame();
              }
            });

          } else if (y > 65 && barIncreasing == false) {
            $("#air-time-bar").stop();
            barIncreasing = true;
            barDecreasing = false;
            $("#air-time-bar").animate({width:'100%'},1500, function() {
              barIncreasing = false;
            });

          }
      }

    });


    var gameLayer = document.getElementById("game-layer");
    var random = getRandomInt(120, 490);


    sendShark(1, [1000, 1800]);
    sendShark(0.9, [1000, 1800]);


    var shark3Timer = setTimeout(function() {
      sendShark(0.7, [1200, 2000]);
    }, shark3Time - timeElapsed);

    var shark4Timer = setTimeout(function() {
      sendShark(0.6, [1400, 2200]);
    }, shark4Time - timeElapsed);


  });



  $(document).on('keydown', function(event) {
    setTimeout(function (){
       if (event.key == "Escape" && playing == true) {
           $("#background-div").css({
             animation: "none"
           });

           clearTimeout(shark3Timer);
           clearTimeout(shark4Timer);
           timeElapsed = Date.now() - beginTime;

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


           for (var i = 0; i < gameLayer.children.length; i++) {
             gameLayer.children[i].classList.toggle("paused");
           }

       }
     }, 100);
   });

   $(".fish-label").hover(function() {
     $(this).css({
       cursor: "pointer",
       fontSize: "20px"
     });
   }, function() {
     $(this).css({
       cursor: "default",
       fontSize: "18px"
     });
   });



//Fish Shop

  haroldOwned = true;
  $("#harold-button").click(function() {
    if (equippedFish != "#harold-button") {
      $(equippedFish).html("Equip");
      equippedFish = "#harold-button"
      $("#fish").css({
        background: "url(images/fish1.png) no-repeat",
        backgroundSize: "contain"
      });
      $("#harold-button").html("Equipped");
    }
  });

  jeffOwned = false;
  $("#buy-jeff").click(function() {
    if (buyFish("#buy-jeff", 30, jeffOwned, "fish2")) {
      jeffOwned = true;
    }
  });

  sigmaOwned = false;
  $("#buy-sigma").click(function() {
    if (buyFish("#buy-sigma", 50, sigmaOwned, "fish3")) {
      sigmaOwned = true;
    }
  });

  var luluOwned = false;
  $("#buy-lulu").click(function() {
    if (buyFish("#buy-lulu", 100, sigmaOwned, "fish4")) {
      luluOwned = true;
    }
  });

  var chrigOwned = false;
  $("#buy-chrig").click(function() {
    if (buyFish("#buy-chrig", 150, chrigOwned, "fish4")) {
      chrigOwned = true;
    }
  });



}); //End document.ready


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.ceil(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function deleteSharks() {
  const gameLayer = document.getElementById("game-layer");
  gameLayer.innerHTML = "";
}



function endGame() {
  gameEnded = true;
  gameStarted = false;

  $("#air-time-bar").stop();
  $("#air-time-bar").animate({width:'100%'},1500);

    deleteSharks();


    timeElapsed = 0;

    clearTimeout(shark3Timer);
    clearTimeout(shark4Timer);

    shark3Time = getRandomInt(15000, 30000);
    shark4Time = getRandomInt(40000, 60000);
    shark3TimeRemaining = shark3Time;
    shark4TimeRemaining = shark4Time;




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
      $("#points-text").html("Points: 0")
      totalPoints += points;
      $("#total-points-text").html("Available points: " + totalPoints);
      points = 0;
    }, 1000);


    $("<div/>", {
      text: "You Lose!",
      id: "lose-div"
    }).appendTo("#main-div").hide().fadeIn(1000);

    $("<div/>", {
      id: "score-div",
      text: "Score: " + points,

    }).appendTo("#lose-div")


}


function createShark(speed) { //Use setinterval with sendShark2 invocation
  var gameLayer = document.getElementById("game-layer");
  var shark = document.createElement("div");
  var sharkPosY = getRandomInt(120, 450);
  $(shark).css({
    width: "100px",
    height: "35px",
    position: "absolute",
    backgroundImage: 'url(images/shark.png)',
    backgroundSize: "cover",
    left: 810,
    top: sharkPosY,
    animation: "slide-shark " + speed + "s linear",
    zIndex: 1,
    opacity: 100
  });

  $(shark).bind('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd', function(e) {
    $(this).remove();
    points += 1;
    $("#points-text").html("Points: " + points);
  });

  if (playing == false || gameEnded) {
    return;
  }

  gameLayer.appendChild(shark);

  var sharkPosX;
  sharkPosY -= 50;

  var interval = setInterval(function() {
    sharkPosX = shark.getBoundingClientRect().left - $("#game-main").offset().left - 25;


    if ((sharkPosX < fishPosX + 15 && sharkPosX > fishPosX - 10) && ((sharkPosY > fishPosY && sharkPosY < fishPosY + 10) || sharkPosY < fishPosY && sharkPosY > fishPosY - 10)) {
      console.log("Collision at: " + sharkPosX + ", " + sharkPosY);
      endGame();
      clearInterval(interval);
      return;
    }

    if (gameEnded) {
      clearInterval(interval);
      return;
    }

    if (sharkPosX <= 0 && playing) {
      clearInterval(interval);
      return;
    }

  }, 5);

}


function sendShark(speed, timeArray) {
  var timeRange = getRandomInt(timeArray[0], timeArray[1]);
  var send = function() {
    createShark(speed);
    timeRange = getRandomInt(timeArray[0], timeArray[1]);
    if (playing && gameEnded == false) {
      setTimeout(send, timeRange);
    } else {
      return;
    }
  }
  setTimeout(send, timeRange);
}


function buyFish(id, cost, fishOwned, image) {
  var bought = false;
  if (fishOwned) {
    bought = true;
  }
  if (!fishOwned && totalPoints >= cost) {
    bought = true;
    totalPoints -= cost;
    $("#total-points-text").html("Available points: " + totalPoints);
    $(id).html("Equip");

  } else if (fishOwned) {

    $("#fish").css({
      background: "url(images/" + image + ".png) no-repeat",
      backgroundSize: "contain"
    });
    $(equippedFish).html("Equip");
    $(id).html("Equipped");
    equippedFish = id;
  }
  return bought;

}
