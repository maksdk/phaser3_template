import { BaseState } from '@states/BaseState';
import { StateIds, GameFSMEvents } from '@states/constants';

export class PreloadingState extends BaseState {
    public get id(): StateIds  {
        return StateIds.PreloadingState;
    }

    public async onPrepare() {
        console.log('Prepare: ', this.id);
        await new Promise((res) => setTimeout(res, 2000));
    }

    public async onEnter() {
        console.log('Enter: ', this.id);

        setTimeout(() => {
            this.fsm.onSend(GameFSMEvents.Loaded);
        }, 3000);
    }

    public async onExit() {
        console.log('Exit: ', this.id);

        await new Promise((res) => setTimeout(res, 2000));
    }
}