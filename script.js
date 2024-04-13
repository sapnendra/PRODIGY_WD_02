let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0]
let timeRef = document.querySelector(".timer-display");
let int = null;

document.getElementById("start-timer").addEventListener("click", ()=> {
    if(int != null) {
        clearInterval(int);
    }
    int = setInterval(displayTimer, 10);
});

document.getElementById("pause-timer").addEventListener("click", ()=> {
    clearInterval(int);
});

document.getElementById("reset-timer").addEventListener("click", ()=> {
    clearInterval(int);
    [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
    timeRef.innerHTML = "00 : 00 : 00 : 000"
});

function displayTimer() {
    milliseconds += 10;
    if(milliseconds == 1000) {
        milliseconds = 0;
        seconds++;
        if(seconds == 60) {
            seconds = 0;
            minutes++;
            if(minutes == 60) {
                minutes = 0;
                hours++;
            }
        }
    }
    
    let h = hours < 10 ? "0" + hours : hours;
    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds;
    
    let ms = milliseconds < 10 ? "00" + milliseconds : milliseconds < 100  ? "0" + milliseconds : milliseconds;
    let time = `${h} : ${m} : ${s} : ${ms}`;
    timeRef.innerHTML = time;

    return time
}

// laptime 

let startTime;
let running = false;
let lapTimes = [];

const stopwatchElement = document.querySelector("timer-display");
const lapTimeElement = document.getElementById("lapTimeDisplay");

function startStop() {
    running = !running;
}

function lapReset() {
    if (running) {
        lapTimes.push(displayTimer());
        const lapTime = displayTimer(); //${lapTimes.length} 
        lapTimeElement.innerHTML += `<div>You Clicked at : ${lapTime}</div>`;
    } else {
        stopwatchElement.textContent = '00:00:00';
        lapTimes = [];
        lapTimeElement.innerHTML = '';
        document.getElementById('startStopButton').textContent = 'Start';
    }
}

function resetLapButton() {
    lapTimeElement.innerHTML = "";
    lapTimes = [];
}

document.getElementById("start-timer").addEventListener("click", startStop);
document.getElementById("lap-btn").addEventListener("click", lapReset);
document.getElementById("lapResetButton").addEventListener("click", resetLapButton, startStop);