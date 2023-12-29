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

    gui(score, lives) {
        this.#ctx.fillStyle = "white";
        this.#ctx.font = "bold 20px monospace";
        this.#ctx.fillText(score + " Score", 20, 30);
        this.#ctx.fillText(lives + " Lives", this.#canvas.width - 110, 30);
    }

    menu(title, subtitle) {
        this.#ctx.fillStyle = "red";
        this.#ctx.font = "bold 30px monospace";
        let titleWidth = this.#ctx.measureText(title).width;
        this.#ctx.fillText(
            title,
            (this.#canvas.width - titleWidth) / 2,
            this.#canvas.height / 2 - 30,
        );

        this.#ctx.font = "bold 20px monospace";
        let subtitleWidth = this.#ctx.measureText(subtitle).width;
        this.#ctx.fillText(
            subtitle,
            (this.#canvas.width - subtitleWidth) / 2,
            this.#canvas.height / 2 + 5,
        );
    }
}
