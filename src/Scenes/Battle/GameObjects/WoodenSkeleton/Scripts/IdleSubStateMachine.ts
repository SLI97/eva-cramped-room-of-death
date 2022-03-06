import DirectionSubStateMachine from '../../../../../Base/DirectionSubStateMachine';
import { DIRECTION_ENUM } from '../../../../../Enum';
import State from '../../../../../Base/State';
import StateMachine from '../../../../../Base/StateMachine';
import { SpriteAnimation } from '@eva/plugin-renderer-sprite-animation';

export default class IdleSubStateMachine extends DirectionSubStateMachine {
  constructor(fsm: StateMachine, spriteAnimation: SpriteAnimation) {
    super(fsm);

    this.stateMachines.set(DIRECTION_ENUM.TOP, new State(spriteAnimation, 'woodenskeleton_idle_top'));
    this.stateMachines.set(DIRECTION_ENUM.BOTTOM, new State(spriteAnimation, 'woodenskeleton_idle_bottom'));
    this.stateMachines.set(DIRECTION_ENUM.LEFT, new State(spriteAnimation, 'woodenskeleton_idle_left'));
    this.stateMachines.set(DIRECTION_ENUM.RIGHT, new State(spriteAnimation, 'woodenskeleton_idle_right'));
  }
}
