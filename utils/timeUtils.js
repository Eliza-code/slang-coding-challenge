const { convertToDecimal } = require("./mathUtils");

function calculateDurationInSeconds(start, finish) {
  const startInSeconds = new Date(start).getTime() / 1000;
  const finishInSeconds = new Date(finish).getTime() / 1000;
  return convertToDecimal(finishInSeconds - startInSeconds);
}

module.exports = {
  calculateDurationInSeconds,
};