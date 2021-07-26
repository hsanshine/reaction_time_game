const spinner = document.querySelector(".spinner p");
const spinnerContainer = document.querySelector(".spinner");
let rotateCount = 0;
let startTime = null;
let rAF;
const btn = document.querySelector("button");
const result = document.querySelector(".result");
//btn.style.display = "none";
console.log("js is working");

// to generate random timeout interval
function random(min, max) {
  var num = Math.floor(Math.random() * (max - min)) + min;
  return num;
}

//draw function to animate the spinner
function draw(timestamp) {
  // console.log("draw function called");
  if (!startTime) {
    //console.log("in here");
    startTime = timestamp;
  }
  // we rotate more and more as time goes by since the start
  rotateCount = (timestamp - startTime) / 3;
  rotateCount %= 360; //keep the degrees btn 0 and 359 for simplicity
  //console.log(rotateCount);

  //code to rotate the spinner
  spinner.style.transform = "rotate(" + rotateCount + "deg)";
  rAF = requestAnimationFrame(draw);
}

//initially hide the spinner and the results
result.style.display = "none";
spinnerContainer.style.display = "none";

//to set up the inital look of the page on loading
function reset() {
  btn.style.display = "block";
  result.textContent = "";
  result.style.display = "none";
}

//start game when the button is pressed

btn.addEventListener("click", start);

function start() {
  //start the spinner spinning
  draw();
  console.log("start button pressed");
  //show the spinner and hide the button
  spinnerContainer.style.display = "block";
  btn.style.display = "none"; // we hide this button so you don't mess up the game by restarting it multiple times
  setTimeout(startEndgame, random(5000, 10000));
  //the game ends randomly after 5 seconds and before 10 seconds
}

//function to allow players to take their turn when the time is right
function startEndgame() {
  cancelAnimationFrame(rAF); // stop spinning
  spinnerContainer.style.display = "none";
  result.style.display = "block";
  result.textContent = "PLAYERS GO!!";

  document.addEventListener("keydown", keyHandler);

  function keyHandler(e) {
    let isOver = false;
    console.log(e.key);

    if (e.key === "a") {
      result.textContent = "Player 1 won!";
      isOver = true;
    } else if (e.key === "l") {
      result.textContent = "Player 2 won!!";
      isOver = true;
    }
    if (isOver) {
      document.removeEventListener("keydown", keyHandler);
      setTimeout(reset, 5000); // we reset the game to start again after 5 seconds
    }
  }
}
