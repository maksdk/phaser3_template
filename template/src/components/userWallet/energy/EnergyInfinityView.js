//@ts-check
import BaseView from "../../../libs/BaseView";

export default class EnergyViewInfinity extends BaseView {
	constructor(view) {
		super(view.scene);
		this.valueStatus = null;
		this.infinityTime = 0;
	}

	static get state() {
		return "infinity";
	}

	onEnter() {
		const back = new Phaser.GameObjects.Rectangle(this.scene, 0, 0, 100, 50, 0x0091bc);
        this.add(back);

        const icon = new Phaser.GameObjects.Arc(this.scene, 0, 0, 12);
        icon.setPosition(-25, 0);
        icon.setFillStyle(0xffff00);
		this.add(icon);
        
        const valueStatus = new Phaser.GameObjects.Text(this.scene, 0, 0, "Infinity", { fontSize: "30px", fontStyle: "bold" });
        valueStatus.setOrigin(0.5);
        valueStatus.setPosition(25, 0);
		this.add(valueStatus);
	}

	onExit() {
		this.setVisible(false);
	}

	updateState(params) {

	}
}