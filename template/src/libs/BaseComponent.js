//@ts-check

/**
 * @typedef {BaseComponent} ComponentInterface
 * @class
 */
export default class BaseComponent {
    /**
     * @param {Object} config 
     * @param {import('./BaseScene').SceneInterface} config.scene 
     * @param {import('./BaseLayout').LayoutInterface} config.layout
     * @param {import('./BaseStore').StoreInterface} config.store
     */
    constructor(config) {

        const { scene, layout, store } = config;

        /**
         * @type {import('../store/Store').StoreType}
         */
        this.store = store;

        /**
         * @type {import('./BaseLayout').LayoutInterface}
         */
        this.layout = layout;

        /**
         * @type {import('./BaseScene').SceneInterface}
         */
        this.scene = scene;

        /**
         * @type {import('./BaseView').BaseViewInterface}
         */
        this.view = null;
    }

    init() {}
    run() {}
}