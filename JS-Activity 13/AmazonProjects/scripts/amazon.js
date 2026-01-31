let productHTML = '';

products.forEach((product) => {
    productHTML += 
        `<div class="product-box">
                <div class="product-img-box">
                    <img class="product-img" src="${product.img}">
                </div>
                <div class="product-name">
                    ${product.name}
                </div>
                <div class="product-ratings">
                    <img src="images/ratings/rating-${product.ratings.stars * 10}.png" class="product-rating-star">
                    <p class="product-rating-count">${product.ratings.count}</p>
                </div>
                <div class="product-price">$${(product.priceCents / 100).toFixed(2)}</div>
                <div class="product-quantity-container">
                    <select class="quantity-selector">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                </div>
                <div class="added-to-cart-msg">
                    <img src="images/Function-img/checkmark.png" class="added-icon">
                    Added
                </div>
                <div class="add-to-cart-box">
                    <button class="add-cart-btn js-add-to-cart-btn data-product-id">
                        Add to Cart
                    </button>
                </div>
            </div>`;
});

document.querySelector('.js-products-grid')
    .innerHTML = productHTML;

document.querySelectorAll('.js-add-to-cart-btn')
    .forEach((item, index) => {
        /* item.addEventListener('click', () => {
            
        }) */
       console.log(index);
    })