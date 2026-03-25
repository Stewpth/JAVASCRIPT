import { updateSummaryOrder } from "./checkout/orderSummary.js";
import { updateSummaryPayment } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeaders.js";
import {cart} from "./../data/cart-class.js"
import "../data/backend-practice.js"

updateSummaryOrder(cart);
updateSummaryPayment();
renderCheckoutHeader();