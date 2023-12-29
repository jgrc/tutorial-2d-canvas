'use strict'
class Sprite {
    #images;
    #timeBetweenTransitions;
    #currentIndex;
    #deltaTime;

    constructor(images, timeBetweenTransitions) {
        this.#images = images;
        this.#timeBetweenTransitions = timeBetweenTransitions;
        this.#currentIndex = 0;
        this.#deltaTime = new DeltaTime();
    }

    get image() {
        if (this.#images.length === 1) {
            return this.#images[0];
        }
        if (this.#deltaTime.isElapsed(this.#timeBetweenTransitions)) {
            this.#deltaTime.reset();
            this.#currentIndex = (this.#currentIndex + 1) % this.#images.length;
        }

        return this.#images[this.#currentIndex];
    }
}
