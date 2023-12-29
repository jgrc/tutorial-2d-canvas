'use strict'
class Game {
    #renderer;
    #player;
    #aliens;
    #keyboard;
    #deltaTime;

    constructor(id) {
        this.#renderer = new Render2D(id, 800, 600, 'black');
        this.#keyboard = new Keyboard();
        this.#deltaTime = new DeltaTime();
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
        this.#deltaTime.reset();
        this.#loop();
    }

    #loop() {
        this.#gameLogic();
        this.#update();
        this.#render();
        window.requestAnimationFrame(() => this.#loop());
    }

    #gameLogic() {
        this.#alienLogic();
        this.#playerLogic();
    }

    #alienLogic() {
        if (this.#aliens.filter(alien => alien.isNearTheSide).length > 0) {
            this.#aliens.forEach(alien => alien.changeDirection());
        }
    }

    #playerLogic() {
        this.#player.stop();
        if (this.#keyboard.is(Keyboard.Key.LEFT)) {
            this.#player.toLeft();
        }
        if (this.#keyboard.is(Keyboard.Key.RIGHT)) {
            this.#player.toRight();
        }
    }

    #update() {
        let delta = this.#deltaTime.tick(0.1);
        this.#aliens.forEach(alien => alien.move(delta));
        this.#player.move(delta);
    }

    #render() {
        this.#renderer.clear();
        this.#renderer.drawEntity(this.#player);
        this.#aliens.forEach(alien => this.#renderer.drawEntity(alien));
    }

}
