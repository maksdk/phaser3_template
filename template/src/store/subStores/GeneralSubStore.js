//@ts-check
import BaseSubStore from "../../libs/BaseSubStore";


/**
 * @typedef {GeneralSubStore} GeneralStoreInterface
 * @typedef {Object} StaticServerData
 */

export default class GeneralSubStore extends BaseSubStore{
    constructor(store) {
        super(store);
        this.data = {};
    }

    /**
     * @param {object} data 
     * @param {object} [data.general] 
     */
    setData(data) {
        if (!data || !data.general) return;

        const { general } = data;
        this.data = general;
    }
}