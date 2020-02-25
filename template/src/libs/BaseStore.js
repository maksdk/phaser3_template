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
    }
    
    init() {}
    addGetter(name, getterFunction) {}
    setData(data) {}
}