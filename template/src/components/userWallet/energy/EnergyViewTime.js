//@ts-check
import BaseView from "../../../libs/BaseView";

export default class EnergyViewTime extends BaseView {
	constructor(view) {
		super(view.scene);

		this.timerValue = null;
		this.timer = null;

		this.infinityTime = 0;
	}

	static get state() {
		return "time";
	}

	onEnter() {
		const back = new Phaser.GameObjects.Rectangle(this.scene, 0, 0, 100, 50, 0x0091bc);
        this.add(back);

        const icon = new Phaser.GameObjects.Arc(this.scene, 0, 0, 12);
        icon.setPosition(-25, 0);
        icon.setFillStyle(0xffff00);
		this.add(icon);
        
        const timerValue = new Phaser.GameObjects.Text(this.scene, 0, 0, "00:00:00", { fontSize: "30px", fontStyle: "bold" });
        timerValue.setOrigin(0.5);
        timerValue.setPosition(25, 0);
		this.add(timerValue);
	}

	onExit() {
		this.setVisible(false);
		this.removeTimer();
	}

	updateState(params) {
		const { infinityTime } = params;

		this.infinityTime = infinityTime;
		
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