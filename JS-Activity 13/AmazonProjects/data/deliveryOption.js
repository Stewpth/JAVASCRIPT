import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

export const deliveryOptions = [
    {
        id: '1',
        deliveryDate: 7,
        deliveryPriceCents: 0,
    },
    {
        id: '2',
        deliveryDate: 3,
        deliveryPriceCents: 499,
    },
    {
        id: '3',
        deliveryDate: 1,
        deliveryPriceCents: 999,
    },
];

export function getDeliveryOption(deliveryOptionId) {
    let deliveryOption;
    deliveryOptions.forEach((option) => {
        if (option.id === deliveryOptionId) {
            deliveryOption = option;
        }
    });
    return deliveryOption || deliveryOptions[0];
}

// We get the remaining days from the delivery option, 
// and we calculate the delivery date by adding the 
// remaining days to the current date, and we skip the weekends.
export function calculateDeliveryDate(deliveryOption) {
    let remainingDays = deliveryOption.deliveryDays;
    let deliveryDate = dayjs();

    while (remainingDays > 0) {
        deliveryDate = deliveryDate.add(1, 'day');

        if (!isWeekend(deliveryDate)) {
            remainingDays--;
            // This is a shortcut for:
            // remainingDays = remainingDays - 1;
        }
    }

    const dateString = deliveryDate.format('dddd, MMMM D');

    return dateString;  
}

function isWeekend(date) {
  const dayOfWeek = date.format('dddd');
  return dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday';
}


