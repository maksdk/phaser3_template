import { Container, Application } from 'pixi.js';
import { Ticker } from '@libs/Ticker';
import { IResizeCallbackArg, ResizeManager } from '@libs/ResizeManager';

export interface IAppConfig {
    autoDensity: boolean;
    backgroundColor: number;
    width: number;
    height: number;
    container: HTMLElement
}

export class Game {
    public ticker: Ticker;
    public scene: Container;
    public resizeManager: ResizeManager;
    private app: PIXI.Application;

    constructor(config: IAppConfig) {
        this.app = new Application(config);;
        this.ticker = new Ticker(this.app);
        this.scene = new Container();
        this.resizeManager = new ResizeManager(this.app, {
            width: config.width,
            height: config.height
        });
    }

    public start(): void {
        this.app.stage.addChild(this.scene);

        this.ticker.add('Game', this.update.bind(this));

        this.resizeManager.add('Game', this.onResize.bind(this));
        this.resizeManager.resize();
    }

    private update(dt: number, totalTime: number): void {
        
    }

    private onResize(sizes: IResizeCallbackArg): void {
        const { game } = sizes;
        this.scene.position.set(game.width / 2, game.height / 2);
    }
}
