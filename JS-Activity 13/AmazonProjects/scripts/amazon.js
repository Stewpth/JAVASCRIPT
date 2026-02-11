import { cart, addToCart} from '../data/cart.js';
import { products } from '../data/products.js';

let productHTML = '';

// Generates the HTML for products and display it on the webpage. 
products.forEach((product) => {
    productHTML += 
        `<div class="product-box">
                <div class="product-img-box">
                    <img class="product-img" src="${product.img}">
                </div>
                <div class="product-name">
                    ${product.name}
                </div>
                <div class="product-ratings">
                    <img src="images/ratings/rating-${product.ratings.stars * 10}.png" class="product-rating-star">
                    <p class="product-rating-count">${product.ratings.count}</p>
                </div>
                <div class="product-price">$${(product.priceCents / 100).toFixed(2)}</div>
                <div class="product-quantity-container">
                    <select class="quantity-selector js-quantity-selector-${product.productId}">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                </div>
                <div class="added-to-cart-msg js-added-to-cart-msg-id-${product.productId}">
                    <img src="images/Function-img/checkmark.png" class="added-icon">
                    Added
                </div>
                <div class="add-to-cart-box">
                    <button class="add-cart-btn js-add-to-cart-btn"
                    data-product-id="${product.productId}">
                        Add to Cart
                    </button>
                </div>
            </div>`
});

function displayAddedMsg(msgAddedId) {
    const productIndex = document.querySelector(`.js-added-to-cart-msg-id-${productId}`);
    // Display the Added Message when the button is active.
    productIndex.classList.add('toggleMsg');
        
    // to safely clear the timer for setTimeout after reclick the button
    if (msgAddedId) {
        clearTimeout(msgAddedId);
    }

    msgAddedId = setTimeout(() => {
        document.querySelector(`.js-added-to-cart-msg-id-${productId}`).classList.remove('toggleMsg');
    }, 2000);
}

function updateCartQuantity() {
    let cartQuantity = 0;

    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
    });

    document.querySelector('.js-cart-quantity')
        .innerHTML = cartQuantity;

    document.querySelector('.js-cart-quantity-mobile')
        .innerHTML = cartQuantity;
}

document.querySelector('.js-products-grid')
    .innerHTML = productHTML;


document.querySelectorAll('.js-add-to-cart-btn')
    .forEach((button) => {
        // We put this outside of the function to avoid duplicating variables
        let msgAddedId;
        button.addEventListener('click', () => {
            const { productId } = button.dataset;
            addToCart(productId);
            updateCartQuantity();
            displayAddedMsg(msgAddedId);
        });
    });

    
