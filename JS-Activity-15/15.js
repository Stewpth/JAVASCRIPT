import dayjs from 'https://cdn.jsdelivr.net/npm/dayjs@1.11.10/+esm';
import exportIsWeekend from 'https://cdn.jsdelivr.net/npm/dayjs@1.11.10/plugin/isWeekend/+esm';

// 15a Activity
const today = dayjs();
let addedDate = today.add(5, 'day');
let formattedDate = addedDate.format('M, D');

console.log(formattedDate);

// 15b Activity
addedDate = today.add(1, 'month');
formattedDate = addedDate.format('M, D');

console.log(formattedDate);

// 15c Activity
addedDate = today.subtract(1, 'month');
formattedDate = addedDate.format('M, D');

console.log(formattedDate);

// 15d Activity
addedDate = today;
formattedDate = addedDate.format('dddd');

console.log(formattedDate);

// 15e Activity

function isWeekend(date) {
  return date.format('dddd') === 'Saturday' || date.format('dddd') === 'Sunday';
}

console.log(isWeekend(today));

addedDate = today.add(5, 'day');
console.log(isWeekend(addedDate));

addedDate = today.add(1, 'month');
console.log(isWeekend(addedDate));

addedDate = today.subtract(1, 'month');
console.log(isWeekend(addedDate));

// 15f - g Activity
// We run isWekeend function on a different name(exportIsWeekend) 
// because we exported it as a default function and we can name it 
// whatever we want when we import it.
console.log(exportIsWeekend(today));

addedDate = today.add(5, 'day');
console.log(exportIsWeekend(addedDate));

addedDate = today.add(1, 'month');
console.log(exportIsWeekend(addedDate));

addedDate = today.subtract(1, 'month');
console.log(exportIsWeekend(addedDate));