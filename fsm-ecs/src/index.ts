import { Game } from '@game/Game';

const config = {
    backgroundColor: 0x010d21,
    width: window.innerWidth,
    height: window.innerHeight
};

const game = new Game(config);
game.start();
