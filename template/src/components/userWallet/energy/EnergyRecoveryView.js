//@ts-check
import BaseView from "../../../libs/BaseView";

export default class EnergyViewRecovery extends BaseView {
	constructor(view) {
		super(view.scene);

		this.energyValue = null;
		this.timerValue = null;
		this.timer = null;
		this.recoveryTime = 0;
	}

	static get state() {
		return "recovery";
	}

	onEnter() {
		const back = new Phaser.GameObjects.Rectangle(this.scene, 0, 0, 100, 50, 0x0091bc);
		this.add(back);

		const icon = new Phaser.GameObjects.Arc(this.scene, 0, 0, 12);
		icon.setPosition(-25, 0);
		icon.setFillStyle(0xffff00);
		this.add(icon);

		const energyValue = new Phaser.GameObjects.Text(this.scene, 0, 0, "0", {
			fontSize: "30px",
			fontStyle: "bold"
		});
		energyValue.setOrigin(0.5);
		energyValue.setPosition(25, 0);
		this.energyValue = energyValue;
		this.add(energyValue);

		const timerValue = new Phaser.GameObjects.Text(this.scene, 0, 0, "00:00", {
			fontSize: "30px",
			fontStyle: "bold"
		});
		timerValue.setOrigin(0.5);
		timerValue.setPosition(25, 0);
		this.add(timerValue);
	}

	onExit() {
		this.setVisible(false);
		this.removeTimer();
	}

	updateState(params) {
		const {
			value,
			recoveryTime
		} = params;

		this.energyValue.setText(String(value));
		this.recoveryTime = recoveryTime;

		this.runTimer();
	}

	runTimer() {
		if (this.timer) {

		}
		// TODO: create timer
		// TODO: emit timer ccomplete 
	}

	removeTimer() {
		
	}
}