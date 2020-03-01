//@ts-check
// import BaseGame from "./libs/BaseGame";

import Store from "./store/Store";
import Network from "./network/index";
import FSM from "./fsm/index";

import * as Components from "./components/index";
import * as Scenes from "./scenes/index";
import * as Loaders from "./loaders/index";

import GameStage from "./components/GameStage";

export default class Game {
    constructor(config) {
        this.gameConfig = config;

        this.components = new Map();
        this.savedComponents = new Map(); 
        
        this.loaders = new Map();

        this.game = null;
        this.store = null;
        this.fsm = null;
        this.network = null;
        this.stage = null;
        this.scene = null;

        this.debuggerMode = true;
    }

    init(cb) {
		// register components 
        this.components = Object.entries(Components)
            .reduce((acc, [ name, component ]) => {
                if (acc.has(name)) {
                    throw new Error(`Such component: ${name} already is registered!`);
                }
                acc.set(name, component);
                return acc;
            }, new Map());


        // register loaders 
        this.loaders = Object.entries(Loaders)
            .reduce((acc, [ name, loader ]) => {
                if (acc.has(name)) {
                    throw new Error(`Such loader: ${name} already is registered!`);
                }
                acc.set(name, loader);
                return acc;
            }, new Map());


		
		// init store
        this.store = new Store();
        this.store.init();
		
		// init fsm
		this.fsm = new FSM(this);
        this.fsm.init();
        
        this.network = Network;

        // init game
        this.game = new Phaser.Game(this.gameConfig);
		Object.entries(Scenes).forEach(([name, scene]) => {
			this.game.scene.add(name, scene);
		});
        this.createStage("GameScene", cb);
    }

    createStage(sceneName, cb) {   
        const onCreate = (scene) => {
            this.scene = scene;
            this.stage = new GameStage(scene);
            cb && cb();
        };

        this.game.scene.start(sceneName, { onCreate });
    }   

    run() {
        this.scene.add.existing(this.stage);
        this.resize();
       
        this.fsm.run();
        
        if (this.debuggerMode) {
            window.Game = this;
        }
    }

    createComponent(name, options={}) {
        if (!this.components.has(name)) {
            throw new Error(`Such component: "${name}" is not registered!`);
        }
        
        const Component = this.components.get(name);
        const { save=false, ...rest } = options;
        const component =  new Component({ 
            store: this.store,
            scene: this.scene,
            stage: this.stage,
            ...rest
        });

        if (save) {
            this.savedComponents.set(name, component);
        }

        return component;
    }

    destroyComponent(name, cb) {
        if (!this.savedComponents.has(name)) {
            throw new Error(`Such component: "${name}" is not saved!`);
        }

        const component = this.savedComponents.get(name);
        this.savedComponents.delete(name);
        component.destroy(cb);
    }

    resize() {
        const gw = this.scene.sys.renderer.width;
        const gh = this.scene.sys.renderer.height;
        
        this.stage.setPosition(gw * 0.5, gh * 0.5);
    }

    static create(config) {
        const game = new Game(config);
        return game;
    }
}