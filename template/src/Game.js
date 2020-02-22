//@ts-check
// import Phaser from "phaser";
import BaseGame from "./libs/BaseGame";
import FSM from "./fsm/index";
import * as Components from "./components/index";
import { GameScene } from "./scenes/index";

export default class Game extends BaseGame {
    constructor(config) {
        super(config);
    }

    static create(config) {
        const game = new Game(config);
        return game;
    }

    init() {
        this.components = Object.entries(Components)
            .reduce((acc, [ name, component ]) => {
                if (acc.has(name)) {
                    throw new Error("Such component: ${name} already is registered!");
                }
                acc.set(name, component);
                return acc;
            }, new Map());

		this.scene.add("GameScene", GameScene);
		
		this.fsm = new FSM(this);
		this.fsm.init();
    }

    run() {
		this.fsm.run();
    }

    resize() {
        const gw = this.currentScene.sys.renderer.width;
        const gh = this.currentScene.sys.renderer.height;
        
        this.currentLayout.setPosition(gw * 0.5, gh * 0.5);
    }
}