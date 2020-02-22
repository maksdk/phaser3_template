//@ts-check

//> TODO: 
//> 1) Преопределить все типы 
//> 2) PreloadScene 
//> 3) Base classes
//> 4) extensions 

import Game from "./Game.js";

const CONFIG = {
    width: 1366,
    height: 768,
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    debuggerMode: true,
    backgroundColor: 0x000000
};

const game = Game.create(CONFIG);
game.init();
game.run();