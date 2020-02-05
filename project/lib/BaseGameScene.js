//@ts-check
import Phaser from "phaser";

export default class BaseGameScene extends Phaser.Scene {
    /**
     * @param {Phaser.Types.Scenes.SettingsConfig | String} options 
     */
    constructor(options) {
        super(options);
        this._callbacks = {
            onInitCb: null,
            onPreloadCb: null,
            onPreloadCompleteCb: null,
            onCreateCb: null
        };
        this._app = null;
    }

    /**
     * @param {Object} config 
     * @param {Function} config.app - Main application Class  
     * @param {Function} [config.onInitCb] 
     * @param {Function} [config.onPreloadCb] 
     * @param {Function} [config.onPreloadCompleteCb] 
     * @param {Function} [config.onCreateCb]
     */
    init(config) {
        const { onInitCb=null, onPreloadCb=null, onPreloadCompleteCb=null, onCreateCb=null, app } = config;
        
        this.app = app;
        
        this.callbacks = {
            onInitCb,
            onPreloadCb,
            onPreloadCompleteCb,
            onCreateCb
        };

        // call init cb here
        if (this.callbacks.onInitCb) {
            this.callbacks.onInitCb();
            this.callbacks.onInitCb = null;
        }
    }

    preload() {
        // call preload cb here
        if (this.callbacks.onPreloadCb) {
            this.callbacks.onPreloadCb();
            this.callbacks.onPreloadCb = null;
        }

        this.load.on("complete", () => {
            // call preload complete cb here
            if (this.callbacks.onPreloadCompleteCb) {
                this.callbacks.onPreloadCompleteCb();
                this.callbacks.onPreloadCompleteCb = null;
            }
        });
    } 

    create() {
        // call create cb here
        if (this.callbacks.onCreateCb) {
            this.callbacks.onCreateCb();
            this.callbacks.onCreateCb = null;
        }
    }

    get app() {
        return this._app;
    }

    set app(app) {
        if (!app) {
            throw new Error("You must to pass the Application to your each game scene");
        }
        this._app = app;
    }

    get callbacks() {
        return this._callbacks;
    }

    set callbacks(cbCollection) {
        if (typeof cbCollection !== 'object' || Array.isArray(cbCollection)) {
            throw new Error("You must to pass the collection of callbacks");
        }
        this._callbacks = cbCollection;;
    }
} 