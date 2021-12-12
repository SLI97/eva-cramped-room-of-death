import AttackState from './Attack/AttackState';
import DirectionStateMachine from '../../../../../Base/DirectionStateMachine';
import { DIRECTION_ENUM } from '../../../../../Enum';
import { GameObject } from '@eva/eva.js';

export default class AttackSubStateMachine extends DirectionStateMachine {
    constructor(go: GameObject) {
        super(go);

        this.init();
    }

    init() {
        this.states.set(DIRECTION_ENUM.TOP, new AttackState(this.go, 'woodenskeleton_attack_top',1));
        this.states.set(DIRECTION_ENUM.BOTTOM, new AttackState(this.go, 'woodenskeleton_attack_bottom',1));
        this.states.set(DIRECTION_ENUM.LEFT, new AttackState(this.go, 'woodenskeleton_attack_left',1));
        this.states.set(DIRECTION_ENUM.RIGHT, new AttackState(this.go, 'woodenskeleton_attack_right',1));
    }
}
