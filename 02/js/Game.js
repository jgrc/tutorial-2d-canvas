'use strict'
class Game {
    #renderer;
    #player;
    #aliens;

    constructor(canvasId) {
        this.#renderer = new Render2D(canvasId, 800, 600, 'black');
        this.#init();
    }

    #init() {
        this.#player = new Player(370, 550);
        this.#aliens = [];
        for (let row = 0; row < 5; row++) {
            for (let column = 0; column < 12; column++) {
                this.#aliens.push(
                    new Alien(100 + column * 50, 50 + row * 30)
                );
            }
        }
        this.#render();
    }

    #render() {
        this.#renderer.clear();
        this.#renderer.drawEntity(this.#player);
        this.#aliens.forEach(alien => this.#renderer.drawEntity(alien));
    }
}
