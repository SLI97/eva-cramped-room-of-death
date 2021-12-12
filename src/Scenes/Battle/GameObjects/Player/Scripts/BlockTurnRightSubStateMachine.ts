import BlockTurnRightState from './BlockTurnRight/BlockTurnRightState';
import DirectionStateMachine from '../../../../../Base/DirectionStateMachine';
import { DIRECTION_ENUM } from '../../../../../Enum';
import { GameObject } from '@eva/eva.js';

export default class BlockTurnRightSubStateMachine extends DirectionStateMachine {
  constructor(go: GameObject) {
    super(go);

    this.init();
  }

  init() {
    this.states.set(DIRECTION_ENUM.TOP, new BlockTurnRightState(this.go, 'player_block_turn_right_top',1));
    this.states.set(DIRECTION_ENUM.BOTTOM, new BlockTurnRightState(this.go, 'player_block_turn_right_bottom',1));
    this.states.set(DIRECTION_ENUM.LEFT, new BlockTurnRightState(this.go, 'player_block_turn_right_left',1));
    this.states.set(DIRECTION_ENUM.RIGHT, new BlockTurnRightState(this.go, 'player_block_turn_right_right',1));
  }
}
