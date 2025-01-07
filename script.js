let timeLeft;
let inverseTimeElapsed = 0;
let timerId = null;
let isWorkMode = true;
let currentFocus = '';

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const inverseMinutesDisplay = document.getElementById('inverseMinutes');
const inverseSecondsDisplay = document.getElementById('inverseSeconds');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const modeToggleButton = document.getElementById('modeToggle');
const modeStatus = document.getElementById('modeStatus');
const addFiveButton = document.getElementById('addFive');
const focusDisplay = document.getElementById('focusDisplay');
const focusText = document.getElementById('focusText');
const focusModal = document.getElementById('focusModal');
const focusInput = document.getElementById('focusInput');
const confirmFocusBtn = document.getElementById('confirmFocus');
const cancelFocusBtn = document.getElementById('cancelFocus');

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
    
    const inverseMinutes = Math.floor(inverseTimeElapsed / 60);
    const inverseSeconds = inverseTimeElapsed % 60;
    
    inverseMinutesDisplay.textContent = inverseMinutes.toString().padStart(2, '0');
    inverseSecondsDisplay.textContent = inverseSeconds.toString().padStart(2, '0');
    
    document.title = `${timeString} - Pomodoro Timer`;
}

function startTimer() {
    if (timerId === null) {
        showFocusModal();
    }
}

function pauseTimer() {
    clearInterval(timerId);
    timerId = null;
    addFiveButton.classList.add('hidden');
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    timeLeft = isWorkMode ? 30 * 60 : 5 * 60;
    inverseTimeElapsed = 0;
    addFiveButton.classList.add('hidden');
    focusDisplay.classList.add('hidden');
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

function addFiveMinutes() {
    timeLeft += 5 * 60;
    updateDisplay();
}

function showFocusModal() {
    focusModal.classList.remove('hidden');
    focusInput.focus();
    
    document.addEventListener('keydown', handleEscapeKey);
    
    focusModal.addEventListener('click', handleOutsideClick);
}

function handleEscapeKey(e) {
    if (e.key === 'Escape') {
        closeFocusModal();
    }
}

function handleOutsideClick(e) {
    if (e.target === focusModal) {
        closeFocusModal();
    }
}

function closeFocusModal() {
    focusModal.classList.add('hidden');
    focusInput.value = '';
    document.removeEventListener('keydown', handleEscapeKey);
    focusModal.removeEventListener('click', handleOutsideClick);
}

function startSession() {
    const focus = focusInput.value.trim();
    if (!focus) {
        return;
    }
    
    currentFocus = focus;
    focusText.textContent = currentFocus;
    focusDisplay.classList.remove('hidden');
    addFiveButton.classList.remove('hidden');
    
    closeFocusModal();
    
    timerId = setInterval(() => {
        timeLeft--;
        inverseTimeElapsed++;
        updateDisplay();
        if (timeLeft === 0) {
            clearInterval(timerId);
            timerId = null;
            addFiveButton.classList.add('hidden');
            focusDisplay.classList.add('hidden');
            alert(isWorkMode ? 'Work time is up! Take a break!' : 'Break is over! Time to work!');
            resetTimer();
        }
    }, 1000);
}

// Initialize
resetTimer();

// Event listeners
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
modeToggleButton.addEventListener('click', toggleMode);
addFiveButton.addEventListener('click', addFiveMinutes);
confirmFocusBtn.addEventListener('click', startSession);
cancelFocusBtn.addEventListener('click', closeFocusModal);
focusInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        startSession();
    }
}); 