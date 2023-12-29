'use strict'
class Player extends Entity {
    #velocity;
    #eventDispatcher;
    #shotDelay;
    #deltaTime;
    #shotSprite;

    constructor(x, y, sprite, shotSprite, eventDispatcher) {
        super(x, y, 0, 0, 40, 25, sprite);
        this.#velocity = 120;
        this.#eventDispatcher = eventDispatcher;
        this.#shotDelay = 1;
        this.#deltaTime = new DeltaTime();
        this.#shotSprite = shotSprite;
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

    shot() {
        if (this.#deltaTime.isElapsed(this.#shotDelay)) {
            this.#deltaTime.reset();
            this.#eventDispatcher.add(EventDispatcher.Event.PLAYER_SHOT);
            return new Shot(Math.round(this.x + this.width / 2), this.y, this.#shotSprite)
        }

        return null;
    }

    kill() {
        super.kill();
        this.#eventDispatcher.add(EventDispatcher.Event.PLAYER_KILLED);
    }
}
