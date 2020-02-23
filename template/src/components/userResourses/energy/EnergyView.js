//@ts-check
import BaseView from "../../../libs/BaseView";

export default  class EnergyView extends BaseView {
    constructor(scene) {
        super(scene);

        const back = new Phaser.GameObjects.Rectangle(this.scene, 0, 0, 100, 50, 0x0091bc);
        this.add(back);

        const icon = new Phaser.GameObjects.Arc(this.scene, 0, 0, 12);
        icon.setPosition(-25, 0);
        icon.setFillStyle(0xffff00);
        this.add(icon);
        
        const faceView = new Phaser.GameObjects.Text(this.scene, 0, 0, "0", { fontSize: "30px", fontStyle: "bold" });
        faceView.setOrigin(0.5);
        faceView.setPosition(25, 0);
        this.add(faceView);
        
        this.icon = icon;
        this.faceView = faceView;
    }

    updateState(params) {
        const { state: currentState } = params;
    }
}

