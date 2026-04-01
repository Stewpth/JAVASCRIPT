import { orders } from "../data/orders.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { formatCurrency } from "./utils/money.js";
import { getProduct, loadProductsFetch } from "../data/products.js";

async function renderOrderList() {
    await loadProductsFetch();

    let orderHTML = '';

    orders.forEach((orderList) => {
        // We made the error mistake so when the error message.
        // the error message skip.
        if (!orderList.id) return;

        const orderId = orderList.id;

        // Taking and Converting the time when user order the product
        const orderTime = dayjs(orderList.orderTime);
        const formattedOrderDate = orderTime.format('MMMM D');

        orderHTML += `
            <article class="order-container">
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
        `
    });

    document.querySelector('.js-orders-grid').innerHTML = orderHTML;
}

// Load the products
renderOrderList();

function renderProductsOrderList(orderList) {
    let orderedProductsHTML = '';

    orderList.products.forEach((productDetails) => {
        const productId = productDetails.productId;
        const orderTime = dayjs(productDetails.estimatedDeliveryTime);
        const formattedOrderDate = orderTime.format('MMMM D');
        const matchingProduct = getProduct(productId);

        orderedProductsHTML +=  `
            <img src="${matchingProduct.img}" alt="item-image" class="item-image">
            <div class="product-details">
                <span class="product-name">${matchingProduct.name}</span>
                <span class="product-delivery-date">Delivered on: ${formattedOrderDate}</span>
                <span class="product-quantity">Quantity: ${productDetails.quantity}</span>
                <button class="buy-again-button">
                    <img src="images/Function-Img/buy-again.png" alt="buy-again-button" class="buy-again-logo">
                    <span class="buy-again-message buy-again-text">Buy it again</span>
                    <span class="buy-again-success
                    buy-again-text">✓ Added</span>
                </button>
            </div>
            <div class="product-action">
                <button class="track-package-button">Track package</button>
            </div>
        `;

        console.log(matchingProduct);
        console.log(productDetails);
        console.log(dayjs(productDetails.estimatedDeliveryTime));
    });

    
    return orderedProductsHTML;
}
