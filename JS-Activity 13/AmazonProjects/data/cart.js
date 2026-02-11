export const cart = [];

export function addToCart(productId) {
        const selectedQuantity = document.querySelector(`.js-quantity-selector-${productId}`);

        let matchingItem;
            
        cart.forEach((item) => {
            if (productId === item.productId) {
                matchingItem = item;
            }
        });

        // Using Number() method to convert the string into integer/number.
            
        if (matchingItem) {  
            matchingItem.quantity += Number(selectedQuantity.value);     
        } else {
            cart.push({ productId, quantity: Number(selectedQuantity.value)});
        }
    }