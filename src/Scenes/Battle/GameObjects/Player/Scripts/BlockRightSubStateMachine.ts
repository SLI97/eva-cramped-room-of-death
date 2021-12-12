import BlockRightState from './BlockRight/BlockRightState';
import DirectionStateMachine from '../../../../../Base/DirectionStateMachine';
import { DIRECTION_ENUM } from '../../../../../Enum';
import { GameObject } from '@eva/eva.js';

export default class BlockRightSubStateMachine extends DirectionStateMachine {
    constructor(go: GameObject) {
        super(go);

        this.init();
    }

    init() {
        this.states.set(DIRECTION_ENUM.TOP, new BlockRightState(this.go, 'player_block_right_top',1));
        this.states.set(DIRECTION_ENUM.BOTTOM, new BlockRightState(this.go, 'player_block_right_bottom',1));
        this.states.set(DIRECTION_ENUM.LEFT, new BlockRightState(this.go, 'player_block_right_left',1));
        this.states.set(DIRECTION_ENUM.RIGHT, new BlockRightState(this.go, 'player_block_right_right',1));
    }
}
