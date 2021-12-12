import BlockLeft from './BlockTurnLeft/BlockTurnLeftState';
import DirectionStateMachine from '../../../../../Base/DirectionStateMachine';
import { DIRECTION_ENUM } from '../../../../../Enum';
import { GameObject } from '@eva/eva.js';

export default class BlockTurnLeftSubStateMachine extends DirectionStateMachine {
  constructor(go: GameObject) {
    super(go);

    this.init();
  }

  init() {
    this.states.set(DIRECTION_ENUM.TOP, new BlockLeft(this.go, 'player_block_turn_left_top',1));
    this.states.set(DIRECTION_ENUM.BOTTOM, new BlockLeft(this.go, 'player_block_turn_left_bottom',1));
    this.states.set(DIRECTION_ENUM.LEFT, new BlockLeft(this.go, 'player_block_turn_left_left',1));
    this.states.set(DIRECTION_ENUM.RIGHT, new BlockLeft(this.go, 'player_block_turn_left_right',1));
  }
}
