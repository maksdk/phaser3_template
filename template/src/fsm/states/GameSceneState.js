//@ts-check
import { BaseState, MainWindowState } from "./index";

export default class GameSceneState extends BaseState {
    onEnter() {
        this.fsm.game.scene.start("GameScene", { onCreate: (arg) => this.onCreateScene(arg) });
    }

    onCreateScene(scene) {
        const GameLayout = this.fsm.game.components.get("GameLayout");
        const gameLayout = new GameLayout(scene);
        scene.add.existing(gameLayout);

        this.fsm.game.currentLayout = gameLayout;
        this.fsm.game.currentScene = scene;
        this.fsm.game.resize();
        
        this.fsm.setState(MainWindowState.name);
    }
}