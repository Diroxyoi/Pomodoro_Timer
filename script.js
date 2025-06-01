let timer;
let isRunning = false;
let timeLeft;
let currentMode = 'pomodoro';

const MODES = {
  pomodoro: 25 * 60,
  short: 5 * 60,
  long: 15 * 60
};

const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const soundSelect = document.getElementById('sound');

function updateDisplay() {
  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const seconds = String(timeLeft % 60).padStart(2, '0');
  timerDisplay.textContent = `${minutes}:${seconds}`;
}

function playSound() {
  const sound = new Audio(soundSelect.value);
  sound.play();
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;
  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateDisplay();
    } else {
      clearInterval(timer);
      playSound();
      isRunning = false;
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  timeLeft = MODES[currentMode];
  updateDisplay();
}

function setMode(mode) {
  clearInterval(timer);
  isRunning = false;
  currentMode = mode;
  timeLeft = MODES[mode];
  updateDisplay();
}

// เริ่มต้นโหลด
setMode('pomodoro');

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

function showNotification(message) {
    const notify = document.createElement("div");
    notify.className = "notification";
    notify.innerText = message;
    document.body.appendChild(notify);
    setTimeout(() => {
      notify.remove();
    }, 5000); // แสดง 5 วินาที
  }
  
  function playSound() {
    const sound = new Audio(soundSelect.value);
    sound.play();
  }
  
  function startTimer() {
    if (isRunning) return;
    isRunning = true;
    timer = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        updateDisplay();
      } else {
        clearInterval(timer);
        playSound();
        showNotification("⏰ หมดเวลาแล้ว!");
        isRunning = false;
      }
    }, 1000);
  }
  
