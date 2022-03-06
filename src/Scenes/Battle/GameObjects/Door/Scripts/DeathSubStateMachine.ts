import DirectionSubStateMachine from '../../../../../Base/DirectionSubStateMachine';
import { DIRECTION_ENUM } from '../../../../../Enum';
import State from '../../../../../Base/State';
import StateMachine from '../../../../../Base/StateMachine';
import { SpriteAnimation } from '@eva/plugin-renderer-sprite-animation';

export default class DeathSubStateMachine extends DirectionSubStateMachine {
  constructor(fsm: StateMachine, spriteAnimation: SpriteAnimation) {
    super(fsm);

    this.stateMachines.set(DIRECTION_ENUM.TOP, new State(spriteAnimation, 'door_death', 1));
    this.stateMachines.set(DIRECTION_ENUM.BOTTOM, new State(spriteAnimation, 'door_death', 1));
    this.stateMachines.set(DIRECTION_ENUM.LEFT, new State(spriteAnimation, 'door_death', 1));
    this.stateMachines.set(DIRECTION_ENUM.RIGHT, new State(spriteAnimation, 'door_death', 1));
  }
}
