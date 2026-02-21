import { updateSummaryOrder } from "./checkout/orderSummary.js";
import { updateSummaryPayment } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeaders.js";

updateSummaryOrder();
updateSummaryPayment();
renderCheckoutHeader();