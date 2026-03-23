import { updateSummaryOrder } from "../../scripts/checkout/orderSummary.js";
import { Cart } from "../../data/cart-class.js";

const cartTestOrderSummary = new Cart('cart-order-summary-test');

describe('test suite: updateSummaryOrder', () => {
  const productId1 = 'f3deefd6-c8c4-4302-90ab-58c637764eea';
  const productId2 = '52ce4aa6-ec22-4954-bde1-31dbe4d4e49a';

  const productId1Name = 'Black and Gray Athletic Cotton Socks - 6 Pairs';
  const productId2Name = 'Intermediate Size Basketball';

  beforeEach(() => {
    spyOn(localStorage, 'setItem');

    document.querySelector('.js-test-container').innerHTML = `
      <div class="js-cart-summary"></div>
      <div class="js-payment-info"></div>
      <div class="js-checkout-headers"></div>
    `;

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: productId1,
        quantity: 2,
        deliveryOptionId: '1'
      }, {
        productId: productId2,
        quantity: 1,
        deliveryOptionId: '2'
      }]);
    });
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

  afterEach(() => {
    document.querySelector('.js-test-container').innerHTML = ``;
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
});