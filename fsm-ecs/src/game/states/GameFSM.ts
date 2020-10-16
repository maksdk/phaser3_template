import { FSM, IFSM } from '@libs/FSM';
import { IGame } from '@game/Game';
import { PreloadingState } from '@states/PreloadingState';
import { GameplayState } from '@game/states/GameplayState';
import { StateIds, GameFSMEvents } from '@states/constants';
import { IScene } from '@game/views/interfaces';

export interface IGameFSM extends IFSM {
    scene: IScene;
}

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
    public scene: IScene;

    constructor(private game: IGame) {
        super(config, GameFSM.states);

        this.scene = this.game.scene;
    }

    private static get states() {
        const map = new Map();
        map.set(StateIds.PreloadingState, PreloadingState);
        map.set(StateIds.GameplayState, GameplayState);
        return map;
    }
}