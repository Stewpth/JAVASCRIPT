import { getProduct } from "../../data/products.js";

import { Product, Appliance, Clothing } from "../../data/products.js";

describe('Test suite: getProduct', () => {
    const testProduct = [{
        productId: 'test1',
        img: 'img1',
        name: 'product 1',
        ratings: {
            stars: 4.5,
            count: 87
        },
        priceCents: 1090
    }];

    it('check if the product is correct', () => {
        const testProduct1 = getProduct('test1', testProduct);

        expect(testProduct1.productId).toEqual('test1');
        expect(testProduct1.img).toEqual('img1');
        expect(testProduct1.name).toEqual('product 1');
        expect(testProduct1.ratings).toEqual({
            stars: 4.5,
            count: 87
        });
        expect(testProduct1.priceCents).toEqual(1090);
        expect(testProduct1).toEqual({
            productId: 'test1',
            img: 'img1',
            name: 'product 1',
            ratings: {
                stars: 4.5,
                count: 87
            },
            priceCents: 1090,
            
        });
    });

    it('call the product that is doesnt exist', () => {
        const notExistedProduct = getProduct('doesnt exist', testProduct);
        expect(notExistedProduct).toEqual(undefined);
    });
});

describe('Test suite: Class from product.js', () => {
    const testProduct = [{
        productId: 'test1',
        img: 'img1',
        name: 'product 1',
        ratings: {
            stars: 4.5,
            count: 87
        },
        priceCents: 1090,
        type: 'appliances',
        instructionsLink: 'image/Function-img/appliance-instructions.png',
        warrantyLink: 'image/Function-img/appliance-warranty.png'
    }, {
        productId: 'test2',
        img: 'img2',
        name: 'product 2',
        ratings: {
            stars: 5.0,
            count: 87
        },
        priceCents: 1090,
        type: 'clothing',
        sizeChartLink: 'images/Function-img/clothing-size-chart.png'
    }, {
        productId: 'test3',
        img: 'img3',
        name: 'product 3',
        ratings: {
            stars: 4.2,
            count: 70
        },
        priceCents: 1090,
    }].map((productDetails) => {
        if (productDetails.type === 'appliances') {
            return new Appliance(productDetails);
        } else if (productDetails.type === 'clothing') {
            return new Clothing(productDetails);
        }

        return new Product(productDetails);
    });

    describe('class Products', () => {
        it('check the class Clothing if the data is correct', () => {
            expect(testProduct[2].productId).toEqual('test3');
            expect(testProduct[2].img).toEqual('img3');
            expect(testProduct[2].name).toEqual('product 3');
            expect(testProduct[2].ratings).toEqual({
                stars: 4.2,
                count: 70
            });
            expect(testProduct[2].priceCents).toEqual(1090);
            expect(testProduct[2].type).toEqual(undefined);
            expect(testProduct[2].instructionsLink).toEqual(undefined);
            expect(testProduct[2].warrantyLink).toEqual(undefined);
            expect(testProduct[2].sizeChartLink).toEqual(undefined);
        });

        it('check the method of the class Clothing if its correct', () => {
            expect (testProduct[2].getProductImg()).toEqual('img3');
            expect (testProduct[2].getProductRatings()).toContain(
                `images/ratings/rating`
            );
            expect (testProduct[2].getPrice()).toContain(`$`);

            expect (testProduct[2].extraInfoHTML()).toEqual('');
        });
    });

    describe('class Appliance extend Products', () => {
        it('checks the class Appliance if the data is correct', () => {
            expect(testProduct[0].productId).toEqual('test1');
            expect(testProduct[0].img).toEqual('img1');
            expect(testProduct[0].name).toEqual('product 1');
            expect(testProduct[0].ratings).toEqual({
                stars: 4.5,
                count: 87
            });
            expect(testProduct[0].priceCents).toEqual(1090);
            expect(testProduct[0].type).toEqual('appliances');
            expect(testProduct[0].instructionsLink).toEqual('image/Function-img/appliance-instructions.png');
            expect(testProduct[0].warrantyLink).toEqual('image/Function-img/appliance-warranty.png');
            expect(testProduct[0].sizeChartLink).toEqual(undefined);
        });

        it('check the method of the class Appliance if its correct', () => {
            expect (testProduct[0].getProductImg()).toEqual('img1');
            expect (testProduct[0].getProductRatings()).toContain(
                `images/ratings/rating`
            );
            expect (testProduct[0].getPrice()).toContain(`$`);

            expect (testProduct[0].extraInfoHTML()).toContain(
                '<a href="' && '" target="_blank">Instruction</a>' &&
                '<a href="' && '" target="_blank">Warranty</a>'
            );
        });
    });

    describe('class Clothing extend Products', () => {
        it('check the class Clothing if the data is correct', () => {
            expect(testProduct[1].productId).toEqual('test2');
            expect(testProduct[1].img).toEqual('img2');
            expect(testProduct[1].name).toEqual('product 2');
            expect(testProduct[1].ratings).toEqual({
                stars: 5.0,
                count: 87
            });
            expect(testProduct[1].priceCents).toEqual(1090);
            expect(testProduct[1].type).toEqual('clothing');
            expect(testProduct[1].instructionsLink).toEqual(undefined);
            expect(testProduct[1].warrantyLink).toEqual(undefined);
            expect(testProduct[1].sizeChartLink).toEqual('images/Function-img/clothing-size-chart.png');
        });

        it('check the method of the class Clothing if its correct', () => {
            expect (testProduct[1].getProductImg()).toEqual('img2');
            expect (testProduct[1].getProductRatings()).toContain(
                `images/ratings/rating`
            );
            expect (testProduct[1].getPrice()).toContain(`$`);

            expect (testProduct[1].extraInfoHTML()).toContain(
                '<a href="' && '">Size chart</a>'
            );
        });
    });
});


