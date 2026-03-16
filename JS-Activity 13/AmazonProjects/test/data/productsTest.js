import { getProduct } from "../../data/products.js";

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
            priceCents: 1090
        });
    });

    it('call the product that is doesnt exist', () => {
        const notExistedProduct = getProduct('doesnt exist', testProduct);
        expect(notExistedProduct).toEqual(undefined);
    });
});