let startBtn = document.getElementById("start");
let stopBtn = document.getElementById("stop");
let resetBtn = document.getElementById("reset");

let minute = 0;
let second = 0;
let timer = false;
let startTime,
  elapsedTime = 0;

startBtn.addEventListener("click", function () {
  if (!timer) {
    timer = true;
    startTime = Date.now() - elapsedTime;
    stopWatch();
  }
});

stopBtn.addEventListener("click", function () {
  timer = false;
  elapsedTime = Date.now() - startTime;
});

resetBtn.addEventListener("click", function () {
  timer = false;
  minute = 0;
  second = 0;
  elapsedTime = 0;
  document.getElementById("min").innerHTML = "0min";
  document.getElementById("sec").innerHTML = "00s";
});

function stopWatch() {
  if (timer) {
    elapsedTime = Date.now() - startTime;

    second = Math.floor((elapsedTime / 1000) % 60);
    minute = Math.floor(elapsedTime / (1000 * 60));

    let minString = "";
    if (minute >= 1) {
      minString = minute + "min";
    }
    let secString = second + "s";

    if (second < 10) {
      secString = "0" + secString;
    }

    document.getElementById("min").innerHTML = minString;
    document.getElementById("sec").innerHTML = secString;

    requestAnimationFrame(stopWatch);
  }
}
