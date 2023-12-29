'use strict'
class Entity {
    #x;
    #y;
    #width;
    #height;
    #color;
    
    constructor(x, y, width, height, color) {
        this.#x = x;
        this.#y = y;
        this.#width = width;
        this.#height = height;
        this.#color = color;
    }

    get x() {
        return this.#x;
    }

    get y() {
        return this.#y;
    }

    get width() {
        return this.#width;
    }

    get height() {
        return this.#height;
    }

    get color() {
        return this.#color;
    }
}
