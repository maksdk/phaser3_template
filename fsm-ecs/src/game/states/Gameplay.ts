import { BaseState } from '@states/BaseState';
import { StateIds } from '@states/constants';

export class GameplayState extends BaseState {
    public get id(): StateIds  {
        return StateIds.GameplayState;
    }

    public async onPrepare() {
        console.log('Prepare: ', this.id);
        await new Promise((res) => setTimeout(res, 2000));
    }

    public async onEnter() {
        console.log('Enter: ', this.id);
        
    }
}