//@ts-check
import BaseComponent from "../libs/BaseComponent";

class PreloadWindowView extends Phaser.GameObjects.Container {
	constructor(scene, config={}) {
        super(scene);
		const gw = this.scene.sys.renderer.width;
		const gh = this.scene.sys.renderer.height;
		
		const shadow = new Phaser.GameObjects.Rectangle(this.scene, 0, 0, gw, gh, 0x000000, 0.8);
		shadow.setOrigin(0.5);
		this.add(shadow);

		const title = new Phaser.GameObjects.Text(this.scene, 0, 0, 'L o a d i n g...', { color:"#ffffff", fontSize: "40px", fontFamily: "Juice" });
		title.setOrigin(0.5);
        title.setPosition(0, 50);
        this.add(title);

        const progress = new Phaser.GameObjects.Text(this.scene, 0, 0, '00%', { color:"#ffffff", fontSize: "40px", fontFamily: "Juice" });
		progress.setOrigin(0.5);
        progress.setPosition(0, -50);
        this.progress = progress;
        this.add(progress);
    }
    
    updateProgress(persent) {
        this.progress.setText(String(100 * persent) + "%");
    }
}

export default class PreloadWindow extends BaseComponent {
    constructor(config) {
        super(config);

        this.view = new PreloadWindowView(this.scene);
        this.stage.add(this.view);
    }

    updateProgress(persent) {
        this.view.updateProgress(persent);
    }
}