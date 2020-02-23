//@ts-check
import { BaseState } from "./index";

export default class MainWindowState extends BaseState {
    onEnter() {
        const userResourses = this.fsm.game.createComponent("UserResourses");
    
        userResourses.init();
        userResourses.run();
    }
}