import IdleState from './Idle/IdleState';
import DirectionStateMachine from '../../../../../Base/DirectionStateMachine';
import { DIRECTION_ENUM } from '../../../../../Enum';
import { GameObject } from '@eva/eva.js';

export default class SpikesOneSubStateMachine extends DirectionStateMachine {
    constructor(go: GameObject) {
        super(go);

        this.init();
    }

    init() {
        this.states.set(DIRECTION_ENUM.TOP, new IdleState(this.go, 'door_idle_top'));
        this.states.set(DIRECTION_ENUM.BOTTOM, new IdleState(this.go, 'door_idle_top'));
        this.states.set(DIRECTION_ENUM.LEFT, new IdleState(this.go, 'door_idle_left'));
        this.states.set(DIRECTION_ENUM.RIGHT, new IdleState(this.go, 'door_idle_left'));
    }
}
