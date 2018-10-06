class Character {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.health_ = 100;
    }
    damage() {
        this.health_ = this.health_ - 10;
    }
    getHealth() {
        return this.health_;
    }
    toString() {
        return `x: ${this.x} y: ${this.y} health: ${this.getHealth()}`;
    }
}

let x = process.argv[2];
let y = process.argv[3];
let character = new Character(Number(x), Number(y));
character.damage();
console.log(character.toString());