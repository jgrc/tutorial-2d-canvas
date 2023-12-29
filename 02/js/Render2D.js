'use strict'
class Render2D {
    #canvas;
    #ctx;

    constructor(id, width, height, color) {
        this.#canvas = document.getElementById(id);
        this.#canvas.width = width;
        this.#canvas.height = height;
        this.#canvas.style.backgroundColor = color;
        this.#ctx = this.#canvas.getContext('2d');
    }

    clear() {
        this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
    }

    drawEntity(entity) {
        this.#ctx.fillStyle = entity.color;
        this.#ctx.fillRect(entity.x, entity.y, entity.width, entity.height);
    }
}
