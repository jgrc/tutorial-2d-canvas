'use strict'
class Game {
    #renderer;
    #player;
    #aliens;
    #shots;
    #explosions;
    #keyboard;
    #deltaTime;
    #eventDispatcher;
    #score;
    #lives;
    #status;
    #imageStore;

    constructor(id) {
        this.#renderer = new Render2D(id, 800, 600, 'black');
        this.#keyboard = new Keyboard();
        this.#deltaTime = new DeltaTime();
        this.#eventDispatcher = new EventDispatcher();
        this.#imageStore = new ImageStore();
        this.#init();
    }

    #init() {
        this.#restart();
        this.#loop();
    }

    #restart() {
        this.#score = 0;
        this.#lives = 2;
        this.#reload();
    }

    #reload() {
        this.#player = new Player(
            370,
            550,
            new Sprite([this.#imageStore.get("img/player.jpg")]),
            new Sprite(
                [
                    this.#imageStore.get("img/shota.jpg"),
                    this.#imageStore.get("img/shotb.jpg")
                ],
                0.1
            ),
            this.#eventDispatcher
            );
        this.#shots = [];
        this.#aliens = [];
        for (let row = 0; row < 5; row++) {
            for (let column = 0; column < 12; column++) {
                let alienSprite;
                switch(row) {
                    case 0:
                        alienSprite = new Sprite(
                            [
                                this.#imageStore.get("img/alien1a.jpg"),
                                this.#imageStore.get("img/alien1b.jpg")
                            ],
                            0.2
                        );
                        break;
                    case 1:
                    case 2:
                        alienSprite = new Sprite(
                            [
                                this.#imageStore.get("img/alien2a.jpg"),
                                this.#imageStore.get("img/alien2b.jpg")
                            ],
                            0.25
                        );
                        break;
                    default:
                        alienSprite = new Sprite(
                            [
                                this.#imageStore.get("img/alien3a.jpg"),
                                this.#imageStore.get("img/alien3b.jpg")
                            ],
                            0.3
                        );
                }
                this.#aliens.push(new Alien(100 + column * 50,50 + row * 30, alienSprite,this.#eventDispatcher));
            }
        }
        this.#explosions = [];
        this.#status = Game.Status.RUNNING;
    }

    #loop() {
        switch(this.#status) {
            case Game.Status.RUNNING:
                this.#gameLogic();
                break;
            case Game.Status.WIN:
                this.#winLogic();
                break;
            case Game.Status.CONTINUE:
                this.#continueLogic();
                break;
            case Game.Status.GAME_OVER:
                this.#gameoverLogic();
        }
        this.#render();
        window.requestAnimationFrame(() => this.#loop());
    }

    #gameLogic() {
        this.#shotsLogic();
        this.#alienLogic();
        this.#playerLogic();
        this.#explosionLogic();
        this.#update();
        this.#applyEvents();
    }

    #shotsLogic() {
        this.#shots.forEach(shot => this.#aliens.forEach(alien => alien.inCollisionWith(shot)));
        this.#shots = this.#shots.filter(shot => shot.isAlive);
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
        if (this.#keyboard.is(Keyboard.Key.SPACE)) {
            let shot = this.#player.shot();
            if (shot) {
                this.#shots.push(shot);
            }
        }
        this.#aliens.forEach(alien => alien.inCollisionWith(this.#player));
    }

    #explosionLogic() {
        this.#explosions = this.#explosions.filter(explosion => explosion.isAlive);
    }

    #update() {
        let delta = this.#deltaTime.tick(0.1);
        this.#aliens.forEach(alien => alien.move(delta));
        this.#player.move(delta);
        this.#shots.forEach(shot => shot.move(delta));
        this.#explosions.forEach(explosion => explosion.move(delta));
    }

    #winLogic() {
        if (this.#keyboard.is(Keyboard.Key.ENTER)) {
            this.#reload();
        }
    }

    #continueLogic() {
        if (this.#keyboard.is(Keyboard.Key.ENTER)) {
            this.#reload();
        }
    }

    #gameoverLogic() {
        if (this.#keyboard.is(Keyboard.Key.ENTER)) {
            this.#restart();
        }
    }

    #render() {
        this.#renderer.clear();
        this.#renderer.drawEntity(this.#player);
        this.#explosions.forEach(explosion => this.#renderer.drawEntity(explosion));
        this.#aliens.forEach(alien => this.#renderer.drawEntity(alien));
        this.#shots.forEach(shot => this.#renderer.drawEntity(shot));
        this.#renderer.gui(this.#score, this.#lives);
        switch(this.#status) {
            case Game.Status.CONTINUE:
                this.#renderer.menu('You are death, but you have more lives.', 'Press <ENTER> to continue the game...');
                break;
            case Game.Status.GAME_OVER:
                this.#renderer.menu('Game over!', 'Press <ENTER> to start a new game...');
                break;
            case Game.Status.WIN:
                this.#renderer.menu('Congratulations! You defeated the invasion!', 'Press <ENTER> to start new level...');
                break;
        }
    }

    #applyEvents() {
        this.#eventDispatcher.events.forEach(
            event => {
                switch(event) {
                    case EventDispatcher.Event.ALIEN_KILLED:
                        this.#score += 10;
                        let deathAliens = this.#aliens.filter(alien => !alien.isAlive);
                        this.#aliens = this.#aliens.filter(alien => alien.isAlive);
                        if (this.#aliens.length === 0 && this.#player.isAlive) {
                            this.#status = Game.Status.WIN;
                        }
                        deathAliens.forEach(deathAlien => this.#explosions.push(
                            new Explosion(
                                deathAlien.x,
                                deathAlien.y,
                                new Sprite([this.#imageStore.get("img/explosion.jpg")]),
                            )
                        ));
                        break;
                    case EventDispatcher.Event.PLAYER_KILLED:
                        this.#lives--;
                        this.#status = this.#lives > 0 ? Game.Status.CONTINUE : Game.Status.GAME_OVER;
                        break;
                }
            }
        );
    }

    static get Status() {
        return {
            WIN : 'win',
            CONTINUE : 'continue',
            GAME_OVER : 'game_over',
            RUNNING : 'running'
        }
    }
}
