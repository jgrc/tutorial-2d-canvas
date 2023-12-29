'use strict'
class Explosion extends Entity {
    #timeToDissapear;
    #deltaTimer;

    constructor(x, y, sprite) {
        super(x, y, 0, 0, 40, 25, sprite);
        this.#timeToDissapear = 0.1;
        this.#deltaTimer = new DeltaTime();
    }

    move(delta) {
        super.move(delta);
        if (this.#deltaTimer.isElapsed(this.#timeToDissapear)) {
            this.kill();
        }
    }
}
