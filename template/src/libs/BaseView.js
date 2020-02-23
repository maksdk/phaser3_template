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
     */
    constructor(scene) {
        super(scene, 0, 0);
    }
}