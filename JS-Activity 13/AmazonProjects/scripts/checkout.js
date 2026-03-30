import { updateSummaryOrder } from "./checkout/orderSummary.js";
import { updateSummaryPayment } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeaders.js";
import { cart, loadCartFetch, loadCart } from "./../data/cart-class.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
// import "../data/backend-practice.js"

// When you fetch the data from the backend. the function needs to return the fetched value because
// fetch creates a promise after fetched the data

// When you use the Promise. you dont need to make a new Promise on fetched value.
async function loadPage() {
    await Promise.all([
        loadProductsFetch(),
        loadCartFetch()
    ]);

    updateSummaryOrder(cart);
    updateSummaryPayment();
    renderCheckoutHeader();
}

loadPage();


/*
new Promise((resolve) => {
    loadProducts(() => {
        resolve();
    });
}).then(() => {
    return new Promise((resolve) => {
        loadCartFetch(() => {
            resolve();
        });
    });
}).then(() => {
    updateSummaryOrder(cart);
    updateSummaryPayment();
    renderCheckoutHeader();
});
*/

/*
loadProducts(() => {
    loadCartFetch(() => {
        updateSummaryOrder(cart);
        updateSummaryPayment();
        renderCheckoutHeader();
    });
});
*/
