import {formatCurrency} from '../scripts/utils/money.js';;

export class Product {
    productId;
    img;
    name;
    ratings;
    priceCents;
    type;

    constructor(productDetails) {
        this.productId = productDetails.id;
        this.img = productDetails.image;
        this.name = productDetails.name;
        this.ratings = productDetails.rating;
        this.priceCents = productDetails.priceCents;
        this.type = productDetails.type;
    }

    getProductImg() {
        return `${this.img}`;
    }

    getProductRatings() {
        return `images/ratings/rating-${this.ratings.stars * 10}.png`;
    }

    getProductRatingCounts() {
        return this.ratings.count;
    }

    getPrice() {
        return `$${formatCurrency(this.priceCents)}`;
    }

    getInstructionURL() {
        return ``;
    }

    getWarrantyURL() {
        return ``;
    }

    extraInfoHTML() {
        return ``;
    }
}

export class Clothing extends Product {
    sizeChartLink;

    constructor(productDetails) {
        super(productDetails)
        this.sizeChartLink = productDetails.sizeChartLink;
    }

    extraInfoHTML() {
        return `<a href="${this.sizeChartLink}">Size chart</a>`;
    }
}

export class Appliance extends Product {
    instructionsLink;
    warrantyLink;

    constructor(productDetails) {
        super(productDetails);
        this.instructionsLink = productDetails.instructionsLink;
        this.warrantyLink = productDetails.warrantyLink;
    }

    extraInfoHTML() {
        return `
            <a href="${this.instructionsLink}" target="_blank">Instruction</a>
            <a href="${this.warrantyLink}" target="_blank">Warranty</a>
        `;
    }
}

export let products = [];

export function loadProducts(fun) {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('load', () => {
        products = JSON.parse(xhr.response).map((productDetails) => {
            if (productDetails.type === 'appliances') {
                return new Appliance(productDetails);
            } else if (productDetails.type === 'clothing') {
                return new Clothing(productDetails);
            }

            return new Product(productDetails);
        });

        console.log('load products');
        fun();
    });

    xhr.open('GET', 'https://supersimplebackend.dev/products');
    xhr.send();
}

export function getProduct(productId, testProduct) {
    if (!testProduct) {
        let matchingProduct;

        products.forEach((product) => {
            if (product.productId === productId) {
                matchingProduct = product;
            }
        });

        if (!matchingProduct) {
            return
        }

        return matchingProduct;
    } else {
        let matchingProduct;

        testProduct.forEach((product) => {
            if (product.productId === productId) {
                matchingProduct = product;
            }
        });

        if (!matchingProduct) {
            return
        }

        return matchingProduct;
    } 
}

/*
export const products = [
    {
        productId: 'f3deefd6-c8c4-4302-90ab-58c637764eea',
        img: 'images/products/athletic-cotton-socks-6-pairs.jpg',
        name: 'Black and Gray Athletic Cotton Socks - 6 Pairs',
        ratings: {
            stars: 4.5,
            count: 87
        },
        priceCents: 1090
    },
    {   
        productId: '52ce4aa6-ec22-4954-bde1-31dbe4d4e49a',
        img: 'images/products/intermediate-composite-basketball.jpg',
        name: 'Intermediate Size Basketball',
        ratings: {
            stars: 4,
            count: 87
        },
        priceCents: 2095
    },
    {   
        productId: '482eb258-7e3f-42f4-9200-944456831e4e',
        img: 'images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg',
        name: 'Adults Plain Cotton T-Shirt - 2 Pack',
        ratings: {
            stars: 4.5,
            count: 56
        },
        priceCents: 1899,
        type: 'clothing',
        sizeChartLink: 'images/Function-img/clothing-size-chart.png'
    },
    {   
        productId: 'ba346863-ab37-41e7-8aff-4e3b6890e1f5',
        img: 'images/products/black-2-slot-toaster.jpg',
        name: '2 Slot Toaster - Black',
        ratings: {
            stars: 5,
            count: 2197
        },
        priceCents: 1899,
        type: 'appliances',
        instructionsLink: 'image/Function-img/appliance-instructions.png',
        warrantyLink: 'image/Function-img/appliance-warranty.png'
    },
    {   
        productId: '0fc56cab-ff86-403b-965e-69ab6e1bd62d',
        img: 'images/products/6-piece-white-dinner-plate-set.jpg',
        name: '6 Piece White Dinner Plate Set',
        ratings: {
            stars: 4,
            count: 37
        },
        priceCents: 2067
    },
    {   
        productId: 'b6ad66f6-6ad5-4648-80f1-f1965b080025',
        img: 'images/products/6-piece-non-stick-baking-set.webp',
        name: 'Black and Gray Athletic Cotton Socks - 6 Pairs',
        ratings: {
            stars: 4.5,
            count: 175
        },
        priceCents: 3499 
    },
    {   
        productId: 'e7960f85-4ac3-4298-a065-82ddae77a191',
        img: 'images/products/plain-hooded-fleece-sweatshirt-yellow.jpg',
        name: 'Plain Hooded Fleece Sweatshirt',
        ratings: {
            stars: 4.5,
            count: 317
        },
        priceCents: 2400,
        type: 'clothing',
        sizeChartLink: 'images/Function-img/clothing-size-chart.png'
    },
    {   
        productId: 'ebec987b-5830-4f60-9687-58a519852b8c',
        img: 'images/products/luxury-tower-set-6-piece.jpg',
        name: 'Luxury Towel Set - Graphite Gray',
        ratings: {
            stars: 4.5,
            count: 144
        },
        priceCents: 3599
    },
    {   
        productId: 'e28b047c-fe9e-4319-ab58-d2426ba87ac8',
        img: 'images/products/liquid-laundry-detergent-plain.jpg',
        name: 'Liquid Laundry Detergent, 110 Loads, 82.5 Fl Oz',
        ratings: {
            stars: 4.5,
            count: 305
        },
        priceCents: 2899
    },
    {
        productId: '3b76afd9-be2c-4200-89cb-025813826392',
        img: 'images/products/knit-athletic-sneakers-gray.jpg',
        name: 'Waterproof Knit Athletic Sneakers - Gray',
        ratings: {
            stars: 4,
            count: 89
        },
        priceCents: 3390
    },
    {   
        productId: '17778ba1-e5c2-49f6-bbad-33ad611108ec',
        img: 'images/products/women-chiffon-beachwear-coverup-black.jpg',
        name: `Women's Chiffon Beachwear Cover Up - Black`,
        ratings: {
            stars: 4,
            count: 235
        },
        priceCents: 2070,
        type: 'clothing',
        sizeChartLink: 'images/Function-img/clothing-size-chart.png'
    },
    {   
        productId: '6fc52c55-b547-4f94-a9e4-ebb93a3b3ab6',
        img: 'images/products/round-sunglasses-black.jpg',
        name: `Round Sunglasses`,
        ratings: {
            stars: 4.5,
            count: 30
        },
        priceCents: 1560
    },
    {   
        productId: 'ef4016be-5769-4a27-906c-7ec3c424ff4c',
        img: 'images/products/women-beach-sandals.jpg',
        name: `Women's Two Strap Buckle Sandals - Tan`,
        ratings: {
            stars: 4.5,
            count: 562
        },
        priceCents: 2499
    },
    {   
        productId: '5f4c65b2-06de-4be4-81d7-da9defe4ea5b',
        img: 'images/products/blackout-curtain-set-beige.webp',
        name: `Blackout Curtains Set 4-Pack - Beige`,
        ratings: {
            stars: 4.5,
            count: 232
        },
        priceCents: 4599
    },
    {   
        productId: 'a78a3375-2303-470c-ba8e-95bad99a2506',
        img: 'images/products/men-slim-fit-summer-shorts-gray.jpg',
        name: `Men's Slim-Fit Summer Shorts`,
        ratings: {
            stars: 4,
            count: 160
        },
        priceCents: 1699,
        type: 'clothing',
        sizeChartLink: 'images/Function-img/clothing-size-chart.png'
    },
    {   
        productId: '934d1b98-9ff0-4c11-badd-369e65ef0f3e',
        img: 'images/products/electric-glass-and-steel-hot-water-kettle.webp',
        name: `Electric Glass and Steel Hot Tea Water Kettle - 1.7-Liter`,
        ratings: {
            stars: 5,
            count: 846
        },
        priceCents: 3074,
        type: 'appliances',
        instructionsLink: 'image/Function-img/appliance-instructions.png',
        warrantyLink: 'image/Function-img/appliance-warranty.png'
    },
    {
        productId: '98e681c0-a11e-4aa6-91e5-f1d805b7dcc8',
        img: 'images/products/facial-tissue-2-ply-18-boxes.jpg',
        name: `Ultra Soft Tissue 2-Ply - 18 Box`,
        ratings: {
            stars: 4,
            count: 99
        },
        priceCents: 2374
    },
    {   
        productId: '60476f7b-9eb7-41a6-8c56-e7a882e87405',
        img: 'images/products/straw-sunhat.webp',
        name: `Straw Lifeguard Sun Hat`,
        ratings: {
            stars: 4,
            count: 215
        },
        priceCents: 2200
    },
    {   
        productId: 'b50a4378-5588-4fe9-b62c-1858293f7640',
        img: 'images/products/sky-flower-stud-earrings.webp',
        name: `Sterling Silver Sky Flower Stud Earrings`,
        ratings: {
            stars: 4.5,
            count: 52
        },
        priceCents: 1799
    },
    {   
        productId: '54fc3c91-677c-487a-8fc8-0cb739b5c650',        
        img: 'images/products/women-stretch-popover-hoodie-black.jpg',
        name: `Women's Stretch Popover Hoodie`,
        ratings: {
            stars: 4.5,
            count: 2465
        },
        priceCents: 1374,
        type: 'clothing',
        sizeChartLink: 'images/Function-img/clothing-size-chart.png'
    },
    {   
        productId: '97206dc5-738b-4254-9849-e5876ce33d01',
        img: 'images/products/bathroom-rug.jpg',
        name: `Bathroom Bath Rug Mat 20 x 31 Inch - Grey`,
        ratings: {
            stars: 4.5,
            count: 119
        },
        priceCents: 1250
    },
    {   
        productId: '694432ce-6d48-40e5-847f-4bd8c0de053c',
        img: 'images/products/women-knit-ballet-flat-black.jpg',
        name: `Women's Knit Ballet Flat`,
        ratings: {
            stars: 4,
            count: 326
        },
        priceCents: 2640
    },
    {   
        productId: 'bf643c6b-0f44-4a2f-a4e0-cfc1dd5977c6',
        img: 'images/products/men-golf-polo-t-shirt-blue.jpg',
        name: `Men's Regular-Fit Quick-Dry Golf Polo Shirt`,
        ratings: {
            stars: 4.5,
            count: 2556
        },
        priceCents: 1599,
        type: 'clothing',
        sizeChartLink: 'images/Function-img/clothing-size-chart.png'
    },
    {   
        productId: '0e2c36ee-a59b-47f4-9ae6-6d03620c1b50',
        img: 'images/products/trash-can-with-foot-pedal-50-liter.jpg',
        name: `Trash Can with Foot Pedal - Brushed Stainless Steel`,
        ratings: {
            stars: 4.5,
            count: 2286
        },
        priceCents: 8300
    },
    {   
        productId: 'ee2dbad1-f2ab-417a-9fb6-25abd406390c',
        img: 'images/products/duvet-cover-set-blue-twin.jpg',
        name: `Duvet Cover Set with Zipper Closure`,
        ratings: {
            stars: 4,
            count: 456
        },
        priceCents: 2399
    },
    {   
        productId: '1a3f0ae4-7fd3-404d-aa30-4f4e832b828e',
        img: 'images/products/women-chunky-beanie-gray.webp',
        name: `Women's Chunky Cable Beanie - Gray`,
        ratings: {
            stars: 5,
            count: 83
        },
        priceCents: 1250
    },
    {   
        productId: '0f3cdfb4-2a5a-4f2e-b8d4-c13da54e8cfe',
        img: 'images/products/men-chino-pants-beige.jpg',
        name: `Men's Classic-fit Pleated Chino Pants`,
        ratings: {
            stars: 4.5,
            count: 9017
        },
        priceCents: 2290,
        type: 'clothing',
        sizeChartLink: 'images/Function-img/clothing-size-chart.png'
    },
    {   
        productId: 'ce6fa05f-9e6c-4f41-a935-d355f3700029',
        img: 'images/products/men-athletic-shoes-green.jpg',
        name: `Men's Athletic Sneaker`,
        ratings: {
            stars: 4,
            count: 229
        },
        priceCents: 3890
    },
    {   
        productId: '81112636-30ad-41b2-b84a-1662a9bac9d3',
        img: 'images/products/men-navigator-sunglasses-brown.jpg',
        name: `Men's Navigator Sunglasses Pilot`,
        ratings: {
            stars: 3.5,
            count: 42
        },
        priceCents: 1690
    },
    {   
        productId: '0d99cbd0-623b-46d3-8812-a5021921c14d',
        img: 'images/products/non-stick-cooking-set-15-pieces.webp',
        name: `Non-Stick Cookware Set, Pots, Pans and Utensils - 15 Pieces`,
        ratings: {
            stars: 4.5,
            count: 511
        },
        priceCents: 6797
    },
    {   
        productId: 'a7960720-828c-40df-9a22-a6b4f588a430',
        img: 'images/products/vanity-mirror-silver.jpg',
        name: `Vanity Mirror with Heavy Base - Chrome`,
        ratings: {
            stars: 4.5,
            count: 130
        },
        priceCents: 1649
    },
    {   
        productId: '5fa770f0-668c-444d-9100-4681f39c2378',
        img: 'images/products/women-french-terry-fleece-jogger-camo.jpg',
        name: `Women's Fleece Jogger Sweatpant`,
        ratings: {
            stars: 4.5,
            count: 248
        },
        priceCents: 2400,
        type: 'clothing',
        sizeChartLink: 'images/Function-img/clothing-size-chart.png'
    },
    {   
        productId: '79323d60-29c0-496d-b46c-9a5e6aa4dde4',
        img: 'images/products/double-elongated-twist-french-wire-earrings.webp',
        name: `Double Oval Twist French Wire Earrings - Gold`,
        ratings: {
            stars: 4.5,
            count: 117
        },
        priceCents: 2400
    },
    {   
        productId: '925220bf-3fb8-4c6c-8513-15336e065980',
        img: 'images/products/round-airtight-food-storage-containers.jpg',
        name: `Round Airtight Food Storage Containers - 5`,
        ratings: {
            stars: 4,
            count: 126
        },
        priceCents: 2899
    },
    {   
        productId: 'e26461fb-9d8a-41ac-8fdc-033723d89f40',
        img: 'images/products/round-airtight-food-storage-containers.jpg',
        name: `Coffeemaker with Glass Carafe and Reusable Filter - 25 Oz, Black`,
        ratings: {
            stars: 4.5,
            count: 1211
        },
        priceCents: 2250
    },
    {   
        productId: '4d3805a8-dea4-43b3-991a-bdcdb39e037d',
        img: 'images/products/blackout-curtains-black.jpg',
        name: `Blackout Curtains Set 42 x 84-Inch - Black, 2 Panels`,
        ratings: {
            stars: 4.5,
            count: 363
        },
        priceCents: 3099
    },
    {   
        productId: '18331812-0a85-4e5b-a806-485e80db7afb',
        img: 'images/products/cotton-bath-towels-teal.webp',
        name: `100% Cotton Bath Towels - 2 Pack, Light Teal`,
        ratings: {
            stars: 4.5,
            count: 93
        },
        priceCents: 2110
    },
    {   
        productId: 'd0d5a472-cbc2-4dfc-b7a7-c65d4acbcc23',
        img: 'images/products/knit-athletic-sneakers-pink.webp',
        name: `Waterproof Knit Athletic Sneakers - Pink`,
        ratings: {
            stars: 4,
            count: 89
        },
        priceCents: 3390
    },
    {   
        productId: 'cd29a3ab-9f01-467e-97bf-02d293601b19',
        img: 'images/products/countertop-blender-64-oz.jpg',
        name: `Countertop Blender - 64oz, 1400 Watts`,
        ratings: {
            stars: 4,
            count: 3
        },
        priceCents: 10747,
        type: 'appliances',
        instructionsLink: 'image/Function-img/appliance-instructions.png',
        warrantyLink: 'image/Function-img/appliance-warranty.png'
    },
    {   
        productId: 'dfa6ccba-e57a-424e-9cad-3b376ac96505',
        img: 'images/products/floral-mixing-bowl-set.jpg',
        name: `10-Piece Mixing Bowl Set with Lids - Floral`,
        ratings: {
            stars: 5,
            count: 679
        },
        priceCents: 3899
    },
    {   
        productId: '7422f534-f9c6-459f-9582-2bf1615394bc',
        img: 'images/products/kitchen-paper-towels-30-pack.jpg',
        name: `2-Ply Kitchen Paper Towels - 30 Pack`,
        ratings: {
            stars: 4.5,
            count: 1045
        },
        priceCents: 5799
    },
    {   
        productId: '6c2915e1-d8df-49f4-a284-a32a6d3c3b73',
        img: 'images/products/men-cozy-fleece-zip-up-hoodie-red.jpg',
        name: `Men's Full-Zip Hooded Fleece Sweatshirt`,
        ratings: {
            stars: 4.5,
            count: 3157
        },
        priceCents: 2400,
        type: 'clothing',
        sizeChartLink: 'images/Function-img/clothing-size-chart.png'
    },
].map((productDetails) => {
    if (productDetails.type === 'appliances') {
        return new Appliance(productDetails);
    } else if (productDetails.type === 'clothing') {
        return new Clothing(productDetails);
    }

    return new Product(productDetails);
});
*/