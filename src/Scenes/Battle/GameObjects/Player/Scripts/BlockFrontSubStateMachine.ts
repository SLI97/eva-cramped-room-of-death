import DirectionSubStateMachine from '../../../../../Base/DirectionSubStateMachine';
import { DIRECTION_ENUM } from '../../../../../Enum';
import State from '../../../../../Base/State';
import StateMachine from '../../../../../Base/StateMachine';
import { SpriteAnimation } from '@eva/plugin-renderer-sprite-animation';

export default class BlockFrontSubStateMachine extends DirectionSubStateMachine {
  constructor(fsm: StateMachine, spriteAnimation: SpriteAnimation) {
    super(fsm);

    this.stateMachines.set(DIRECTION_ENUM.TOP, new State(spriteAnimation, 'player_block_front_top', 1));
    this.stateMachines.set(DIRECTION_ENUM.BOTTOM, new State(spriteAnimation, 'player_block_front_bottom', 1));
    this.stateMachines.set(DIRECTION_ENUM.LEFT, new State(spriteAnimation, 'player_block_front_left', 1));
    this.stateMachines.set(DIRECTION_ENUM.RIGHT, new State(spriteAnimation, 'player_block_front_right', 1));
  }
}
