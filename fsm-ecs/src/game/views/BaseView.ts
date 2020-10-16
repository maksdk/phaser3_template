import { Container } from 'pixi.js';
import { IScene, IBaseView } from '@views/interfaces';

export class BaseView extends Container implements IBaseView {
    protected gameWidth: number;
    protected gameHeigh: number;

    constructor(protected scene: IScene) {
        super();

        this.gameWidth = this.scene.gameWidth;
        this.gameHeigh = this.scene.gameHeigh;
    }
}