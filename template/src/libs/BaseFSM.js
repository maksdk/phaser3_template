//@ts-check

/**
 * @typedef {BaseFSM} FSMInterface
 * @class
 */
export default class BaseFSM {
    constructor(game) {
		/**
		 * @type {import("./BaseGame").GameInterface}
		 */
		this.game = game;
		
		/**
		 * @type {Map}
		 */
		this.states = new Map();
		
		/**
		 * @type {import("./BaseState").StateInterface  | null}
		 */
        this.state = null;
    }

	/**
	 * @param {string} stateName - уникальное имя стейта
	 */
    setState(stateName) { }

	init() {}
	
    run() {}
}

