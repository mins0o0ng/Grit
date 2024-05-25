//집중시간 파트
let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let accumulatedTime = 0;
let lastStartTime;

const stopwatchDisplay = document.getElementById("stopwatch");
const accumulatedTimeDisplay = document.getElementById("accumulatedTime");
const startStopBtn = document.getElementById("startStopBtn");
const resetBtn = document.getElementById("resetBtn");

const div1 = document.querySelector("#anime-bar div:first-child");
const div2 = document.querySelector("#anime-bar div:nth-child(2)");
const div3 = document.querySelector("#anime-bar div:nth-child(3)");
const div4 = document.querySelector("#anime-bar div:nth-child(4)");
const div5 = document.querySelector("#anime-bar div:last-child");
const focusComment = document.getElementById("focus-comment");

function formatTime(time) {
  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = Math.floor((time % 60000) / 1000);

  return (
    `${String(hours).padStart(2, "0")}:` +
    `${String(minutes).padStart(2, "0")}:` +
    `${String(seconds).padStart(2, "0")}`
  );
}

function formatAccumulatedTime(time) {
  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = Math.floor((time % 60000) / 1000);

  return (
    `${String(hours).padStart(2, "0")}H ` +
    `${String(minutes).padStart(2, "0")}M ` +
    `${String(seconds).padStart(2, "0")}S`
  );
}

function updateDisplay() {
  stopwatchDisplay.textContent = formatTime(elapsedTime);
}

function updateAccumulatedTimeDisplay() {
  accumulatedTimeDisplay.textContent = `Focus-Time: ${formatAccumulatedTime(
    accumulatedTime
  )}`;
}

function startStopwatch() {
  startTime = Date.now() - elapsedTime;
  lastStartTime = Date.now();
  timer = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    updateDisplay();
  }, 10);
  resetBtn.disabled = true;
}

function stopStopwatch() {
  clearInterval(timer);
  accumulatedTime += Date.now() - lastStartTime;
  updateAccumulatedTimeDisplay();
  resetBtn.disabled = false;
}

startStopBtn.addEventListener("mouseout", () => {
  if (isRunning) {
    stopStopwatch();
    startStopBtn.textContent = "Start";
    div1.classList.remove("anime");
    div2.classList.remove("anime");
    div3.classList.remove("anime");
    div4.classList.remove("anime");
    div5.classList.remove("anime");
    focusComment.innerText = "Click and start to focus";
    focusComment.style.color = "black";
    isRunning = !isRunning;
  }
  waveing();
});

startStopBtn.addEventListener("click", () => {
  if (isRunning) {
    stopStopwatch();
    startStopBtn.textContent = "Start";
    div1.classList.remove("anime");
    div2.classList.remove("anime");
    div3.classList.remove("anime");
    div4.classList.remove("anime");
    div5.classList.remove("anime");
    focusComment.innerText = "Click and start to focus";
    focusComment.style.color = "black";
  } else {
    startStopwatch();
    startStopBtn.textContent = "Stop";
    div1.classList.add("anime");
    div2.classList.add("anime");
    div3.classList.add("anime");
    div4.classList.add("anime");
    div5.classList.add("anime");
    focusComment.innerText = "Don't move your mouse point !!";
    focusComment.style.color = "tomato";
  }
  isRunning = !isRunning;
  waveing();
});

resetBtn.addEventListener("click", () => {
  clearInterval(timer);
  elapsedTime = 0;
  updateDisplay();
  startStopBtn.textContent = "Start";
  isRunning = false;
  resetBtn.disabled = true;
  div1.classList.remove("anime");
  div2.classList.remove("anime");
  div3.classList.remove("anime");
  div4.classList.remove("anime");
  div5.classList.remove("anime");
  focusComment.innerText = "Click and start to focus";
  focusComment.style.color = "black";
  resetWaving();
});

//백색소음 파트
const playBtn = document.getElementById("playBtn");
const volumeControl = document.getElementById("volumeControl");
const whiteNoise = document.getElementById("whiteNoise");

playBtn.addEventListener("click", () => {
  if (whiteNoise.paused) {
    whiteNoise.play();
    playBtn.textContent = "Pause";
  } else {
    whiteNoise.pause();
    playBtn.textContent = "Play";
  }
});

volumeControl.addEventListener("input", () => {
  whiteNoise.volume = volumeControl.value;
});

//물결 파트
const wave1 = document.querySelector(".wave-one");
const wave2 = document.querySelector(".wave-two");
const wave3 = document.querySelector(".wave-three");
let size = 570;

function waveing() {
  if (startStopBtn.textContent === "Stop") {
    interval = setInterval(() => {
      size += 1;
      wave1.style.width = `${size + 30}px`;
      wave1.style.height = `${size + 30}px`;
      wave2.style.width = `${size + 15}px`;
      wave2.style.height = `${size + 15}px`;
      wave3.style.width = `${size}px`;
      wave3.style.height = `${size}px`;
    }, 100);

    if (size >= 1650) {
      clearInterval(interval);
    }
  } else {
    clearInterval(interval);
  }
}

function resetWaving() {
  size = 570;
  wave1.style.width = `${size}px`;
  wave1.style.height = `${size}px`;
  wave2.style.width = `${size}px`;
  wave2.style.height = `${size}px`;
  wave3.style.width = `${size}px`;
  wave3.style.height = `${size}px`;
}
