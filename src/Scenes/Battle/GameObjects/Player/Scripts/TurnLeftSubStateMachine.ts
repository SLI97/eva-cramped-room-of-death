import { DIRECTION_ENUM } from '../../../../../Enum';
import { GameObject } from '@eva/eva.js';
import DirectionStateMachine from '../../../../../Base/DirectionStateMachine';
import State from '../../../../../Base/State';

export default class TurnLeftSubStateMachine extends DirectionStateMachine {
  constructor(go: GameObject) {
    super(go);

    this.init();
  }

  init() {
    this.states.set(DIRECTION_ENUM.TOP, new State(this.go, 'player_turn_left_top', 1));
    this.states.set(DIRECTION_ENUM.BOTTOM, new State(this.go, 'player_turn_left_bottom', 1));
    this.states.set(DIRECTION_ENUM.LEFT, new State(this.go, 'player_turn_left_left', 1));
    this.states.set(DIRECTION_ENUM.RIGHT, new State(this.go, 'player_turn_left_right', 1));
  }
}
