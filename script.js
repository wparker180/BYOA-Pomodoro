let timeLeft;
let timerId = null;
let isWorkMode = true;
let inverseTimeElapsed = 0;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const inverseMinutesDisplay = document.getElementById('inverseMinutes');
const inverseSecondsDisplay = document.getElementById('inverseSeconds');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const modeToggleButton = document.getElementById('modeToggle');
const modeStatus = document.getElementById('modeStatus');

function updateDisplay() {
    // Main timer display
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    // Update the display elements
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
    
    // Inverse timer display
    const inverseMinutes = Math.floor(inverseTimeElapsed / 60);
    const inverseSeconds = inverseTimeElapsed % 60;
    
    inverseMinutesDisplay.textContent = inverseMinutes.toString().padStart(2, '0');
    inverseSecondsDisplay.textContent = inverseSeconds.toString().padStart(2, '0');
    
    // Update the page title
    document.title = `${timeString} - Pomodoro Timer`;
}

function startTimer() {
    if (timerId === null) {
        timerId = setInterval(() => {
            timeLeft--;
            inverseTimeElapsed++;
            updateDisplay();
            if (timeLeft === 0) {
                clearInterval(timerId);
                timerId = null;
                alert(isWorkMode ? 'Work time is up! Take a break!' : 'Break is over! Time to work!');
                resetTimer();
            }
        }, 1000);
    }
}

function pauseTimer() {
    clearInterval(timerId);
    timerId = null;
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    timeLeft = isWorkMode ? 25 * 60 : 5 * 60;
    inverseTimeElapsed = 0;
    updateDisplay();
}

function toggleMode() {
    isWorkMode = !isWorkMode;
    const icon = modeToggleButton.querySelector('i');
    
    if (isWorkMode) {
        icon.className = 'fas fa-sun';
        modeStatus.textContent = 'Time to work!';
    } else {
        icon.className = 'fas fa-moon';
        modeStatus.textContent = 'Time to rest!';
    }
    resetTimer();
}

// Initialize
timeLeft = 25 * 60;
updateDisplay();

// Event listeners
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
modeToggleButton.addEventListener('click', toggleMode); 