import { orders } from "../data/orders.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { formatCurrency } from "./utils/money.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import { cart } from "../data/cart-class.js";

async function renderOrderList() {
    await loadProductsFetch();

    let orderHTML = '';

    if (orders.length === 0) {
        orderHTML = `
            <div class="empty-order-message-container">
                <span class="empty-order-message">You don't have order yet.</span>
                <span class="empty-order-message">Go to amazon page</span>
                <a href="index.html" class="empty-order-link">View Products</a>
            </div>
        `;
    }

    orders.forEach((orderList) => {
        // We made the error mistake so when the error message.
        // the error message skip.
        if (!orderList.id) return;

        const orderId = orderList.id;

        // Taking and Converting the time when user order the product
        const orderTime = dayjs(orderList.orderTime);
        const formattedOrderDate = orderTime.format('MMMM D');

        orderHTML += `
            <article class="order-container" data-order-id="order-container-${orderId}">
                <header class="order-headers">
                    <section class="left-header-side">
                        <div class="order-date">
                            <span class="order-header-label">Order Placed:</span>
                            <span class="order-header-text">${formattedOrderDate}</span>
                        </div>
                        <div class="order-total-cost">
                            <span class="order-header-label">Total:</span>
                            <span class="order-header-text">$${formatCurrency(orderList.totalCostCents)}</span>
                        </div>
                    </section>
                    <section class="right-header-side">
                        <div class="order-id">
                            <span class="order-header-label">Order ID:</span>
                            <span class="order-header-text">${orderId}</span>
                        </div>
                    </section>
                </header>

                <div class="order-details-grid">
                    ${renderProductsOrderList(orderList)}
                </div>
            </article>
        `;
    });

    document.querySelector('.js-orders-grid').innerHTML = orderHTML;

    // We can use DOM after we render the order details.
    document.querySelectorAll(`.js-buy-again-button`).forEach((button) => {
        button.addEventListener('click', () => {
            const productId = button.dataset.productId;
            cart.addToCart(productId);
            updateCartQuantity();
        });
    });
    
    document.querySelectorAll(`.js-track-package-button`).forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;
            console.log(`clicked: ${productId}`);
        });
    });
}

// Load the products
renderOrderList();

function renderProductsOrderList(orderList) {
    let orderedProductsHTML = '';

    orderList.products.forEach((productDetails) => {
        const productId = productDetails.productId;
        const matchingProduct = getProduct(productId);

        // Get the Estimated Date
        const orderTime = dayjs(productDetails.estimatedDeliveryTime);
        const formattedOrderDate = orderTime.format('MMMM D');

        orderedProductsHTML +=  `
            <img src="${matchingProduct.img}" alt="item-image" class="item-image">
            <div class="product-details">
                <span class="product-name">${matchingProduct.name}</span>
                <span class="product-delivery-date">Delivered on: ${formattedOrderDate}</span>
                <span class="product-quantity">Quantity: ${productDetails.quantity}</span>
                <button class="buy-again-button js-buy-again-button"
                data-product-id="${matchingProduct.productId}">
                    <img src="images/Function-Img/buy-again.png" alt="buy-again-button" class="buy-again-logo">
                    <span class="buy-again-message buy-again-text">Buy it again</span>
                    <span class="buy-again-success
                    buy-again-text">✓ Added</span>
                </button>
            </div>
            <div class="product-action">
                <a href="tracking.html?orderId=${orderList.id}&productId=${productId}">
                    <button class="track-package-button js-track-package-button"
                    data-product-id="${matchingProduct.productId}">
                        Track package
                    </button>
                </a>
            </div>
        `;
    });

    return orderedProductsHTML;
}

// this function have duplication from amazon.js
// i dont know why that gives an error when i export that
// and use that function so i copy that code and put it here and now 
// everything is works
function updateCartQuantity() {
    const cartQuantity = cart.calculateCartQuantity();

    document.querySelector('.js-cart-quantity')
        .innerHTML = cartQuantity;

    document.querySelector('.js-cart-quantity-mobile')
        .innerHTML = cartQuantity;
}
