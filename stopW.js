let seconds = 0;
let minutes = 0;
let hours = 0;
let milliseconds = 0;
let timer = null;
let isRunning = false;
let laps = [];

function updateDisplay() {
    let h = hours < 10 ? "0" + hours : hours;
    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds;
    let ms = milliseconds < 10 ? "0" + milliseconds : milliseconds;

    document.getElementById("hours").innerText = h;
    document.getElementById("minutes").innerText = m;
    document.getElementById("seconds").innerText = s;
    document.getElementById("ms").innerText = ms;
}

function startTimer() {
    if (isRunning) return;
    
    isRunning = true;
    document.getElementById("startBtn").style.display = "none";
    document.getElementById("lapBtn").style.display = "flex";

    timer = setInterval(() => {
        milliseconds++;

        if (milliseconds === 100) {
            milliseconds = 0;
            seconds++;
        }

        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }

        if (minutes === 60) {
            minutes = 0;
            hours++;
        }

        updateDisplay();
    }, 10);
}

function stopTimer() {
    clearInterval(timer);
    timer = null;
    isRunning = false;
    document.getElementById("startBtn").style.display = "flex";
    document.getElementById("lapBtn").style.display = "none";
}

function recordLap() {
    if (!isRunning) return;
    
    let lapTime = 
        (hours < 10 ? "0" + hours : hours) + ":" +
        (minutes < 10 ? "0" + minutes : minutes) + ":" +
        (seconds < 10 ? "0" + seconds : seconds) + "." +
        (milliseconds < 10 ? "0" + milliseconds : milliseconds);
    
    laps.unshift(lapTime);
    displayLaps();
}

function displayLaps() {
    const lapsList = document.getElementById("lapsList");
    
    if (laps.length === 0) {
        lapsList.innerHTML = '<p class="empty-laps">No laps recorded yet</p>';
        return;
    }

    lapsList.innerHTML = laps.map((lap, index) => `
        <div class="lap-item">
            <span class="lap-number">Lap ${laps.length - index}</span>
            <span class="lap-time">${lap}</span>
        </div>
    `).join('');
}

function resetTimer() {
    stopTimer();
    seconds = 0;
    minutes = 0;
    hours = 0;
    milliseconds = 0;
    laps = [];
    updateDisplay();
    displayLaps();
}

updateDisplay();
displayLaps();


