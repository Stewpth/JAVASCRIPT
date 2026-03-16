class Car {
    brand;
    model;

    constructor(carDetails) {
        this.brand = carDetails.brand;
        this.model = carDetails.model;
    }

    displayInfo() {
        return `${this.brand} ${this.model}`
    }
}

const car1 = new Car({brand: 'Toyota', model: 'Corolla'});
const car2 = new Car({brand: 'Tesla', model: 'Model 3'});

console.log(car1.displayInfo());
console.log(car2.displayInfo());