'use strict'
class SoundStore {
    #sounds;

    constructor() {
        this.#sounds = {};
    }

    get(src) {
        let sound = this.#sounds[src];
		if (!sound) {
            sound = new Sound(src);
            this.#sounds[src] = sound;
        }
		
		return sound;
    }
}
