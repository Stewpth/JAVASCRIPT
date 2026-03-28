import { validDeliveryOption } from "./deliveryOption.js";
import "./car.js";

export class Cart {
    cartItems = undefined;
    localStorageKey = undefined;

    constructor(localStorageKey) {
        this.localStorageKey = localStorageKey;
    }

    loadCartFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey)) || [{
            productId: 'f3deefd6-c8c4-4302-90ab-58c637764eea',
            quantity: 2,
            deliveryOptionId: '1'
        }, {
            productId: '52ce4aa6-ec22-4954-bde1-31dbe4d4e49a',
            quantity: 1,
            deliveryOptionId: '2'
        }];
    }

    saveToStorage() {
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
    }

    addToCart(productId) {
        const selectedQuantity = document.querySelector(`.js-quantity-selector-${productId}`);

        let matchingItem;
            
        this.cartItems.forEach((item) => {
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
                this.cartItems.push({ 
                    productId, 
                    quantity: Number(selectedQuantity.value), 
                    deliveryOptionId: '1'
                });
            }
        } else {
            if (matchingItem) {  
                matchingItem.quantity += 1;     
            } else {
                this.cartItems.push({ 
                    productId, 
                    quantity: 1, 
                    deliveryOptionId: '1'
                });
            }
        }

        this.saveToStorage();
    };

    removeFromCart(productId) {
        const newCart = [];

        this.cartItems.forEach((cartItem) => {
            if (cartItem.productId !== productId) {
                newCart.push(cartItem);
            }
        });

        this.cartItems = newCart;
        this.saveToStorage();
    };

    calculateCartQuantity() {
        let cartQuantity = 0;

        this.cartItems.forEach((cartItem) => {
            cartQuantity += cartItem.quantity;
        });

        return cartQuantity;
    }
    
    updateQuantity(productId, newQuantity) {
        let matchingItem;
            
        this.cartItems.forEach((item) => {
            if (productId === item.productId) {
                matchingItem = item;
            }
        });

        if (matchingItem) {
            matchingItem.quantity = newQuantity;
        }

        this.saveToStorage();

        return newQuantity;
    }

    updateDeliveryOption(productId, deliveryOptionId) {
        let matchingItem;
            
        this.cartItems.forEach((item) => {
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

        this.saveToStorage();
    }
}

export let cart = new Cart('cart-class');

cart.loadCartFromStorage();

export function loadCart(fun) {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('load', () => {
        console.log(xhr.response);
        fun();
    });

    xhr.open('GET', 'https://supersimplebackend.dev/cart');
    xhr.send();
}
