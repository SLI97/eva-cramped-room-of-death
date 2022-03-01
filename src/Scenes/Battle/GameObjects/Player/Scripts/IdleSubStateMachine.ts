import DirectionStateMachine from '../../../../../Base/DirectionStateMachine';
import { DIRECTION_ENUM } from '../../../../../Enum';
import { GameObject } from '@eva/eva.js';
import State from '../../../../../Base/State';

export default class IdleSubStateMachine extends DirectionStateMachine {
  constructor(go: GameObject) {
    super(go);

    this.init();
  }

  init() {
    this.states.set(DIRECTION_ENUM.TOP, new State(this.go, 'player_idle_top'));
    this.states.set(DIRECTION_ENUM.BOTTOM, new State(this.go, 'player_idle_bottom'));
    this.states.set(DIRECTION_ENUM.LEFT, new State(this.go, 'player_idle_left'));
    this.states.set(DIRECTION_ENUM.RIGHT, new State(this.go, 'player_idle_right'));
  }
}
