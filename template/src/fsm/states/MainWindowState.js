//@ts-check
import { BaseState } from "./index";

export default class MainWindowState extends BaseState {
    onEnter() {
        const ButtonComponent = this.fsm.game.components.get("Button");
        
        const buttonComponent = new ButtonComponent(this.fsm.game);
        buttonComponent.init();
        buttonComponent.run();
    }
}