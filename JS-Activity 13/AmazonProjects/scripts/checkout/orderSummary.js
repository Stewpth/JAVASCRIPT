import { cart, removeFromCart, updateQuantity, updateDeliveryOption } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { deliveryOptions, getDeliveryOption, calculateDeliveryDate } from "../../data/deliveryOption.js";
import { updateSummaryPayment } from "./paymentSummary.js";
import { renderCheckoutHeader } from "./checkoutHeaders.js";

export function updateSummaryOrder() {
    
    let cartSummaryHTML = '';

    cart.forEach((cartItem) => {
        const productId = cartItem.productId;

        let matchingProduct = getProduct(productId);
        const deliveryOptionId = cartItem.deliveryOptionId;
        const deliveryOption = getDeliveryOption(deliveryOptionId);

        const formattedDeliveryDate = calculateDeliveryDate(deliveryOption);

        cartSummaryHTML += `
            <div class="cart-item-box js-cart-item-box js-cart-item-box-${matchingProduct.productId}">
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
                            <div class="quantity-text js-quantity-text-${matchingProduct.productId}">
                                Quantity: <span class="quantity-value js-quantity-value-${matchingProduct.productId}">${cartItem.quantity}</span>
                            </div>
                            <span class="
                                update-quantity-link 
                                link-primary 
                                js-update-quantity-link
                            " data-product-id="${matchingProduct.productId}">Update</span>
                            <input class="quantity-input js-quantity-input-${matchingProduct.productId}">
                            <span class="
                                save-quantity-link 
                                link-primary 
                                js-save-quantity-link" 
                            data-product-id="${matchingProduct.productId}">Save</span>
                            <span class="
                                delete-quantity-link 
                                link-primary 
                                js-delete-quantity-link
                                js-delete-quantity-link-${matchingProduct.productId}
                            " data-product-id="${matchingProduct.productId}">Delete</span>
                        </div>
                    </div>

                    <!-- Cart Delivery Option -->
                    <div class="delivery-option">
                        <p class="delivery-option-title">Choose a delivery option:</p> 
                        ${generateDeliveryOption(matchingProduct, cartItem)}
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
                renderCheckoutHeader(); // Update the header to reflect the new cart quantity after deletion
                updateSummaryPayment(); // Update the payment summary to reflect the removed item
                updateSummaryOrder(); // Re-render the order summary to reflect the removed item
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
                updateSummaryPayment(); // Update the payment summary to reflect the new quantity
                renderCheckoutHeader(); // Update the header to reflect the new cart quantity after quantity update
                updateSummaryOrder(); // Re-render the order summary to reflect the new quantity
            });

            itemQuantityInput.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    handleUpdateQuantity(productId, itemQuantityInput, itemQuantityValue, container);
                    updateSummaryPayment();
                    renderCheckoutHeader();
                    updateSummaryOrder();
                }
            });
        });

    document.querySelectorAll('.js-delivery-option')
        .forEach((option) => {
            option.addEventListener('click', () => {
                const { productId, deliveryOptionId } = option.dataset;
                updateDeliveryOption(productId, deliveryOptionId);
                updateSummaryOrder();
                updateSummaryPayment();
                renderCheckoutHeader();
            });
        });
}

//updateSummaryOrder(); // Call the function to render the cart summary on page load

/** --------------------------- FUNCTIONS --------------------------------**/

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

    container.classList.remove('is-editing-quantity');
    itemQuantityInput.value = '';
}

function generateDeliveryOption(matchingProduct, cartItem) {
    let deliveryOptionsHTML = '';

    deliveryOptions.forEach((deliveryOption) => {
        const formattedDeliveryDate = calculateDeliveryDate(deliveryOption);

        const deliveryPrice = deliveryOption.deliveryPriceCents === 0 ?
            'FREE Shipping' :
            `$${formatCurrency(deliveryOption.deliveryPriceCents)} - Shipping`;

        const isChecked = deliveryOption.id === cartItem.deliveryOptionId ? 'checked' : ''; // Default to the selected option being checked
        
        deliveryOptionsHTML += `
            <div class="delivery-option-grid js-delivery-option" 
                data-product-id="${matchingProduct.productId}" 
                data-delivery-option-id="${deliveryOption.id}">
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