//@ts-check
import Phaser from "phaser";

export default class GameScene extends Phaser.Scene {
    constructor() {
        super("GameScene");

        this.callbacks = {
            onCreate: null,
            onPreload: null,
            onInit: null
        };
    }

    /**
     * @param {Object} params 
     * @param {Function} [params.onCreate] 
     * @param {Function} [params.onPreload ]
     * @param {Function} [params.onInit ]
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