//@ts-check
import { BaseState } from "./index";

export default class MainWindowState extends BaseState {
    onEnter() {
        const userWallet = this.fsm.game.createComponent("UserWallet");
        userWallet.init();
        userWallet.run();

        const startMissionButton = this.fsm.game.createComponent("StartMissionButton");
        startMissionButton.run();
        startMissionButton.once('click', this.startMission, this);
    }

    startMission(e) {
        
    }
}