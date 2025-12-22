const products = [
    {
        img: 'images/products/athletic-cotton-socks-6-pairs.jpg',
        name: 'Black and Gray Athletic Cotton Socks - 6 Pairs',
        ratings: {
            stars: 4.5,
            count: 87
        },
        priceCents: 1090
    },
    {
        img: 'images/products/intermediate-composite-basketball.jpg',
        name: 'Intermediate Size Basketball',
        ratings: {
            stars: 4,
            count: 87
        },
        priceCents: 2095
    },
    {
        img: 'images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg',
        name: 'Adults Plain Cotton T-Shirt - 2 Pack',
        ratings: {
            stars: 4.5,
            count: 56
        },
        priceCents: 1899
    },
    {
        img: 'images/products/black-2-slot-toaster.jpg',
        name: '2 Slot Toaster - Black',
        ratings: {
            stars: 5,
            count: 2197
        },
        priceCents: 1899
    },
    {
        img: 'images/products/6-piece-white-dinner-plate-set.jpg',
        name: '6 Piece White Dinner Plate Set',
        ratings: {
            stars: 4,
            count: 37
        },
        priceCents: 2067
    },
    {
        img: 'images/products/6-piece-non-stick-baking-set.webp',
        name: 'Black and Gray Athletic Cotton Socks - 6 Pairs',
        ratings: {
            stars: 4.5,
            count: 175
        },
        priceCents: 3499 
    },
    {
        img: 'images/products/plain-hooded-fleece-sweatshirt-yellow.jpg',
        name: 'Plain Hooded Fleece Sweatshirt',
        ratings: {
            stars: 4.5,
            count: 317
        },
        priceCents: 2400 
    },
    {
        img: 'images/products/luxury-tower-set-6-piece.jpg',
        name: 'Luxury Towel Set - Graphite Gray',
        ratings: {
            stars: 4.5,
            count: 144
        },
        priceCents: 3599
    },
    {
        img: 'images/products/liquid-laundry-detergent-plain.jpg',
        name: 'Liquid Laundry Detergent, 110 Loads, 82.5 Fl Oz',
        ratings: {
            stars: 4.5,
            count: 305
        },
        priceCents: 2899
    },
    {
        img: 'images/products/knit-athletic-sneakers-gray.jpg',
        name: 'Waterproof Knit Athletic Sneakers - Gray',
        ratings: {
            stars: 4,
            count: 89
        },
        priceCents: 3390
    },
    {
        img: 'images/products/women-chiffon-beachwear-coverup-black.jpg',
        name: `Women's Chiffon Beachwear Cover Up - Black`,
        ratings: {
            stars: 4,
            count: 235
        },
        priceCents: 2070
    },
    {
        img: 'images/products/round-sunglasses-black.jpg',
        name: `Round Sunglasses`,
        ratings: {
            stars: 4.5,
            count: 30
        },
        priceCents: 1560
    },
    {
        img: 'images/products/women-beach-sandals.jpg',
        name: `Women's Two Strap Buckle Sandals - Tan`,
        ratings: {
            stars: 4.5,
            count: 562
        },
        priceCents: 2499
    },
    {
        img: 'images/products/blackout-curtain-set-beige.webp',
        name: `Blackout Curtains Set 4-Pack - Beige`,
        ratings: {
            stars: 4.5,
            count: 232
        },
        priceCents: 4599
    },
    {
        img: 'images/products/men-slim-fit-summer-shorts-gray.jpg',
        name: `Men's Slim-Fit Summer Shorts`,
        ratings: {
            stars: 4,
            count: 160
        },
        priceCents: 1699
    },
    {
        img: 'images/products/electric-glass-and-steel-hot-water-kettle.webp',
        name: `Electric Glass and Steel Hot Tea Water Kettle - 1.7-Liter`,
        ratings: {
            stars: 5,
            count: 846
        },
        priceCents: 3074
    },
    {
        
        img: 'images/products/facial-tissue-2-ply-18-boxes.jpg',
        name: `Ultra Soft Tissue 2-Ply - 18 Box`,
        ratings: {
            stars: 4,
            count: 99
        },
        priceCents: 2374
    },
    {
        img: 'images/products/straw-sunhat.webp',
        name: `Straw Lifeguard Sun Hat`,
        ratings: {
            stars: 4,
            count: 215
        },
        priceCents: 2200
    },
    {
        img: 'images/products/sky-flower-stud-earrings.webp',
        name: `Sterling Silver Sky Flower Stud Earrings`,
        ratings: {
            stars: 4.5,
            count: 52
        },
        priceCents: 1799
    },
    {
        img: 'images/products/women-stretch-popover-hoodie-black.jpg',
        name: `Women's Stretch Popover Hoodie`,
        ratings: {
            stars: 4.5,
            count: 2465
        },
        priceCents: 1374
    },
    {
        img: 'images/products/bathroom-rug.jpg',
        name: `Bathroom Bath Rug Mat 20 x 31 Inch - Grey`,
        ratings: {
            stars: 4.5,
            count: 119
        },
        priceCents: 1250
    },
    {
        img: 'images/products/women-knit-ballet-flat-black.jpg',
        name: `Women's Knit Ballet Flat`,
        ratings: {
            stars: 4,
            count: 326
        },
        priceCents: 2640
    },
    {
        img: 'images/products/men-golf-polo-t-shirt-blue.jpg',
        name: `Men's Regular-Fit Quick-Dry Golf Polo Shirt`,
        ratings: {
            stars: 4.5,
            count: 2556
        },
        priceCents: 1599
    },
    {
        img: 'images/products/trash-can-with-foot-pedal-50-liter.jpg',
        name: `Trash Can with Foot Pedal - Brushed Stainless Steel`,
        ratings: {
            stars: 4.5,
            count: 2286
        },
        priceCents: 8300
    },
    {
        img: 'images/products/duvet-cover-set-blue-twin.jpg',
        name: `Duvet Cover Set with Zipper Closure`,
        ratings: {
            stars: 4,
            count: 456
        },
        priceCents: 2399
    },
    {
        img: 'images/products/women-chunky-beanie-gray.webp',
        name: `Women's Chunky Cable Beanie - Gray`,
        ratings: {
            stars: 5,
            count: 83
        },
        priceCents: 1250
    },
    {
        img: 'images/products/men-chino-pants-beige.jpg',
        name: `Men's Classic-fit Pleated Chino Pants`,
        ratings: {
            stars: 4.5,
            count: 9017
        },
        priceCents: 2290
    },
    {
        img: 'images/products/men-athletic-shoes-green.jpg',
        name: `Men's Athletic Sneaker`,
        ratings: {
            stars: 4,
            count: 229
        },
        priceCents: 3890
    },
    {
        img: 'images/products/men-navigator-sunglasses-brown.jpg',
        name: `Men's Navigator Sunglasses Pilot`,
        ratings: {
            stars: 3.5,
            count: 42
        },
        priceCents: 1690
    },
    {
        img: 'images/products/non-stick-cooking-set-15-pieces.webp',
        name: `Non-Stick Cookware Set, Pots, Pans and Utensils - 15 Pieces`,
        ratings: {
            stars: 4.5,
            count: 511
        },
        priceCents: 6797
    },
    {
        img: 'images/products/vanity-mirror-silver.jpg',
        name: `Vanity Mirror with Heavy Base - Chrome`,
        ratings: {
            stars: 4.5,
            count: 130
        },
        priceCents: 1649
    },
    {
        img: 'images/products/women-french-terry-fleece-jogger-camo.jpg',
        name: `Women's Fleece Jogger Sweatpant`,
        ratings: {
            stars: 4.5,
            count: 248
        },
        priceCents: 2400
    },
    {
        img: 'images/products/double-elongated-twist-french-wire-earrings.webp',
        name: `Double Oval Twist French Wire Earrings - Gold`,
        ratings: {
            stars: 4.5,
            count: 117
        },
        priceCents: 2400
    },
    {
        img: 'images/products/round-airtight-food-storage-containers.jpg',
        name: `Round Airtight Food Storage Containers - 5`,
        ratings: {
            stars: 4,
            count: 126
        },
        priceCents: 2899
    },
    {
        img: 'images/products/round-airtight-food-storage-containers.jpg',
        name: `Coffeemaker with Glass Carafe and Reusable Filter - 25 Oz, Black`,
        ratings: {
            stars: 4.5,
            count: 1211
        },
        priceCents: 2250
    },
    {
        img: 'images/products/blackout-curtains-black.jpg',
        name: `Blackout Curtains Set 42 x 84-Inch - Black, 2 Panels`,
        ratings: {
            stars: 4.5,
            count: 363
        },
        priceCents: 3099
    },
    {
        img: 'images/products/cotton-bath-towels-teal.webp',
        name: `100% Cotton Bath Towels - 2 Pack, Light Teal`,
        ratings: {
            stars: 4.5,
            count: 93
        },
        priceCents: 2110
    },
    {
        img: 'images/products/knit-athletic-sneakers-pink.webp',
        name: `Waterproof Knit Athletic Sneakers - Pink`,
        ratings: {
            stars: 4,
            count: 89
        },
        priceCents: 3390
    },
    {
        img: 'images/products/countertop-blender-64-oz.jpg',
        name: `Countertop Blender - 64oz, 1400 Watts`,
        ratings: {
            stars: 4,
            count: 3
        },
        priceCents: 10747
    },
    {
        img: 'images/products/floral-mixing-bowl-set.jpg',
        name: `10-Piece Mixing Bowl Set with Lids - Floral`,
        ratings: {
            stars: 5,
            count: 679
        },
        priceCents: 3899
    },
    {
        img: 'images/products/kitchen-paper-towels-30-pack.jpg',
        name: `2-Ply Kitchen Paper Towels - 30 Pack`,
        ratings: {
            stars: 4.5,
            count: 1045
        },
        priceCents: 5799
    },
    {
        img: 'images/products/men-cozy-fleece-zip-up-hoodie-red.jpg',
        name: `Men's Full-Zip Hooded Fleece Sweatshirt`,
        ratings: {
            stars: 4.5,
            count: 3157
        },
        priceCents: 2400
    },
];