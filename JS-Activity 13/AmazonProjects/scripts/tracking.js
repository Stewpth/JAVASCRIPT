import { getProduct, loadProductsFetch } from "../data/products.js";
import { orders, getOrder } from "../data/orders.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

const url = new URL(window.location.href);
const orderId = url.searchParams.get('orderId');
const productId = url.searchParams.get('productId');

const today = dayjs();

async function renderTrackProduct() {
    await loadProductsFetch();

    let productProgressHTML = '';

    orders.forEach((orderList) => {
        const matchingOrder = getOrder(orderList, orderId, productId);

        // We get all the products from orderList but we need the specific product.
        // so we will skip the not matched product.
        if (!matchingOrder) return;

        // Get the Estimated Date
        const deliveryTime = dayjs(matchingOrder.estimatedDeliveryTime);
        const formatEstimatedDeliveryDate = deliveryTime.format('dddd, MMMM D');

        // Get the matched product using productId
        const matchingProduct = getProduct(matchingOrder.productId);

        //const progressTime = ((deliveryTime - today) / (deliveryTime - matchingOrder.orderTime)) * 100;
        const progressTime = Math.min(100, Math.max(0,
            (today.diff(matchingOrder.orderTime) /
            deliveryTime.diff(matchingOrder.orderTime)) * 100
        ));

        productProgressHTML += `
            <span class="delivery-date">Delivered on ${formatEstimatedDeliveryDate}</span>
            <span class="product-name">${matchingProduct.name}</span>
            <span class="product-quantity">Quantity: ${matchingOrder.quantity}</span>
            <img src="${matchingProduct.img}" alt="product-image" class="product-image">
            <div class="progress-label-container">
                <span class="progress-label">Preparing</span>
                <span class="progress-label">Shipped</span>
                <span class="progress-label progress-status">Delivered</span>
            </div>
            <div class="progress-bar-container">
                <div class="progress-bar" style="width: 50%"></div>
            </div>
        `;

        console.log(today);
        console.log(progressTime);
    });
    
    document.querySelector('.js-tracking-products').innerHTML = productProgressHTML;
}

renderTrackProduct();

