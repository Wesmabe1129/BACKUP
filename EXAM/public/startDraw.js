function generateDraw(io, timeLeft) {
  if (timeLeft !== 0) return; // ✅ Ensures draw only happens when timeLeft is 0

  console.log(timeLeft);

  const LOTTO_RANGE = 49; // ✅ Defined constant for flexibility
  const LOTTO_NUMBERS = 6; // ✅ Define number of lotto picks

  const numbers = new Set();
  while (numbers.size < LOTTO_NUMBERS) {
    numbers.add(Math.floor(Math.random() * LOTTO_RANGE) + 1);
  }

  const drawNumbers = Array.from(numbers);

  console.log(`🎉 New Draw: ${drawNumbers.join(", ")}`); // ✅ Debugging log

  if (io) {
    io.emit("draw", drawNumbers); // ✅ Ensures `io` is valid before emitting
  }

  return drawNumbers; // ✅ Returns the draw numbers in case other functions need it
}

export { generateDraw };
