//@ts-check
import BaseState from "../../libs/BaseState";
import GameLayout from "../../viewContainers/GameLayout";

export default class PreloadSceneState extends BaseState {
	onEnter() {
		this.fsm.game.scene.start("PreloadScene", { onCreate: (arg) => this.onCreateScene(arg) });	
	}

	async onCreateScene(scene) {
		const gameLayout = new GameLayout(scene);
        scene.add.existing(gameLayout);

        this.fsm.game.currentLayout = gameLayout;
        this.fsm.game.currentScene = scene;
        this.fsm.game.resize();
        
		const { game } = this.fsm;

		const loading = game.createComponent("PreloadScene");
		loading.run();

		const result = await game.network.loadInitData();
		console.log(result);
	}
}