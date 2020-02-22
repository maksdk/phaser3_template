//@ts-check
export default class BaseState {
    constructor(fsm) {
        this.fsm = fsm;
    }
    static get id() {return "BaseState";}
    onEnter() {}
    onExit() {}
}