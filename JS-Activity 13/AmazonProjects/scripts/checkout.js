import { cart, removeFromCart, calculateCartQuantity, updateQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { deliveryOptions } from "../data/deliveryOption.js";

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

    const deliveryOptionId = cartItem.deliveryOptionId;
    let deliveryOption;
    deliveryOptions.forEach((option) => {
        if (option.id === deliveryOptionId) {
            deliveryOption = option;
        }
    });
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDate, 'days');
    const formattedDeliveryDate = deliveryDate.format('dddd, MMMM D');

    cartSummaryHTML += `
        <div class="cart-item-box js-cart-item-box-${matchingProduct.productId}">
            <h2 class="cart-item-delivery-text">
                Delivery date: <span class="delivery-date">${formattedDeliveryDate}</span>
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
                    ${updateDeliveryOption(matchingProduct, cartItem)}
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
            handleUpdateQuantity(productId, itemQuantityInput, itemQuantityValue, container);
        });

        itemQuantityInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                handleUpdateQuantity(productId, itemQuantityInput, itemQuantityValue, container);
            }
        });
    });

function updateDeliveryOption(matchingProduct, cartItem) {
    let deliveryOptionsHTML = '';
    deliveryOptions.forEach((option) => {
        const today = dayjs();
        const deliveryDate = today.add(option.deliveryDate, 'days');
        const formattedDeliveryDate = deliveryDate.format('dddd, MMMM D');
        const deliveryPrice = option.deliveryPriceCents === 0 ? 'FREE Shipping' : `$${formatCurrency(option.deliveryPriceCents)} - Shipping`;
        const isChecked = option.id === cartItem.deliveryOptionId ? 'checked' : ''; // Default to the selected option being checked
        deliveryOptionsHTML += `
            <div class="delivery-option-grid">
                <input type="radio" ${isChecked} name="delivery-option-${matchingProduct.productId}" class="delivery-option-input">
                <div class="delivery-option-info">
                    <div class="delivery-option-date">${formattedDeliveryDate}</div>
                    <div class="delivery-option-price">${deliveryPrice}</div>
                </div>
            </div>
        `
    });

    return deliveryOptionsHTML;
}

/** --------------------------- FUNCTIONS --------------------------------**/

// We have this also in amazon.js and its okay because we avoid naming conflicts
function updateCartQuantity() {
    const cartQuantity = calculateCartQuantity();

    document.querySelector('.js-item-quantity').innerHTML = `${cartQuantity} items`;
}

// for update link purposes....
function handleUpdateQuantity(productId, itemQuantityInput, itemQuantityValue, container) {
    const newQuantity = Number(itemQuantityInput.value);

    if (newQuantity < 0 || newQuantity >= 1000) {
        alert('Invalid input: The quantity must be atleast 0 and less than 1000');
        itemQuantityInput.value = '';
        return;
    }

    itemQuantityValue.innerHTML = newQuantity;
    updateQuantity(productId, newQuantity);

    updateCartQuantity();
    container.classList.remove('is-editing-quantity');
    itemQuantityInput.value = '';
}