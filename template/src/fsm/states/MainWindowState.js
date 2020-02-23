//@ts-check
import { BaseState } from "./index";

export default class MainWindowState extends BaseState {
    onEnter() {
        const userWallet = this.fsm.game.createComponent("UserWallet");
        userWallet.init();
        userWallet.run();
    }
}