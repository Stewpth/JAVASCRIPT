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

export function calculateDeliveryDate(deliveryOption) {
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDate, 'days');
    const formattedDeliveryDate = deliveryDate.format('dddd, MMMM D');

    return formattedDeliveryDate;
}