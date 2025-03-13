import { generateDraw } from "./startDraw.js";

let countdownRunning = false;
let timeLeft = 60;

function startCountdown(io) {
  if (!countdownRunning) {
    countdownRunning = true;

    const countdownInterval = setInterval(() => {
      if (timeLeft > 0) {
        io.emit("countdown", timeLeft);
        // console.log(`Emitting countdown: ${timeLeft}`);`
        timeLeft--;
      } else {
        // Reset countdown state
        clearInterval(countdownInterval);
        countdownRunning = false;
        timeLeft = 60;

        // Restart countdown
        startCountdown(io);
      }

      generateDraw(io, timeLeft);

      return timeLeft;
    }, 1000);
  }
}

export { startCountdown };
