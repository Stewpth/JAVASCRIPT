import { validDeliveryOption } from "./deliveryOption.js";

export let cart;

loadCartFromStorage();

export function loadCartFromStorage() {
    cart = JSON.parse(localStorage.getItem('cart')) || [{
        productId: 'f3deefd6-c8c4-4302-90ab-58c637764eea',
        quantity: 2,
        deliveryOptionId: '1'
    }, {
        productId: '52ce4aa6-ec22-4954-bde1-31dbe4d4e49a',
        quantity: 1,
        deliveryOptionId: '2'
    }];
}

function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId) {
    const selectedQuantity = document.querySelector(`.js-quantity-selector-${productId}`);

    let matchingItem;
        
    cart.forEach((item) => {
        if (productId === item.productId) {
            matchingItem = item;
        }
    });

    // Using Number() method to convert the string into integer/number.
    // If selectedQuantity is null we used default code in else statement
    // in testing frameworks(testing-jasmine). we used default to use the function
    if (selectedQuantity) {
        if (matchingItem) {  
            matchingItem.quantity += Number(selectedQuantity.value);     
        } else {
            cart.push({ 
                productId, 
                quantity: Number(selectedQuantity.value), 
                deliveryOptionId: '1'
            });
        }
    } else {
        if (matchingItem) {  
            matchingItem.quantity += 1;     
        } else {
            cart.push({ 
                productId, 
                quantity: 1, 
                deliveryOptionId: '1'
            });
        }
    }

    saveToStorage();
};

export function removeFromCart(productId) {
    const newCart = [];

    cart.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
            newCart.push(cartItem);
        }
    });

    cart = newCart;
    saveToStorage();
};
export function calculateCartQuantity() {
    let cartQuantity = 0;

    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
    });

    return cartQuantity;
}

export function updateQuantity(productId, newQuantity) {
    let matchingItem;
        
    cart.forEach((item) => {
        if (productId === item.productId) {
            matchingItem = item;
        }
    });

    if (matchingItem) {
        matchingItem.quantity = newQuantity;
    }

    saveToStorage();

    return newQuantity;
}

export function updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;
        
    cart.forEach((item) => {
        if (productId === item.productId) {
            matchingItem = item;
        }
    });

    if (!matchingItem) {
        return
    }

    if (!validDeliveryOption(deliveryOptionId)) {
        return
    }

    matchingItem.deliveryOptionId = deliveryOptionId;

    saveToStorage();
}