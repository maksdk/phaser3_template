//@ts-check

/**
 * @typedef {GeneralStore} GeneralStoreInterface
 * @typedef {Object} StaticServerData
 */

export default class GeneralStore {
    /**
     * @param {StaticServerData} data 
     */
    constructor(data) {
        this.data = data;
    }
}