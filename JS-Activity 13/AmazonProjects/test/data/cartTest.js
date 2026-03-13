import {addToCart, removeFromCart, cart, loadCartFromStorage} from '../../data/cart.js';

describe('test suite: addToCart', () => {
  beforeEach(() => {
    spyOn(localStorage, 'setItem');
  });

  it('adds an existing product to the cart', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: 'f3deefd6-c8c4-4302-90ab-58c637764eea',
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    });

    loadCartFromStorage();

    addToCart('f3deefd6-c8c4-4302-90ab-58c637764eea');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
        productId: 'f3deefd6-c8c4-4302-90ab-58c637764eea',
        quantity: 2,
        deliveryOptionId: '1'
      }]));
    expect(cart[0].productId).toEqual('f3deefd6-c8c4-4302-90ab-58c637764eea');
    expect(cart[0].quantity).toEqual(2);
  });

  it('adds an new product to the cart', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });

    loadCartFromStorage();

    
    addToCart('f3deefd6-c8c4-4302-90ab-58c637764eea');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
        productId: 'f3deefd6-c8c4-4302-90ab-58c637764eea',
        quantity: 1,
        deliveryOptionId: '1'
      }]));
    expect(cart[0].productId).toEqual('f3deefd6-c8c4-4302-90ab-58c637764eea');
    expect(cart[0].quantity).toEqual(1);
  });
});

describe('Test suite: removeFromCart', () => {
  beforeEach(() => {
    spyOn(localStorage, 'setItem');

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: 'f3deefd6-c8c4-4302-90ab-58c637764eea',
        quantity: 2,
        deliveryOptionId: '1'
      }]);
    });

    loadCartFromStorage();
  });

  it('remove the productId that is in the cart', () => {
    removeFromCart('f3deefd6-c8c4-4302-90ab-58c637764eea');
    expect(cart.length).toEqual(0);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([]));
  });

  it('remove a productId that is not in the cart', () => {
    removeFromCart(''); // we test if this gives us undefined because we remove nothing.
    expect(cart.length).toEqual(1); // we test if the cart is still 1 and no one removed

    // we confirm that the specific product was not removed in the cart.
    expect(cart[0].productId).toEqual('f3deefd6-c8c4-4302-90ab-58c637764eea'); 
    expect(cart[0].quantity).toEqual(2);


    expect(localStorage.setItem).toHaveBeenCalledTimes(1);

    // we expect that this is the value of the cart after we remove nothing
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
      productId: 'f3deefd6-c8c4-4302-90ab-58c637764eea',
      quantity: 2,
      deliveryOptionId: '1'
    }]));
  });
});