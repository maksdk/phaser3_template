type ResizeCallback = (arg: IResizeCallbackArg) => void;

export interface IResizeCallbackArg {
    game: { width: number, height: number };
    viewport: { width: number, height: number };
    isPortrait: boolean;
}

export interface IResizeManager {
    width: number;
    height: number;
    has(name: string): boolean;
    add(name: string, onResize: ResizeCallback): void | never;
    remove(name: string): void | never;
    resize(): void;
}

export class ResizeManager implements IResizeManager {
    private list: Map<string, ResizeCallback>;
    private gw = 0;
    private gh = 0;

    constructor(private app: PIXI.Application, private baseSize: { width: number; height: number }) {
        this.list = new Map();

        this.resize = this.resize.bind(this);

        window.addEventListener('resize', this.resize);
    }

    public get width(): number {
        return this.gw;
    }

    public get height(): number {
        return this.gh;
    }

    public has(name: string): boolean {
        return this.list.has(name);
    }

    public add(name: string, onResize: ResizeCallback): void {
        if (this.list.has(name)) {
            throw new Error(`ResizeManager: You are a little bastard, you can not add '${name}' twice!`);
        }
        this.list.set(name, onResize);
    }

    public remove(name: string): void {
        if (!this.list.has(name)) {
            throw new Error(
                `ResizeManager: You are a little bastard, the '${name}' does not exist in ResizeManager list!`
            );
        }
        this.list.delete(name);
    }

    public resize(): void {
        const { innerHeight, innerWidth } = window;
        const { width, height } = this.baseSize;

        const isPortrait = innerHeight > innerWidth;
        const viewport = { width: innerWidth, height: innerHeight };
        const game = { width: 0, height: 0 };

        if (isPortrait) {
            game.width = width | 0;
            game.height = (height * (innerHeight / innerWidth)) | 0;
        } else {
            game.height = height | 0;
            game.width = (width * (innerWidth / innerHeight)) | 0;
        }

        this.app.renderer.resize(game.width, game.height);
        this.app.view.style.width = `${viewport.width}px`;
        this.app.view.style.height = `${viewport.height}px`;

        this.gw = game.width;
        this.gh = game.height;

        this.list.forEach((onResize) =>
            onResize({
                game,
                viewport,
                isPortrait
            })
        );
    }
}
