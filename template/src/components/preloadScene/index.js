//@ts-check
import BaseComponent from "../../libs/BaseComponent";
import BaseView from "../../libs/BaseView";

class PreloadSceneView extends BaseView {
	constructor(scene) {
		super(scene);
		const gw = this.scene.sys.renderer.width;
		const gh = this.scene.sys.renderer.height;
		
		const shadow = new Phaser.GameObjects.Rectangle(this.scene, 0, 0, gw, gh, 0x000000, 0.8);
		shadow.setOrigin(0.5);
		this.add(shadow);

		const title = new Phaser.GameObjects.Text(this.scene, 0, 0, 'Loading...', { color:"#ffffff", fontSize: "40px" });
		title.setOrigin(0.5);
		this.add(title);
	}
}

export default class PreloadSceneComponent extends BaseComponent {
	constructor(config) {
		super(config);
		this.view = null;
	}

	run() {
		this.view = new PreloadSceneView(this.scene);
		this.layout.add(this.view);
	}

	remove() {
		this.view.setVisible(false);
		this.view.destroy();
		this.view = null;
	}
}