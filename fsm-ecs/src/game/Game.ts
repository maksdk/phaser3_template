import { Container, Application } from 'pixi.js';
import { Ticker } from '@libs/Ticker';
import { IResizeCallbackArg, ResizeManager } from '@libs/ResizeManager';
import { GameFSM, IGameFSM } from '@states/GameFSM'
import { MainScene } from '@views/MainScene';
import { IScene } from '@views/interfaces';

export interface IAppConfig {
    backgroundColor: number;
    width: number;
    height: number;
}

export interface IGame {
    width: number;
    height: number;
    ticker: Ticker;
    scene: IScene;
    resizeManager: ResizeManager;
    fsm: IGameFSM;
    start(): void;
}

export class Game {
    public ticker: Ticker;
    public scene: IScene;
    public resizeManager: ResizeManager;
    public fsm: IGameFSM;
    public width: number;
    public height: number;

    private app: PIXI.Application;

    constructor(public config: IAppConfig) {
       
        this.width = config.width;
        this.height = config.height;

        this.app = new Application(this.config);

        this.ticker = new Ticker(this.app);

        this.resizeManager = new ResizeManager(this.app, {
            width: this.width,
            height: this.height
        });

        this.scene = new MainScene(this);

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
