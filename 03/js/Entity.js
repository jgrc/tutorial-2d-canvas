'use strict'
class Entity {
    #x;
    #y;
    #dx;
    #dy;
    #width;
    #height;
    #color;
    
    constructor(x, y, dx, dy, width, height, color) {
        this.#x = x;
        this.#y = y;
        this.#dx = dx;
        this.#dy = dy;
        this.#width = width;
        this.#height = height;
        this.#color = color;
    }

    get x() {
        return this.#x;
    }

    set x(x) {
        this.#x = x;
    }

    get y() {
        return this.#y;
    }

    set y(y) {
        this.#y = y;
    }

    get dx() {
        return this.#dx;
    }

    set dx(dx) {
        this.#dx = dx;
    }

    get dy() {
        return this.#dy;
    }

    set dy(dy) {
        this.#dy = dy;
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

    move(delta) {
        this.#x += Math.round(delta * this.#dx);
        this.#y += Math.round(delta * this.#dy);
    }
}
