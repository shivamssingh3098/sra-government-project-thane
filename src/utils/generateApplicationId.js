export function generateApplicationId() {
  const timestamp = Date.now(); // current time in ms
  const random = Math.floor(Math.random() * 10000); // random 4-digit number
  return `${timestamp}${random}`;
}
