import { Container } from 'pixi.js';
import { IGame } from '@game/Game';
import { IScene, IBaseView } from '@views/interfaces';

export class MainScene extends Container implements IScene {
    public gameWidth: number;
    public gameHeigh: number;

    constructor(private game: IGame) {
        super();
        this.gameWidth = this.game.width;
        this.gameHeigh = this.game.height;
    }

    public addView<T extends IBaseView>(View: new (scene: IScene) => T): T {
        const view = new View(this);
        this.addChild(view);
        return view;
    }

    public removeView(view: IBaseView) {
        this.removeChild(view);
    }

    public removeAll(view: IBaseView) {
        this.removeChildren();
    }
}