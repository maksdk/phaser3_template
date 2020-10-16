import { Container, Application } from 'pixi.js';
import { Ticker } from '@libs/Ticker';
import { IResizeCallbackArg, ResizeManager } from '@libs/ResizeManager';
import { GameFSM, IGameFSM } from '@states/GameFSM'

export interface IAppConfig {
    backgroundColor: number;
    width: number;
    height: number;
}

export interface IGame {
    ticker: Ticker;
    scene: Container;
    resizeManager: ResizeManager;
    fsm: IGameFSM;
    start(): void;
}

export class Game {
    public ticker: Ticker;
    public scene: Container;
    public resizeManager: ResizeManager;
    public fsm: IGameFSM;

    private app: PIXI.Application;

    constructor(config: IAppConfig) {
        this.app = new Application(config);
        this.ticker = new Ticker(this.app);
        this.scene = new Container();
        this.resizeManager = new ResizeManager(this.app, {
            width: config.width,
            height: config.height
        });

        this.fsm = new GameFSM(this);
    }

    public start(): void {
        document.body.appendChild(this.app.view);
        this.app.stage.addChild(this.scene);

        this.ticker.add('Game', this.update.bind(this));

        this.resizeManager.add('Game', this.onResize.bind(this));
        this.resizeManager.resize();

        this.fsm.onStart();
    }

    private update(dt: number, totalTime: number): void {
        
    }

    private onResize(sizes: IResizeCallbackArg): void {
        const { game } = sizes;
        this.scene.position.set(game.width / 2, game.height / 2);
    }
}
