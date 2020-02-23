//@ts-check
import GeneralStore from "./GeneralStore";
import UserTaskSubStore from "./UserTaskSubStore";

const subStores = { UserTaskSubStore };

/**
 * @typedef {Store} StoreInterface
 */
export default class Store {
    constructor() {
        /**
         * @type {Map}
         */
        this.subStores = new Map();

        /**
         * @type {import("./GeneralStore").GeneralStoreInterface}
         */
        this.general = null;
    }
    
    init() {
        this.general = new GeneralStore({});

        this.subStores = Object.entries(subStores)
            .reduce((acc, [name, SubStore]) => {
                if (acc.has(name)) {
                    throw new Error(`Such SubStore name: ${name} already is registered!`);
                }

                acc.set(name, new SubStore(this));

                return acc;
            }, new Map());
    }

    setData(data) {
        
    }

    addGetter(name, getterFunction) {
        if (name in this) {
            throw new Error(`Such getter name: ${name} is already registered!`);
        }

        Object.defineProperty(this, name, {
            get: getterFunction,
            enumerable: false,
        });
    }
}