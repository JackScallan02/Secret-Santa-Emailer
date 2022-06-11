//Play Game Button Animation
var playing = false;
var points = 0;
var aboveAir = false;
var barFull = true;
const bar = document.getElementById("air-time-bar");
$(document).ready(function(){
  $("#play-game").click(function() {
    if (barFull == false) {
      $("#air-time-bar").animate({width:'toggle'},1500);
    }

    $(this).prop('disabled', true);
    $(this).fadeOut();
    $("#game-main").css('cursor', 'none');
    playing = true;

    var gameLayer = document.getElementById("game-layer");


    var lastYPos;
    var lastXPos;
    //For each shark that exists,
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

    var x;
    var y;
    $(document).mousemove(function(e) {
        x = e.pageX - $("#game-main").offset().left - 25;
        y = e.pageY - $("#game-main").offset().top - 20;
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
              deleteSharks();
              $("#air-time-bar").animate({width:'toggle'},1500);
              $("#background-div").css({
                animation: "none"
              });
              $("#game-main").css('cursor', 'auto');
              playing = false;
              $("#fish").css({
                top: 200,
                left: 20
              });
              $("#play-game").fadeIn(); //Play game button comes back
              setTimeout(function () {
                $("#play-game").prop('disabled', false);
                pointsText.innerHTML = "Points: 0";
                points = 0;
              }, 1000);
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
  var pointsText = document.getElementById("points-text");

    var shark = document.createElement("div");
    var random = getRandomInt(120, 490);

    $(shark).css({
      width: "100px",
      height: "35px",
      position: "absolute",
      backgroundImage: 'url(images/shark.png)',
      backgroundSize: "cover",
      left: 810,
      top: random,
      animation: "slide-shark 1s linear",
      zIndex: 1,
      opacity: 100
    });

  $(shark).bind('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd', function(e) { $(this).remove(); });

  //Repeatedly sends shark
  var variableTime;
  var sendShark = function () {
    variableTime = getRandomInt(1200, 1600);
    setTimeout(function(){

      if (playing) {
          var random = getRandomInt(120, 475);
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
            //console.log("Shark pos: ", sharkPos);
            //console.log(x);


          }, 10);

          var interval2 = setInterval(function() {
            sharkPos = shark.getBoundingClientRect().left - $("#game-main").offset().left - 25;
            sharkPosY = random - 50;

            if ((sharkPos < x && sharkPos > x - 10) && ((sharkPosY > y && sharkPosY < y + 10) || sharkPosY < y && sharkPosY > y - 10)) {
              //End the game
              deleteSharks();
              if (barFull == false) {
                $("#air-time-bar").stop();
                $("#air-time-bar").animate({width:'toggle'},1500);
                barFull = true;
              }

              $("#background-div").css({
                animation: "none"
              });
              $("#game-main").css('cursor', 'auto');
              playing = false;
              $("#fish").css({
                top: 200,
                left: 20
              });
              $("#play-game").fadeIn(); //Play game button comes back
              setTimeout(function () {
                $("#play-game").prop('disabled', false);
                pointsText.innerHTML = "Points: 0";
                points = 0;
              }, 1000);
            }
          }, 1);

          window.requestAnimationFrame(sendShark);
       }
    }, variableTime)
  };
  window.requestAnimationFrame(sendShark);



  //Repeatedly sends 2nd shark

  var shark2 = document.createElement("div");
  $(shark2).css({
    width: "100px",
    height: "35px",
    position: "absolute",
    backgroundImage: 'url(images/shark.png)',
    backgroundSize: "cover",
    left: 810,
    top: random,
    animation: "slide-shark 0.8s linear",
    zIndex: 1,
    opacity: 100
  });
  $(shark2).bind('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd', function(e) { $(this).remove(); });

  var sendShark2 = function () {
    variableTime = getRandomInt(1100, 1400);

    setTimeout(function(){
      if (playing) {
          var random = getRandomInt(120, 475);
          $(shark2).css({
            top: random,
          });

          gameLayer.appendChild(shark2);

          var shark2Pos;
          var shark2PosY;

          var interval = setInterval(function() {
            shark2Pos = shark2.getBoundingClientRect().left - $("#game-main").offset().left - 25;
            if (shark2Pos <= 0) {
              points += 1;
              pointsText.innerHTML = "Points: " + points;
              clearInterval(interval);
            }
          }, 10);


          var interval2 = setInterval(function() {
            shark2Pos = shark2.getBoundingClientRect().left - $("#game-main").offset().left - 25;
            shark2PosY = random - 50;

            if ((shark2Pos < x && shark2Pos > x - 10) && ((shark2PosY > y && shark2PosY < y + 10) || shark2PosY < y && shark2PosY > y - 10)) {
              deleteSharks();
              if (barFull == false) {
                $("#air-time-bar").stop();
                $("#air-time-bar").animate({width:'toggle'},1500);
                barFull = true;
              }

              $("#background-div").css({
                animation: "none"
              });
              $("#game-main").css('cursor', 'auto');
              playing = false;
              $("#fish").css({
                top: 200,
                left: 20
              });
              $("#play-game").fadeIn(); //Play game button comes back
              setTimeout(function () {
                $("#play-game").prop('disabled', false);
                pointsText.innerHTML = "Points: 0";
                points = 0;
              }, 1000);
            }
          }, 1);


          window.requestAnimationFrame(sendShark2);
       }

    }, variableTime)
  };
  window.requestAnimationFrame(sendShark2);

  //Repeatedly sends 3rd shark
    var waitTime = getRandomInt(15000, 30000);
    setTimeout(function() { //Waits 15-30 seconds before starting 3rd shark
      var shark3 = document.createElement("div");
      $(shark3).css({
        width: "100px",
        height: "35px",
        position: "absolute",
        backgroundImage: 'url(images/shark.png)',
        backgroundSize: "cover",
        left: 810,
        top: random,
        animation: "slide-shark 0.7s linear",
        zIndex: 1,
        opacity: 100
      });


      $(shark3).bind('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd', function(e) { $(this).remove(); });

      var sendShark3 = function () {
        variableTime = getRandomInt(1200, 1600);

        setTimeout(function(){
          if (playing) {
              var random = getRandomInt(120, 475);
              $(shark3).css({
                top: random,
              });
              gameLayer.appendChild(shark3);

              var shark3Pos;
              var shark3PosY;

              var interval = setInterval(function() {
                shark3Pos = shark3.getBoundingClientRect().left - $("#game-main").offset().left - 25;
                if (shark3Pos <= 0) {
                  points += 1;
                  pointsText.innerHTML = "Points: " + points;
                  clearInterval(interval);
                }
              }, 10);


              var interval2 = setInterval(function() {
                shark3Pos = shark3.getBoundingClientRect().left - $("#game-main").offset().left - 25;
                shark3PosY = random - 50;

                if ((shark3Pos < x && shark3Pos > x - 10) && ((shark3PosY > y && shark3PosY < y + 10) || shark3PosY < y && shark3PosY > y - 10)) {
                  deleteSharks();
                  if (barFull == false) {
                    $("#air-time-bar").stop();
                    $("#air-time-bar").animate({width:'toggle'},1500);
                    barFull = true;
                  }

                  $("#background-div").css({
                    animation: "none"
                  });
                  $("#game-main").css('cursor', 'auto');
                  playing = false;
                  $("#fish").css({
                    top: 200,
                    left: 20
                  });
                  $("#play-game").fadeIn(); //Play game button comes back
                  setTimeout(function () {
                    $("#play-game").prop('disabled', false);
                    pointsText.innerHTML = "Points: 0";
                    points = 0;
                  }, 1000);
                }
              }, 1);


              window.requestAnimationFrame(sendShark3);
           }

        }, variableTime)
    };

    window.requestAnimationFrame(sendShark3);

  }, waitTime);





  //Repeatedly sends 4th shark
    waitTime = getRandomInt(40000, 60000);
    setTimeout(function() { //Waits 40-60 seconds before starting 3rd shark
      var shark4 = document.createElement("div");
      $(shark4).css({
        width: "100px",
        height: "35px",
        position: "absolute",
        backgroundImage: 'url(images/shark.png)',
        backgroundSize: "cover",
        left: 810,
        top: random,
        animation: "slide-shark 0.6s linear",
        zIndex: 1,
        opacity: 100
      });


      $(shark4).bind('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd', function(e) { $(this).remove(); });

      var sendShark4 = function () {
        variableTime = getRandomInt(1200, 1600);

        setTimeout(function(){
          if (playing) {
              var random = getRandomInt(120, 475);
              $(shark4).css({
                top: random,
              });
              gameLayer.appendChild(shark4);

              var shark4Pos;
              var shark4PosY;

              var interval = setInterval(function() {
                shark4Pos = shark4.getBoundingClientRect().left - $("#game-main").offset().left - 25;
                if (shark4Pos <= 0) {
                  points += 1;
                  pointsText.innerHTML = "Points: " + points;
                  clearInterval(interval);
                }
              }, 10);


              var interval2 = setInterval(function() {
                shark4Pos = shark4.getBoundingClientRect().left - $("#game-main").offset().left - 25;
                shark4PosY = random - 50;

                if ((shark4Pos < x && shark4Pos > x - 10) && ((shark4PosY > y && shark4PosY < y + 10) || shark4PosY < y && shark4PosY > y - 10)) {
                  deleteSharks();
                  if (barFull == false) {
                    $("#air-time-bar").stop();
                    $("#air-time-bar").animate({width:'toggle'},1500);
                    barFull = true;
                  }

                  $("#background-div").css({
                    animation: "none"
                  });
                  $("#game-main").css('cursor', 'auto');
                  playing = false;
                  $("#fish").css({
                    top: 200,
                    left: 20
                  });

                  $("#play-game").fadeIn(); //Play game button comes back
                  setTimeout(function () {
                    $("#play-game").prop('disabled', false);
                    pointsText.innerHTML = "Points: 0";
                    points = 0;
                  }, 1000);
                }
              }, 1);


              window.requestAnimationFrame(sendShark4);
           }

        }, variableTime)
    };

    window.requestAnimationFrame(sendShark4);

  }, waitTime);

});



  $(document).on('keydown', function(event) {
    setTimeout(function (){


       if (event.key == "Escape" && playing == true) {
           $("#background-div").css({
             animation: "none"
           });
           $("#game-main").css('cursor', 'auto');
           playing = false;
           $("#play-game").fadeIn(); //Play game button comes back
           setTimeout(function () {
             $("#play-game").prop('disabled', false);
           }, 1000);

           const gameLayer = document.getElementById("game-layer");
           const lastShark = gameLayer.lastChild;

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
