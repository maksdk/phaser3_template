//@ts-check
import BaseSubStore from "../../libs/BaseSubStore";

export default class MissionSubStore extends BaseSubStore {
    constructor(store) {
        super(store);

    }

    /**
     * @param {Object} data 
     * @param {Object} data.userMission 
     */
    setData(data) {
        if (!data || !data.userMission) return;

        const { userMission } = data;
        console.log(userMission);
    }
}