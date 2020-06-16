//@ts-check
import EventEmitter from "eventemitter3";

/**
 * @typedef {BaseComponent} ComponentInterface
 * @class
 * @extends { EventEmitter }
 */
export default class BaseComponent extends EventEmitter {
    /**
     * @param {Object} config 
     * @param {import('./BaseScene').SceneInterface} config.scene 
     * @param {import('./BaseLayout').LayoutInterface} config.stage
     * @param {import('./BaseStore').StoreInterface} config.store
     */
    constructor(config) {
        super();
        
        const { scene, stage, store } = config;

        /**
         * @type {import('../store/Store').StoreType}
         */
        this.store = store;

        /**
         * @type {import('./BaseLayout').LayoutInterface}
         */
        this.stage = stage;

        /**
         * @type {import('./BaseScene').SceneInterface}
         */
        this.scene = scene;

        /**
         * @type {import('./BaseView').BaseViewInterface}
         */
        this.view = null;
    }

    init(cb) {
        cb && cb();
    }

    run() {
        
    }

    destroy(cb) {
        if (this.view) this.view.destroy();
        cb && cb();
    }

    setPosition(...arg) {
        if (arg.length === 0) {
            throw new Error("You must pass positions!");
        } 

        let x = arg[0];
        let y = arg[1];

        if (arg.length === 1) {
            x = arg[0];
            y = arg[0];
        } 

        if (this.view) this.view.setPosition(x, y);
    }
}