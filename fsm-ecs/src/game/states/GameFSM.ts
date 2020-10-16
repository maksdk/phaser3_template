import { FSM, IFSM } from '@libs/FSM';
import { IGame } from '@game/Game';
import { PreloadingState } from '@states/PreloadingState';
import { GameplayState } from '@states/Gameplay';
import { StateIds, GameFSMEvents } from '@states/constants';

export interface IGameFSM extends IFSM {};

const config = {
    id: 'machine',
    initial: StateIds.PreloadingState,
    states: {
        [StateIds.PreloadingState]: {
            on: {
                [GameFSMEvents.Loaded]: StateIds.GameplayState
            }
        },
        [StateIds.GameplayState]: {
            
        }
    }
};

export class GameFSM extends FSM implements IFSM {
    constructor(private game: IGame) {
        super(config, GameFSM.states);
    }

    private static get states() {
        const map = new Map();
        map.set(StateIds.PreloadingState, PreloadingState);
        map.set(StateIds.GameplayState, GameplayState);
        return map;
    }
}