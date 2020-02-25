//@ts-check
import Phaser from "phaser";

/**
 * @typedef {BaseView} BaseViewInterface
 * @class
 * @extends {Phaser.GameObjects.Container}
 */
export default class BaseView extends Phaser.GameObjects.Container {
    /**
     * @param {import("./BaseScene").SceneInterface} scene 
     * @param {object} [options={}] 
     */
    constructor(scene, options={}) {
        super(scene, 0, 0);
        this.options = options;
    }
}