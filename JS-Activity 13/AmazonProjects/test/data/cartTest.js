import {addToCart, cart, loadCartFromStorage} from '../../data/cart.js';

describe('test suite: addToCart', () => {
  it('adds an existing product to the cart', () => {
    spyOn(localStorage, 'setItem');

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: 'f3deefd6-c8c4-4302-90ab-58c637764eea',
        quantity: 1,
        deliveryOption: '1'
      }]);
    });

    loadCartFromStorage();

    addToCart('f3deefd6-c8c4-4302-90ab-58c637764eea');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('f3deefd6-c8c4-4302-90ab-58c637764eea');
    expect(cart[0].quantity).toEqual(2);
  });

  it('adds an new product to the cart', () => {
    spyOn(localStorage, 'setItem');

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });

    loadCartFromStorage();

    addToCart('f3deefd6-c8c4-4302-90ab-58c637764eea');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('f3deefd6-c8c4-4302-90ab-58c637764eea');
    expect(cart[0].quantity).toEqual(1);
  });
});