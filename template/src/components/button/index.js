//@ts-check
import Phaser from "phaser";

class View extends Phaser.GameObjects.Container {
    /**
     * @param {Phaser.Scene} scene 
     */
    constructor(scene) {
        super(scene);
    }

    run() {
        const graph = new Phaser.GameObjects.Rectangle(this.scene, 0, 0, 200, 200, 0xFFFF00);
        this.add(graph);
    }
}

export default class Button {
    constructor(game) {
        this.game = game;
        this.layout = game.currentLayout;
        this.scene = game.currentScene;

        this.view = null;
    }

    init() {
        this.view = new View(this.scene);
        this.layout.add(this.view);
    }

    run() {
        this.view.run();
    }
}