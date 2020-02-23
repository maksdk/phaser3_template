//@ts-check
import BaseStore from "../libs/BaseStore";
import GeneralStore from "./GeneralStore";
import * as SubStores from "./subStores/index";

export default class Store extends BaseStore {
    init() {
        this.general = new GeneralStore({});

        this.subStores = Object.entries(SubStores)
            .reduce((acc, [name, SubStore]) => {
                if (acc.has(name)) {
                    throw new Error(`Such SubStore name: ${name} already is registered!`);
                }

                acc.set(name, new SubStore(this));

                return acc;
            }, new Map());
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