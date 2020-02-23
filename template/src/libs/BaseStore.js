//@ts-check
import  EventEmitter from "eventemitter3";
/**
 * @typedef {BaseStore} StoreInterface
 * @class
 * @extends {EventEmitter}
 */
export default class BaseStore extends EventEmitter {
    constructor() {
        super();

        /**
         * @type {Map}
         */
        this.subStores = new Map();

        /**
         * @type {import("../store/GeneralStore").GeneralStoreInterface}
         */
        this.general = null;
    }
    
    init() {}
    addGetter(name, getterFunction) {}
}