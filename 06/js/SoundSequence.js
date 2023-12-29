'use strict'
class SoundSequence {
    #sounds;
    #initialDelay;
    #delay;
    #deltaTime;
    #currentIndex;

    constructor(sounds, delay) {
        this.#sounds = sounds;
        this.#initialDelay = delay;
        this.#deltaTime = new DeltaTime();
        this.#reset();
    }

    play() {
        if (this.#deltaTime.isElapsed(this.#delay)) {
            this.#deltaTime.reset();
            this.#sounds[this.#currentIndex].play();
            this.#currentIndex = (this.#currentIndex + 1) % this.#sounds.length;
        }
    }

    decreaseDelay(quantity) {
        this.#delay = Math.max(0.1, this.#delay - quantity);
    }

    stop() {
        this.#sounds.forEach(sound => sound.stop());
        this.#reset();
    }

    #reset() {
        this.#delay = this.#initialDelay;
        this.#currentIndex = 0;
    }
}
