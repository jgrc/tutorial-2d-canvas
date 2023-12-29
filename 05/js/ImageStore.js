'use strict'
class ImageStore {
    #images;

    constructor() {
        this.#images = {};
    }

    get(src) {
        let img = this.#images[src];
		if (!img) {
            img = new Image();
            img.src = src;
            this.#images[src] = img;
        }
		
		return img;
    }
}
