'use strict'
class Shot extends Entity {
    constructor(x, y, sprite) {
        super(x, y, 0, -400, 4, 10, sprite);
    }

    get isAlive() {
        return super.isAlive && this.y > 0;
    }
}
