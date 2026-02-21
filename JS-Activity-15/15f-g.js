export function isWeekend(date) { // 15f Activity we put this on different files.
  return date.format('dddd') === 'Saturday' || date.format('dddd') === 'Sunday';
}

export default isWeekend; // 15g Activity we export this function as a default.