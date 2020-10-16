import { StateIds } from '@states/constants';
import { StateNode, IStateNode } from '@libs/FSM';

export class BaseState extends StateNode implements IStateNode {
    public get id(): StateIds  {
        return StateIds.BaseState;
    }
}