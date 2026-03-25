import { updateSummaryOrder } from "./checkout/orderSummary.js";
import { updateSummaryPayment } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeaders.js";
import {cart} from "./../data/cart-class.js";
import { loadProducts } from "../data/products.js";
// import "../data/backend-practice.js"

loadProducts(() => {
    updateSummaryOrder(cart);
    updateSummaryPayment();
    renderCheckoutHeader();
});
