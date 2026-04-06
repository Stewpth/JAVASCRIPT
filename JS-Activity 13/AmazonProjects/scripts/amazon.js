import { cart } from '../data/cart-class.js';
import { products, loadProducts, loadProductsFetch } from '../data/products.js';
import { normalize } from './utils/search.js';

//loadProducts(renderProductsGrid);
loadPage();

async function loadPage() {
    await loadProductsFetch();

    const url = new URL(window.location.href);
    const searchInput = url.searchParams.get('search');
    const searchedProduct = returnSearchResult();

    if (searchInput) {
        renderProductsGrid(searchedProduct);
    } else {
        renderProductsGrid(products);
    }

    updateCartQuantity();
}

document.querySelector('.js-search-btn').addEventListener('click', () => {
    const searchInput = document.querySelector('.js-search-bar');
    const inputValue = searchInput.value;
    const searchResult = inputValue.split(' ').join('+');
    
    window.location.href = `amazon.html?search=${searchResult}`;
});

// This function is used to interact with shorting products
function shortProduct(loadedProducts) {
    const shortDropDown = document.querySelector('.js-short-menu-dropdown');

    // Short the products by alphabet from the lowest character to highest character (A- Z)
    document.querySelector('.short-by-alphabet').addEventListener('click', () => {
        loadedProducts.sort((a, b) => a.name.toLowerCase().localeCompare(b.name));
        renderProductsGrid(loadedProducts);
        shortDropDown.classList.remove('open');
    });

    // Short the products from the highest quality to lowest quality
    document.querySelector('.short-by-rate').addEventListener('click', () => {
        loadedProducts.sort((a, b) => b.ratings.stars - a.ratings.stars);
        renderProductsGrid(loadedProducts);
        shortDropDown.classList.remove('open');
    });

    // Short the products from the highest cost to lowest cost
    document.querySelector('.short-by-price').addEventListener('click', () => {
        loadedProducts.sort((a, b) => b.priceCents - a.priceCents);
        renderProductsGrid(loadedProducts);
        shortDropDown.classList.remove('open');
    });
}

function renderProductsGrid(loadedProducts) {
    let productHTML = '';

    shortProduct(loadedProducts);

    // Generates the HTML for products and display it on the webpage. 
    loadedProducts.forEach((product) => {
        productHTML += 
            `<div class="product-box">
                    <div class="product-img-box">
                        <img class="product-img" src="${product.getProductImg()}">
                    </div>
                    <div class="product-name">
                        ${product.name}
                    </div>
                    <div class="product-ratings">
                        <img src="${product.getProductRatings()}" class="product-rating-star">
                        <p class="product-rating-count">${product.getProductRatingCounts()}</p>
                    </div>
                    <div class="product-price">
                        ${product.getPrice()}
                    </div>
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

                    <div class="extra-info-empty">
                        ${product.extraInfoHTML()}
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

    document.querySelector('.js-products-grid').innerHTML = productHTML;

    // We put this outside of the function to avoid duplicating variables
    const msgAddedId = {};

    document.querySelectorAll('.js-add-to-cart-btn').forEach((button) => {
        button.addEventListener('click', () => {
            const { productId } = button.dataset; 
            cart.addToCart(productId);
            updateCartQuantity();
            displayAddedMsg(msgAddedId, productId);
        });
    });
}

function displayAddedMsg(msgAddedId, productId) {
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
    const cartQuantity = cart.calculateCartQuantity();

    document.querySelector('.js-cart-quantity')
        .innerHTML = cartQuantity;

    document.querySelector('.js-cart-quantity-mobile')
        .innerHTML = cartQuantity;
}

function returnSearchResult() {
    const url = new URL(window.location.href);
    const searchResult = normalize(url.searchParams.get('search'));

    let result = [];

    products.forEach((product) => {
        product.keywords.forEach((keyword) => {
            if (keyword.toLowerCase().includes(searchResult)) {
                 result.push(product);
            }
        });
    });

    return result;
}