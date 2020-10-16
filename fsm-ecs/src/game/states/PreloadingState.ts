import { BaseState } from '@states/BaseState';
import { StateIds, GameFSMEvents } from '@states/constants';

export class PreloadingState extends BaseState {
    public get id(): StateIds  {
        return StateIds.PreloadingState;
    }

    public async onPrepare() {
        console.log('Prepare: ', this.id);
    }

    public async onEnter() {
        console.log('Enter: ', this.id);
        this.fsm.onSend(GameFSMEvents.Loaded);
    }

    public async onExit() {
        console.log('Exit: ', this.id);
    }
}