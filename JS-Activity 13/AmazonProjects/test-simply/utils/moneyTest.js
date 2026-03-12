import { formatCurrency } from "../../scripts/utils/money.js";

console.log('Test suite: formatCurrency');

console.log('convert cent into dollars')
if (formatCurrency(2095) === '20.95') {
    console.log('passed');
} else {
    console.log('failed');
}

console.log('works with zero')
if (formatCurrency(0) === '0.00') {
    console.log('passed');
} else {
    console.log('failed');
}

console.log('rounds to the nearest cent')
if (formatCurrency(2000.5) === '20.01') {
    console.log('passed');
} else {
    console.log('failed');
}

console.log('rounds to 0 if the cents near to 0');

if (formatCurrency(2000.4) === '20.00') {
    console.log('passed');
} else {
    console.log('failed');
}

console.log('works with negative numbers');
if (formatCurrency(-2090) === '-20.90') {
    console.log('passed');
} else {
    console.log('failed');
}