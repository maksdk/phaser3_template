//@ts-check

//> TODO: 
//> 1) Преопределить все типы 
//> 2) PreloadScene 
//> 3) Base classes
//> 4) extensions 
//> 5) PrebuildingMainWindowState
//> 6) идея структуры: 
    //> components - сушности приложения с контролером, моделью, вьюхой
	//> uicontainers - набор общих вьюх 
	

// TODO UserResourses: 1) timers, 2) timers emits


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

window.addEventListener("load", () => {
	const game = Game.create(CONFIG);
	game.init();
	game.run();
});