//@ts-check
import BaseFSM from "../libs/BaseFSM";
import * as States from "./states/index";

export default class FSM extends BaseFSM {
	init() {
		this.states = Object.entries(States)
            .reduce((acc, [ name, component ]) => {
                if (acc.has(name)) {
                    throw new Error(`Such component: ${name} already is registered!`);
                }
                acc.set(name, component);
                return acc;
			}, new Map());
		
        this.setState(States.BaseState.name);
	}

    run() {
        this.setState(States.PreloadSceneState.name);
	}
	
	setState(stateName) {
        if (this.state) {
            this.state.onExit();
		}
		
		if (!this.states.has(stateName)) {
			throw new Error(`Such state: ${stateName} is not found!`);
		}

        const ClassState = this.states.get(stateName);

        this.state = new ClassState(this);
        this.state.onEnter();
    }
}

