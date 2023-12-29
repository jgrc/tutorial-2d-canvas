'use strict'
class Alien extends Entity {
    constructor(x, y) {
        super(x, y, 75, 0, 40, 25, 'white');
    }

    get isNearTheSide() {
        return this.dx < 0 && this.x < 10 || this.dx > 0 && this.x > 790 - this.width;
    }

    changeDirection() {
        this.dx *= -1;
        this.y += 10;
    }
}
