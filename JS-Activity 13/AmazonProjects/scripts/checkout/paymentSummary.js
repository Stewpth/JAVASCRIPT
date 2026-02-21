import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOption.js";
import { formatCurrency } from "../utils/money.js";

export function updateSummaryPayment() {
    let productPriceCents = 0;
    let shippingCostCents = 0;

    cart.forEach((cartItem) => {
        const product = getProduct(cartItem.productId);
        productPriceCents += product.priceCents * cartItem.quantity; // Calculate total product price based on quantity

        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        shippingCostCents += deliveryOption.deliveryPriceCents; // Calculate total shipping cost based on delivery option
    });

    const totalBeforeTaxCents = productPriceCents + shippingCostCents;
    const taxCents = totalBeforeTaxCents * 0.1; // Assuming a tax rate of 10%
    const totalCents = totalBeforeTaxCents + taxCents;

    /* In the Javascript course, he generate all the codes from payment summary in the order summary, but I think it is better to get all the DOM elements related to
    payment summary in this file, so I can update the payment summary whenever there is a change in the order summary, such as quantity change, delivery option change, 
    or item deletion.*/

    document.querySelector('.js-product-price').innerHTML = `$${formatCurrency(productPriceCents)}`;
    document.querySelector('.js-shipping-cost').innerHTML = `$${formatCurrency(shippingCostCents)}`;
    document.querySelector('.js-total-before-tax').innerHTML = `$${formatCurrency(totalBeforeTaxCents)}`;
    document.querySelector('.js-tax').innerHTML = `$${formatCurrency(taxCents)}`;
    document.querySelector('.js-total').innerHTML = `$${formatCurrency(totalCents)}`;
}