import BlockLeftState from './BlockLeft/BlockLeftState';
import DirectionStateMachine from '../../../../../Base/DirectionStateMachine';
import { DIRECTION_ENUM } from '../../../../../Enum';
import { GameObject } from '@eva/eva.js';

export default class BlockLeftSubStateMachine extends DirectionStateMachine {
    constructor(go: GameObject) {
        super(go);

        this.init();
    }

    init() {
        this.states.set(DIRECTION_ENUM.TOP, new BlockLeftState(this.go, 'player_block_left_top',1));
        this.states.set(DIRECTION_ENUM.BOTTOM, new BlockLeftState(this.go, 'player_block_left_bottom',1));
        this.states.set(DIRECTION_ENUM.LEFT, new BlockLeftState(this.go, 'player_block_left_left',1));
        this.states.set(DIRECTION_ENUM.RIGHT, new BlockLeftState(this.go, 'player_block_left_right',1));
    }
}
