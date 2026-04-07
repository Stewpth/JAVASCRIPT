import { updateSummaryOrder } from "../../scripts/checkout/orderSummary.js";
import { Cart } from "../../data/cart-class.js";
import { loadProducts } from "../../data/products.js";

const cartTestOrderSummary = new Cart('cart-order-summary-test');

describe('test suite: updateSummaryOrder', () => {
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

  const productId1Name = 'Black and Gray Athletic Cotton Socks - 6 Pairs';
  const productId2Name = 'Intermediate Size Basketball';

  beforeAll((done) => {
    loadProducts(() => {
      done();
    });
  });

  beforeEach(() => {
    document.querySelector('.js-test-container').innerHTML = `
      <div class="js-cart-summary"></div>
      <div class="js-payment-info"></div>
      <div class="js-checkout-headers"></div>
    `;

    localStorage.setItem('cart-order-summary-test', JSON.stringify([
      {
        productId: productId1,
        quantity: 2,
        deliveryOptionId: '1'
      },
      {
        productId: productId2,
        quantity: 1,
        deliveryOptionId: '2'
      }
    ]));

    cartTestOrderSummary.loadCartFromStorage();

    updateSummaryOrder(cartTestOrderSummary);
  });

  it('displays the cart', () => {
    expect(document.querySelectorAll('.js-cart-item-box').length).toEqual(2);
    expect(document.querySelector(`.js-product-name-${productId1}`).innerText).toContain(productId1Name);
    expect(document.querySelector(`.js-product-name-${productId2}`).innerText).toContain(productId2Name);

    expect(document.querySelector(`.js-product-price-${productId1}`).innerText).toContain('$');
    expect(document.querySelector(`.js-product-price-${productId2}`).innerText).toContain('$');

    expect(document.querySelector(`.js-quantity-text-${productId1}`).innerText).toContain('Quantity: 2');
    expect(document.querySelector(`.js-quantity-text-${productId2}`).innerText).toContain('Quantity: 1');
  });

  it('removes a product', () => {
    document.querySelector(`.js-delete-quantity-link-${productId1}`).click();

    expect(document.querySelectorAll('.js-cart-item-box').length).toEqual(1);
    expect(document.querySelector(`.js-cart-item-box-${productId1}`)).toEqual(null);
    expect(document.querySelector(`.js-cart-item-box-${productId2}`)).not.toEqual(null);
    expect(cartTestOrderSummary.cartItems.length).toEqual(1);
    expect(cartTestOrderSummary.cartItems[0].productId).toEqual(productId2);
  });

  it('update the delivery option', () => {
    document.querySelector(`.js-delivery-option-${productId1}-${'3'}`).click();
    const deliveryOptionInput = document.querySelector(`.js-delivery-option-input-${productId1}-${'3'}`);

    expect(deliveryOptionInput.checked).toEqual(true);
    expect(cartTestOrderSummary.cartItems.length).toEqual(2);
    expect(cartTestOrderSummary.cartItems[0].productId).toEqual(productId1);
    expect(cartTestOrderSummary.cartItems[0].deliveryOptionId).toEqual('3');

    expect(document.querySelector('.js-shipping-cost').innerText).toEqual('$14.98');
    expect(document.querySelector('.js-total').innerText).toEqual('$63.50');
  });

  afterEach(() => {
    document.querySelector('.js-test-container').innerHTML = ``;
  });
});

console.log(cartTestOrderSummary.cartItems);