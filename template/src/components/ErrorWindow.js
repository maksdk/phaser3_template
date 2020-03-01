//@ts-check
import BaseComponent from "../libs/BaseComponent";
import BaseView from "../libs/BaseView";

class ErrorWindowView extends BaseView {
	constructor(scene) {
		super(scene);
		const gw = this.scene.sys.renderer.width;
		const gh = this.scene.sys.renderer.height;
		
		const shadow = new Phaser.GameObjects.Rectangle(this.scene, 0, 0, gw, gh, 0x000000, 0.8);
		shadow.setOrigin(0.5);
		this.add(shadow);

		const title = new Phaser.GameObjects.Text(this.scene, 0, 0, 'Http error', { color:"#ffffff", fontSize: "40px" });
		title.setOrigin(0.5);
		this.add(title);
	}
}

export default class ErrorWindow extends BaseComponent {
    constructor(config) {
        super(config);
        this.view = new ErrorWindowView(this.scene);
		this.stage.add(this.view);
    }
}