export function renderCheckoutHeader(cartName) {
    const cartQuantity = cartName.calculateCartQuantity();

    const headerHTML = `
        <section class="left-section">
            <a href="index.html" class="homepage-logo">
                <img src="images/header-image/amazon-logo.png" alt="homepage-logo" class="homepage-logo-pic">
                <img src="images/header-image/amazon-mobile-logo.png" alt="homepage-logo-mobile"
                    class="homepage-logo-mobile-pic">
            </a>
        </section>
        <section class="middle-section">
            <span class="checkout-text">
                Checkout 
                    (<a href="index.html" class="item-quantity js-item-quantity">${cartQuantity} items</a>)
            </span>
        </section>
        <section class="right-section">
            <img src="images/header-image/checkout-lock-icon.png" alt="checkout-lock-icon" class="checkout-lock-icon">
        </section>
    `;

    document.querySelector('.js-checkout-headers').innerHTML = headerHTML;
}