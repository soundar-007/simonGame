let Level = 0;

let game = true;
const btnColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClicked = [];

$(".btn").click(function () {
  if (!game) {
    var userChoosenColor = $(this).attr("id");
    userClicked.push(userChoosenColor);
    Plays(userChoosenColor);
    animates(userChoosenColor);
    checkAnswer(userClicked.length - 1);
  }
});

function next() {
  userClicked = [];
  Level++;
  $("h1").text(`Level ${Level}`);
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChoosenColor = btnColors[randomNumber];
  gamePattern.push(randomChoosenColor);
  $(`#${randomChoosenColor}`).fadeOut(100).fadeIn(100);
  Plays(randomChoosenColor);
}

$(document).keypress(() => {
  if (game) {
    game = false;
    next();
  }
});

function Plays(song) {
  let audio = new Audio(`sounds/${song}.mp3`);
  audio.play();
}
function animates(color) {
  $(`#${color}`).addClass("pressed");
  setTimeout(function () {
    $(`#${color}`).removeClass("pressed");
  }, 100);
}
function checkAnswer(length) {
  if (gamePattern[length] == userClicked[length]) {
    if (gamePattern.length == userClicked.length) {
      setTimeout(function () {
        next();
      }, 1000);
    }
  } else {
    Plays("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}
function startOver() {
  Level = 0;
  gamePattern = [];
  game = true;
}
