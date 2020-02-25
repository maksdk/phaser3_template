//@ts-check
import BaseComponent from "../../libs/BaseComponent";
import BaseView from "../../libs/BaseView";

class StartMissionButtonView extends BaseView {
    constructor(scene) {
        super(scene);

        const back = new Phaser.GameObjects.Rectangle(this.scene, 0, 0, 200, 100, 0xffff00, 1);
        back.setOrigin(0.5);
        this.add(back);

        const title = new Phaser.GameObjects.Text(this.scene, 0, 0, 'Start', { color: "#000", fontSize: "40px" });
        title.setOrigin(0.5);
        this.add(title);


        const hitArea = new Phaser.Geom.Rectangle(
            200 * -0.5,
            100 * -0.5,
            200,
            100
        );

        this.setInteractive(hitArea, Phaser.Geom.Rectangle.Contains);
        this.on("pointerdown", this.onPointerDown, this);
    }

    onPointerDown(e) {
        this.emit("click", e);
    }
}

export default class StartMissionButton extends BaseComponent {
    constructor(config) {
        super(config);
        this.view = null;
    }

    run() {
        this.view = new StartMissionButtonView(this.scene);
        this.view.setPosition(0, 300);
        this.view.on("click", this.onClick, this);
        this.layout.add(this.view);
    }

    onClick(e) {
        this.emit("click", e);
    }
}