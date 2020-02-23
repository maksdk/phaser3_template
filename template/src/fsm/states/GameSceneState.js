//@ts-check
import { BaseState, MainWindowState } from "./index";
import GameLayout from "../../viewContainers/GameLayout";

export default class GameSceneState extends BaseState {
    onEnter() {
        this.fsm.game.scene.start("GameScene", { onCreate: (arg) => this.onCreateScene(arg) });
    }

	/**
	 * @param {import("../../libs/BaseScene").SceneInterface} scene 
	 */
    onCreateScene(scene) {
        const gameLayout = new GameLayout(scene);
        scene.add.existing(gameLayout);

        this.fsm.game.currentLayout = gameLayout;
        this.fsm.game.currentScene = scene;
        this.fsm.game.resize();
        
        this.fsm.setState(MainWindowState.name);
    }
}