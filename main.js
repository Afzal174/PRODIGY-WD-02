// Stopwatch variables
let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let timerInterval = null;

// Get DOM elements
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const millisecondsEl = document.getElementById('milliseconds');
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const resetLapBtn = document.getElementById('resetLap');
const lapList = document.getElementById('lapList');

// Update stopwatch display
function updateDisplay() {
  minutesEl.textContent = String(minutes).padStart(2, '0');
  secondsEl.textContent = String(seconds).padStart(2, '0');
  millisecondsEl.textContent = String(milliseconds).padStart(2, '0');
}

// Stopwatch logic
function startStopwatch() {
  if (!timerInterval) {
    timerInterval = setInterval(() => {
      milliseconds += 1;
      if (milliseconds === 100) {
        milliseconds = 0;
        seconds += 1;
      }
      if (seconds === 60) {
        seconds = 0;
        minutes += 1;
      }
      updateDisplay();
    }, 10); // Update every 10 milliseconds
  }
}

function stopStopwatch() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function resetStopwatch() {
  stopStopwatch();
  minutes = 0;
  seconds = 0;
  milliseconds = 0;
  updateDisplay();
  clearLaps(); // Clear laps on reset
}

// Lap logic
function addLap() {
  const lapTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(2, '0')}`;
  const lapItem = document.createElement('li');
  lapItem.textContent = `Lap ${lapList.childElementCount + 1}: ${lapTime}`;
  lapList.appendChild(lapItem);
}

function clearLaps() {
  lapList.innerHTML = ''; // Clear all lap entries
}

// Event listeners
startBtn.addEventListener('click', startStopwatch);
stopBtn.addEventListener('click', stopStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', addLap);
resetLapBtn.addEventListener('click', clearLaps);