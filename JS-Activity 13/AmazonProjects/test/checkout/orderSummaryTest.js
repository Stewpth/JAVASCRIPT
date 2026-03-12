import { updateSummaryOrder } from "../../scripts/checkout/orderSummary.js";
import { loadCartFromStorage, cart } from "../../data/cart.js";

describe('test suite: updateSummaryOrder', () => {
  const productId1 = 'f3deefd6-c8c4-4302-90ab-58c637764eea';
  const productId2 = '52ce4aa6-ec22-4954-bde1-31dbe4d4e49a';

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
    loadCartFromStorage();

    updateSummaryOrder();
  });

  it('displays the cart', () => {
    expect(document.querySelectorAll('.js-cart-item-box').length).toEqual(2);
    expect(document.querySelector(`.js-quantity-text-${productId1}`).innerText).toContain('Quantity: 2');
    expect(document.querySelector(`.js-quantity-text-${productId2}`).innerText).toContain('Quantity: 1');

    document.querySelector('.js-test-container').innerHTML = ``;
  });

  it('removes a product', () => {
    document.querySelector(`.js-delete-quantity-link-${productId1}`).click();

    expect(document.querySelectorAll('.js-cart-item-box').length).toEqual(1);
    expect(document.querySelector(`.js-cart-item-box-${productId1}`)).toEqual(null);
    expect(document.querySelector(`.js-cart-item-box-${productId2}`)).not.toEqual(null);
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId2);

    document.querySelector('.js-test-container').innerHTML = ``;
  });
});