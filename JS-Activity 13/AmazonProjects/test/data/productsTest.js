import { getProduct } from "../../data/products.js";

import { Product, Appliance } from "../../data/products.js";

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

describe('Test suite: class Appliance extend Products', () => {
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
        productId: 'test1',
        img: 'img1',
        name: 'product 1',
        ratings: {
            stars: 4.5,
            count: 87
        },
        priceCents: 1090,
        type: 'clothing',
        instructionsLink: '',
        warrantyLink: ''
    }].map((productDetails) => {
        if (productDetails.type === 'appliances') {
            return new Appliance(productDetails);
        }

        return new Product(productDetails);
    });

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
    });

    it('check the method of the class Appliance if its correct', () => {
        expect (testProduct[0].getProductImg()).toEqual('img1');
        expect (testProduct[0].getProductRatings()).toContain(
            `images/ratings/rating`
        );
        expect (testProduct[0].getProductRatingCounts()).toEqual(87);
        expect (testProduct[0].getPrice()).toContain(`$`);

        // we expect that testProduct[0] on method getWarrantyURL have
        // '<a href="" target="_blank">Instruction</a>'
        expect (testProduct[0].getInstructionURL()).toContain(
            '<a href="' && '" target="_blank">Instruction</a>'
        );
        // we expect that testProduct[0] on method getWarrantyURL have
        // '<a href="" target="_blank">Warranty</a>'
        expect (testProduct[0].getWarrantyURL()).toContain(
            '<a href="' && '" target="_blank">Warranty</a>'
        );
        expect (testProduct[0].extraInfoHTML()).toEqual('');
    });
});

describe('Test suite: class Clothing extend Products')