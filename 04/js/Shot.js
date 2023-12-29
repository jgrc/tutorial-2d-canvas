'use strict'
class Shot extends Entity {
    constructor(x, y) {
        super(x, y, 0, -400, 2, 5, 'yellow');
    }

    get isAlive() {
        return super.isAlive && this.y > 0;
    }
}
