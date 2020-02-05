//@ts-check
import BaseGameScene from "../../../lib/BaseGameScene";

export default class PreloadScene extends BaseGameScene {
    constructor() {
        super(PreloadScene.key);
    }

    static get key() {
        return "Preload";
    }

    preload() {
        console.log(this.callbacks);
    }
};