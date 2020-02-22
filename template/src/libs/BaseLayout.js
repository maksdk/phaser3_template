//@ts-check
import Phaser from "phaser";

/**
 * @typedef {BaseLayout} LayoutInterface
 * @class
 * @extends Phaser.GameObjects.Container
 */
export default class BaseLayout extends Phaser.GameObjects.Container {
    constructor(scene) {
        super(scene, 0, 0);

        this.layout0 = new Phaser.GameObjects.Container(scene, 0, 0);
        this.layout1 = new Phaser.GameObjects.Container(scene, 0, 0);
    }

    /**
     * @param {Phaser.GameObjects.Container | Phaser.GameObjects.Sprite | Phaser.GameObjects.Image | Phaser.GameObjects.Graphics } child 
     * @param {number} [zIndex=0] 
     */
    add(child, zIndex=0) {
        const layout = this["layout" + zIndex];
        if (!layout) {
            throw new Error(`Such layout zIndex: ${zIndex} is not registered!`);
        }

        return super.add(layout.add(child));
    }
}
