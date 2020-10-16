import { Container } from 'pixi.js';

export interface IScene extends Container {
    gameWidth: number;
    gameHeigh: number;
    addView<T extends IBaseView>(View: new (scene: IScene) => T): T;
}

// export interface IBaseViewConstructable {
//     new(scene: IScene): IBaseView;
// }

export interface IBaseView extends Container {

}