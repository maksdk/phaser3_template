//@ts-check

/**
 * @typedef {BaseState} StateInterface
 * @class
 */
export default class BaseState {
	/**
	 * @param {import("./BaseFSM").FSMInterface} fsm 
	 */
    constructor(fsm) {
		this.fsm = fsm;
    }
    onEnter() {}
    onExit() {}
}