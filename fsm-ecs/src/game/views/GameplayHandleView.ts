import { BaseView } from '@views/BaseView';
import { Graphics } from "pixi.js";
import { IScene,IBaseView } from '@views/interfaces';

export class GameplayView extends BaseView implements IBaseView {
    constructor(scene: IScene) {
        super(scene);

        const handleRect = new Graphics();
        handleRect.beginFill(0xff0000);
        handleRect.drawRect(this.gameWidth * -0.5, this.gameHeigh * -0.5, this.gameWidth, this.gameHeigh);
        handleRect.endFill();
        handleRect.interactive = true;
        handleRect.on('pointerdown', this.onDown, this);
        this.addChild(handleRect);
    }

    public getSome(): string {
        return 'some';
    }

    private onDown(e: any) {
        console.log('Down: ', e);
    }
}