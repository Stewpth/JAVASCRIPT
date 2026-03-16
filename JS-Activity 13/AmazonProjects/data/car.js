class Car {
    #brand;
    #model;
    speed;
    isTrunkOpen = false;

    constructor(carDetails) {
        this.#brand = carDetails.brand;
        this.#model = carDetails.model;
        this.speed = 0;
    }

    displayInfo() {
        return `${this.#brand} ${this.#model}, Speed: ${this.speed} km/h, is the trunk open? ${this.isTrunkOpen}`;
    }

    go() {
        if(!this.isTrunkOpen) {
            this.speed += 5;
        }

        if (this.speed > 200) {
            this.speed = 200;
        }
    }

    brake() {
        this.speed -= 5;
        if (this.speed < 0) {
            this.speed = 0;
        }
    }

    openTrunk() {
        if (this.speed === 0) {
            this.isTrunkOpen = true;
        }
    }

    closeTrunk() {
        this.isTrunkOpen = false;
    }
}

class RaceCar extends Car {
    brand;
    model;
    acceleration;

    constructor(carDetails) {
        super(carDetails);
        this.brand = carDetails.brand;
        this.model = carDetails.model;
        this.acceleration = carDetails.acceleration;
    }

    go() {
        if(!this.isTrunkOpen) {
            this.speed += this.acceleration;
        }

        if (this.speed > 200) {
            this.speed = 200;
        }
    }

    displayInfo() {
        return `${this.brand} ${this.model}, Speed: ${this.speed} km/h, acceleration: ${this.acceleration}`;
    }

    openTrunk() {
        if (this.acceleration) {
            return
        } else {
            if (this.speed === 0) {
                this.isTrunkOpen = true;
            }
        }
    }

    closeTrunk() {
        if (this.acceleration) {
            return
        } else {
            this.isTrunkOpen = false;
        }
    }
}

const car1 = new Car({brand: 'Toyota', model: 'Corolla'});
const car2 = new Car({brand: 'Tesla', model: 'Model 3'});
const raceCar = new RaceCar({brand: 'McLaren', model: 'F1', acceleration: 20})

raceCar.go();
raceCar.go();
raceCar.openTrunk();
console.log(raceCar.displayInfo());

/*
car1.go();
car1.brake();
car1.brake();
console.log(car1.displayInfo());    

car2.go();
car2.go();
car2.go();
car2.go();
console.log(car2.displayInfo());
*/


car1.openTrunk();
car1.go();
car1.closeTrunk();
car1.go();
car1.brake();
car1.brake();
car1.brake();
car1.go();
car1.go();
console.log(car1.displayInfo());


car2.openTrunk();
car2.go();
car2.closeTrunk();
car2.go();
car2.brake();
car2.brake();
car2.brake();
car2.go();
car2.go();
console.log(car2.displayInfo());
