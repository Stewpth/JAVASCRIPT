import { updateSummaryOrder } from "./checkout/orderSummary.js";
import { updateSummaryPayment } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeaders.js";
import { cart, loadCartFetch } from "./../data/cart-class.js";
import { loadProducts } from "../data/products.js";
// import "../data/backend-practice.js"


new Promise((resolve) => {
    loadProducts(() => {
        resolve();
    });
}).then(() => {
    return new Promise(() => {
        resolve();
    });
}).then(() => {
    updateSummaryOrder(cart);
    updateSummaryPayment();
    renderCheckoutHeader();
});

/*
loadProducts(() => {
    loadCart(() => {
        updateSummaryOrder(cart);
        updateSummaryPayment();
        renderCheckoutHeader();
    });
});
*/