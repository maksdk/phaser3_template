//@ts-check
import { BaseState } from "./index";

export default class ErrorWindowState extends BaseState {
    onEnter() {
		const { game } = this.fsm;
		const loading = game.createComponent("ErrorWindow");
		loading.run();
    }
}