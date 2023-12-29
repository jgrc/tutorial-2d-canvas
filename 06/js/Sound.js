'use strict'
class Sound {
    #audio;

    constructor(src) {
        this.#audio = new Audio();
        this.#audio.src = src;
    }

    play() {
        this.#audio.play();
    }

    stop() {
        this.#audio.pause();
        this.#audio.currentTime = 0;
    }
}
