'use strict'
class Player extends Entity {
    #velocity;

    constructor(x, y) {
        super(x, y, 0, 0, 40, 25, 'green');
        this.#velocity = 120;
    }

    stop() {
        this.dx = 0;
    }

    toRight() {
        if (this.x < 790 - this.width) {
            this.dx = this.#velocity;
        }
    }

    toLeft() {
        if (this.x > 10) {
            this.dx = -this.#velocity;
        }
    }
}
