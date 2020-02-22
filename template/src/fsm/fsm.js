//@ts-check
import * as States from "./states/index";

export default class FSM {
    constructor(game) {
        this.game = game;
        this.states = Object.values(States);
        this.state = null;
    }

    setState(stateId) {
        if (this.state) {
            this.state.onExit();
        }

        const ClassState = this.states.find(state => state.id === stateId);
        if (!ClassState) {
            throw new Error(`Such state id: ${stateId} is not found!`);
        }

        this.state = new ClassState(this);
        this.state.onEnter();
    }

    init() {
        this.setState(States.BaseState.id);
    }
    
    run() {
        this.setState(States.GameSceneState.id);
    }
}