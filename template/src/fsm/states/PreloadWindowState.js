//@ts-check
import BaseState from "../../libs/BaseState";
import GameLayout from "../../viewContainers/GameLayout";

export default class PreloadSceneState extends BaseState {
	async onEnter() {
		
		await this.loadInitAssets({ 
			fonts: [
				{ name: "Beathy-Demo-Version", src: "assets/fonts/Beathy-Demo-Version.ttf" },
				{ name: "Juice", src: "assets/fonts/Juice.ttf" }
			], 
			images: [{ name: "loading", src:"assets/images/loading.png" }]
		});

		this.loadingWindow = this.fsm.game.createComponent("PreloadWindow");

		const promises = [
			this.loadGameData(),
			this.loadGameAssets({images: [{ name: "smile", src:"assets/images/smile.png" }]})
		];

		Promise.all(promises)
			.then(responses => {
				const [ data ] = responses;

				const { error } = data;
				if (error) {
					this.fsm.setState('ErrorWindowState');
					return;
				}

				this.loadingWindow.updateProgress(1);
				
				this.fsm.game.store.setData(data);
				this.fsm.setState('MainWindowState');
			});
	}

	onExit() {
		this.loadingWindow.destroy();
		this.loadingWindow = null;
	}

	loadInitAssets(assets={}) {
		const { fonts=[], images=[] } = assets;

		const FontLoader = this.fsm.game.loaders.get("FontLoader");
		const AssetsLoader = this.fsm.game.loaders.get("AssetsLoader");

		const fontLoader = new FontLoader(fonts);
		const assetstLoader = new AssetsLoader(this.fsm.game.scene, { images });
		
		return Promise.all([
			fontLoader.load(),
			assetstLoader.load()
		]);
	}

	loadGameAssets(assets) {
		const { images=[] } = assets;
		const AssetsLoader = this.fsm.game.loaders.get("AssetsLoader");
		const loader = new AssetsLoader(this.fsm.game.scene, { images });

		const promise = loader.load();

		loader.on("progress", (persent) => {
			this.loadingWindow.updateProgress(persent * 0.75);
		});

		promise.then(() => {
			loader.removeAllListeners();
			this.loadingWindow.updateProgress(0.75);
		});

		return promise;
	}

	loadGameData() {
		return this.fsm.game.network.loadInitData();
	}
}