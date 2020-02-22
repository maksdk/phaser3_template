//@ts-check
import Phaser from "phaser";

/**
 * @typedef {BaseScene} SceneInterface
 * @class
 * @extends Phaser.Scene
 */
export default class BaseScene extends Phaser.Scene {
	/**
	 * @param {string} name 
	 */
    constructor(name) {
        super(name);

		/**
		 * @typedef {Object} SceneCallbacks
		 */
        this.callbacks = {
			/**
			 * @type {Function | null}
			 */
			onCreate: null,

			/**
			 * @type {Function | null}
			 */
			onPreload: null,

			/**
			 * @type {Function | null}
			 */
            onInit: null
        };
    }

    /**
     * @param {Object} params 
     * @param {Function} [params.onCreate] 
     * @param {Function} [params.onPreload]
     * @param {Function} [params.onInit]
     */
    init(params) {
        const { onCreate, onPreload, onInit } = params;

        this.callbacks.onCreate = onCreate;
        this.callbacks.onPreload = onPreload;
        this.callbacks.onInit = onInit;

        if (this.callbacks.onInit) {
            this.callbacks.onInit(this);
        }
    }

    preload() {
        if (this.callbacks.onPreload) {
            this.callbacks.onPreload(this);
        }
    }

    create() {
        if (this.callbacks.onCreate) {
            this.callbacks.onCreate(this);
        }
    }
}