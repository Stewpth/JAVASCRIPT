import { cart, removeFromCart, calculateCartQuantity, updateQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

updateCartQuantity(); // Call this function to update when loading the page
let cartSummaryHTML = '';

cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    let matchingProduct;

    products.forEach((product) => {
        if (product.productId === productId) {
            matchingProduct = product;
        }
    });

    cartSummaryHTML += `
        <div class="cart-item-box js-cart-item-box-${matchingProduct.productId}">
            <h2 class="cart-item-delivery-text">
                Delivery date: <span class="delivery-date">Wednesday, February 11</span>
            </h2>

            <div class="item-details-grid">
                <!-- Item image -->
                <img class="product-image" src="${matchingProduct.img}"
                    alt="product-image">

                <!-- Item Details -->
                <div class="item-details">
                    <p class="product-name">${matchingProduct.name}</p>
                    <p class="product-price">$${formatCurrency(matchingProduct.priceCents)}</p>
                    <div class="product-quantity-container">
                        <div class="quantity-text">Quantity: <span class="quantity-value js-quantity-value-${matchingProduct.productId}">${cartItem.quantity}</span></div>
                        <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id="${matchingProduct.productId}">Update</span>
                        <input class="quantity-input js-quantity-input-${matchingProduct.productId}">
                        <span class="save-quantity-link link-primary js-save-quantity-link" data-product-id="${matchingProduct.productId}">Save</span>
                        <span class="delete-quantity-link link-primary js-delete-quantity-link" data-product-id="${matchingProduct.productId}">Delete</span>
                    </div>
                </div>

                <!-- Cart Delivery Option -->
                <div class="delivery-option">
                    <p class="delivery-option-title">Choose a delivery option:</p>

                    <div class="delivery-option-grid">
                        <input type="radio" name="delivery-option-${matchingProduct.productId}" class="delivery-option-input">
                        <div class="delivery-option-info">
                            <div class="delivery-option-date">Friday, February 20</div>
                            <div class="delivery-option-price">FREE Shipping</div>
                        </div>
                    </div>

                    <div class="delivery-option-grid">
                        <input type="radio" name="delivery-option-${matchingProduct.productId}" class="delivery-option-input">
                        <div class="delivery-option-info">
                            <div class="delivery-option-date">Monday, February 16</div>
                            <div class="delivery-option-price">$4.99 - Shipping</div>
                        </div>
                    </div>

                    <div class="delivery-option-grid">
                        <input type="radio" name="delivery-option-${matchingProduct.productId}" class="delivery-option-input">
                        <div class="delivery-option-info">
                            <div class="delivery-option-date">Thursday, February 12</div>
                            <div class="delivery-option-price">$9.99 - Shipping</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
});

document.querySelector('.js-cart-summary').innerHTML = cartSummaryHTML;

document.querySelectorAll('.js-delete-quantity-link')
    .forEach((link) => {
        link.addEventListener('click', () => {
            const { productId } = link.dataset;
            removeFromCart(productId);

            const productBox = document.querySelector(`.js-cart-item-box-${productId}`);
            productBox.remove();
            updateCartQuantity();
        });
    });

document.querySelectorAll('.js-update-quantity-link')
    .forEach((link) => {
        link.addEventListener('click', () => {
            const { productId } = link.dataset;
            const container = document.querySelector(`.js-cart-item-box-${productId}`);

            container.classList.add('is-editing-quantity');
        });
    });

document.querySelectorAll('.js-save-quantity-link')
    .forEach((link) => {
        const { productId } = link.dataset;
        const itemQuantityInput = document.querySelector(`.js-quantity-input-${productId}`);
        const itemQuantityValue = document.querySelector(`.js-quantity-value-${productId}`);
        const container = document.querySelector(`.js-cart-item-box-${productId}`);

        link.addEventListener('click', () => {
            container.classList.remove('is-editing-quantity');
            const newQuantity = Number(itemQuantityInput.value);
            updateQuantity(productId, newQuantity);
            itemQuantityValue.innerHTML = newQuantity;
            updateCartQuantity();
        });
    });

// We have this also in amazon.js and its okay because we avoid naming conflicts
function updateCartQuantity() {
    const cartQuantity = calculateCartQuantity();

    document.querySelector('.js-item-quantity').innerHTML = `${cartQuantity} items`;
}