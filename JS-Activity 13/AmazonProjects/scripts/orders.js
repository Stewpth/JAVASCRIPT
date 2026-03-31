export const orders = JSON.parse(localStorage.getItem('orders')) || [];

function saveToLocalStorage(orderKey) {
    localStorage.setItem('orders', JSON.stringify(orderKey));
}

export async function postOrder(cart) {
    try {
        const response = await fetch('https://supersimplebackend.dev/orders', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                cart: cart
            })
        });

        const order = await response.json();
        addOrder(order);

        window.location.href = 'orders.html';

    } catch(error) {
        console.log('Unexpected Error, Please try again later.');
    }
    
}

function addOrder(order) {
    orders.unshift(order);
    saveToLocalStorage(orders);
}