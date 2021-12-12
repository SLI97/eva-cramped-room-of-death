import BlockFrontState from './BlockFront/BlockFrontState';
import DirectionStateMachine from '../../../../../Base/DirectionStateMachine';
import { DIRECTION_ENUM } from '../../../../../Enum';
import { GameObject } from '@eva/eva.js';

export default class BlockFrontSubStateMachine extends DirectionStateMachine {
  constructor(go: GameObject) {
    super(go);

    this.init();
  }

  init() {
    this.states.set(DIRECTION_ENUM.TOP, new BlockFrontState(this.go, 'player_block_front_top', 1));
    this.states.set(DIRECTION_ENUM.BOTTOM, new BlockFrontState(this.go, 'player_block_front_bottom', 1));
    this.states.set(DIRECTION_ENUM.LEFT, new BlockFrontState(this.go, 'player_block_front_left', 1));
    this.states.set(DIRECTION_ENUM.RIGHT, new BlockFrontState(this.go, 'player_block_front_right', 1));
  }
}
