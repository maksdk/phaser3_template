//@ts-check
import BaseGame from "./libs/BaseGame";

import Store from "./store/Store";
import Network from "./network/index";
import FSM from "./fsm/index";

import * as Components from "./components/index";
import * as Scenes from "./scenes/index";

export default class Game extends BaseGame {
    constructor(config) {
        super(config);

        this.components = new Map();

        this.store = null;
        this.fsm = null;
        this.network = null;
        this.currentLayout = null;
        this.currentScene = null;

        this.debuggerMode = true;
    }

    init() {
		// register components 
        this.components = Object.entries(Components)
            .reduce((acc, [ name, component ]) => {
                if (acc.has(name)) {
                    throw new Error("Such component: ${name} already is registered!");
                }
                acc.set(name, component);
                return acc;
            }, new Map());

		// add scenes 
		Object.entries(Scenes).forEach(([name, scene]) => {
			this.scene.add(name, scene);
		});
		
		// init store
        this.store = new Store();
        this.store.init();
		
		// init fsm
		this.fsm = new FSM(this);
        this.fsm.init();
        
        this.network = Network;
    }

    run() {
        this.fsm.run();
        
        if (this.debuggerMode) {
            window.Game = this;
        }
    }

    createComponent(name) {
        if (!this.components.has(name)) {
            throw new Error(`Such component: ${name} is not registered!`);
        }
        
        const Component = this.components.get(name);
        
        return new Component({ 
            store: this.store,
            scene: this.currentScene,
            layout: this.currentLayout 
        });
    }

    resize() {
        const gw = this.currentScene.sys.renderer.width;
        const gh = this.currentScene.sys.renderer.height;
        
        this.currentLayout.setPosition(gw * 0.5, gh * 0.5);
    }

    static create(config) {
        const game = new Game(config);
        return game;
    }
}