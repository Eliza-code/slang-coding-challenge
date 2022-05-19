function calculateDurationInSeconds(start, finish) {
  const startInSeconds = new Date(start).getTime() / 1000;
  const finishInSeconds = new Date(finish).getTime() / 1000;
  return finishInSeconds - startInSeconds;
}

module.exports = {
  calculateDurationInSeconds,
}
