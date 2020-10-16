import { GameplayView } from '@game/views/GameplayHandleView';
import { BaseState } from '@states/BaseState';
import { StateIds } from '@states/constants';

export class GameplayState extends BaseState {
    public get id(): StateIds  {
        return StateIds.GameplayState;
    }

    public async onPrepare() {
        console.log('Prepare: ', this.id);
    }

    public async onEnter() {
        console.log('Enter: ', this.id);

        this.fsm.scene.addView<GameplayView>(GameplayView);
    }
}