class Store {
    constructor() {
        this.pizzaSlicePrice = 30;
        this.weekendDiscount = 0;
        this.nightDiscount = 0;
        this.bonus = 0;
    }

    calculateTotalAmount() {
        this.totalAmount = this.pizzaSlicePrice - this.pizzaSlicePrice * (this.nightDiscount + this.weekendDiscount);
    }

    buyPizzaSlice() {
        this.calculateTotalAmount();

        return `Price after discount is ${this.totalAmount} and you have ${this.bonus} bonuses`;
    }
}

const getDiscount = (storeInstance) => {
    let date = new Date(),
        hour = date.getHours(),
        day = date.getDay();

    if (hour === 23 || hour < 6) {
        storeInstance.nightDiscount = 0.03;
    }
    if (day === 0 || day === 6) {
        storeInstance.weekendDiscount = 0.05;
    }

    return storeInstance;
};

const setBonus = (storeInstance) => {
    storeInstance.bonus += Math.floor(storeInstance.pizzaSlicePrice / 10);

    return storeInstance;
};

//Implementing
const store = new Store();

console.log(store.buyPizzaSlice());

getDiscount(setBonus(store));
console.log(store.buyPizzaSlice());

getDiscount(setBonus(store));
console.log(store.buyPizzaSlice());