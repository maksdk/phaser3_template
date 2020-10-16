import { StateIds } from '@states/constants';
import { StateNode, IStateNode } from '@libs/FSM';
import { IGameFSM } from './GameFSM';

export class BaseState extends StateNode implements IStateNode {
    protected fsm: IGameFSM;

    constructor(fsm: IGameFSM, parent: IStateNode | null = null) {
        super(fsm, parent);

        this.fsm = fsm;
    }

    public get id(): StateIds  {
        return StateIds.BaseState;
    }
}