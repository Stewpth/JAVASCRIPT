import { cart } from "../../data/cart-class.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOption.js";
import { formatCurrency } from "../utils/money.js";
import { postOrder } from "../orders.js";

export function updateSummaryPayment(cartName) {
    let cartQuantity = 0;
    let productPriceCents = 0;
    let shippingCostCents = 0;

    cartName.cartItems.forEach((cartItem) => {
        const product = getProduct(cartItem.productId);
        productPriceCents += product.priceCents * cartItem.quantity; // Calculate total product price based on quantity

        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        shippingCostCents += deliveryOption.deliveryPriceCents; // Calculate total shipping cost based on delivery option

        cartQuantity += cartItem.quantity; // Calculate total quantity of items in the cart
    });

    const totalItems = cartQuantity;
    const totalBeforeTaxCents = productPriceCents + shippingCostCents;
    const taxCents = totalBeforeTaxCents * 0.1; // Assuming a tax rate of 10%
    const totalCents = totalBeforeTaxCents + taxCents;


    /* In the Javascript course, he generate all the codes from payment summary in the order summary, but I think it is better to get all the DOM elements related to
    payment summary in this file, so I can update the payment summary whenever there is a change in the order summary, such as quantity change, delivery option change, 
    or item deletion.*/

    let paymentSummaryHTML =`
        <div class="summary-order js-summary-order">
            <h3 class="order-summary">Order Summary</h3>
            <div class="payment-summary-row">
                <div class="item-summary">Items (${totalItems}):</div>
                <div class="payment-summary-money js-product-price">$${formatCurrency(productPriceCents)}</div>
            </div>
            <div class="payment-summary-row">
                <span class="shipping-summary">Shipping & handling:</span>
                <div class="payment-summary-money js-shipping-cost">$${formatCurrency(shippingCostCents)}</div>
            </div>
            <div class="payment-summary-row subtotal-row">
                <span class="total-no-tax-summary subtotal-left-row">Total before tax:</span>
                <div class="payment-summary-money subtotal-right-row js-total-before-tax">$${formatCurrency(totalBeforeTaxCents)}</div>
            </div>
            <div class="payment-summary-row">
                <span>Estimated tax (10%):</span>
                <div class="payment-summary-money js-tax">$${formatCurrency(taxCents)}</div>
            </div>
        </div>

        <div class="total-summary-order">
            <h3 class="total-cost">Order total:</h3>
            <h3 class="total-cost js-total">$${formatCurrency(totalCents)}</h3>
        </div>

        <div class="place-order-box">
            <button class="place-order-btn button-primary js-place-order-btn">
                Place your order
            </button>
        </div>
    `;

    document.querySelector('.js-payment-info').innerHTML = paymentSummaryHTML;

    document.querySelector('.js-place-order-btn').addEventListener('click', () => {
        postOrder(cart);
    });
}