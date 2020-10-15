import { Game } from '@game/Game';

const config = {
    autoDensity: true,
    backgroundColor: 0x010d21,
    width: 900,
    height: 900,
    container: document.body
};

const game = new Game(config);
game.start();
