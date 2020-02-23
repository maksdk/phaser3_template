//@ts-check
/**
 * @typedef {BaseSubStore} SubStoreInterface
 */
export default class BaseSubStore {
    /**
     * @param {import("./BaseStore").StoreInterface} store 
     */
    constructor(store) {
        /**
         * @type {import("./BaseStore").StoreInterface}
         */
        this.store = store;

        /**
         * @type {Array}
         */
        this.gettersNames = [];
    }

    initGetters() {
        this.gettersNames.forEach(name => {
            this.store.addGetter(name, () => this[name]);
        });
    }
}