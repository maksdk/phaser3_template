//@ts-check
import Phaser from "phaser";

/**
 * @typedef {BaseGame} GameInterface
 * @class
 * @extends Phaser.Game
 */
export default class BaseGame extends Phaser.Game {
    constructor(config) {
        super(config);

        /**
         * @type {import("./BaseStore").StoreInterface}
         */
        this.store = null;

		/**
		 * @type {Map}
		 */
        this.components = new Map();

		/**
		 * @type {import("./BaseFSM").FSMInterface}
		 */
        this.fsm = null;

        /**
         * @type {import("./BaseLayout").LayoutInterface}
         */
        this.currentLayout = null;

        /**
         * @type {Phaser.Scene}
         */
        this.currentScene = null;
    }
    /**
     * @param {string} name 
     * @returns {import('./BaseComponent').ComponentInterface}
     */
    createComponent(name) {
        return null;
    }
    init() { }
    run() { }
    resize() {}
}