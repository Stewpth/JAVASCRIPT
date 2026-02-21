import { calculateCartQuantity } from "../../data/cart.js";

export function renderCheckoutHeader() {
    const cartQuantity = calculateCartQuantity();

    const headerHTML = `
        <section class="left-section">
            <a href="amazon.html" class="homepage-logo">
                <img src="images/header-image/amazon-logo.png" alt="homepage-logo" class="homepage-logo-pic">
            </a>
        </section>
        <section class="middle-section">
            <span class="checkout-text">
                Checkout 
                    (<a href="amazon.html"class="item-quantity js-item-quantity">${cartQuantity} items</a>)
            </span>
        </section>
        <section class="right-section">
            <img src="images/header-image/checkout-lock-icon.png" alt="checkout-lock-icon" class="checkout-lock-icon">
        </section>
    `;

    document.querySelector('.js-checkout-headers').innerHTML = headerHTML;
}