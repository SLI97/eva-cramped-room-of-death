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
    this.states.set(DIRECTION_ENUM.TOP, new State(this.go, 'smoke_idle_top', 1));
    this.states.set(DIRECTION_ENUM.BOTTOM, new State(this.go, 'smoke_idle_bottom', 1));
    this.states.set(DIRECTION_ENUM.LEFT, new State(this.go, 'smoke_idle_left', 1));
    this.states.set(DIRECTION_ENUM.RIGHT, new State(this.go, 'smoke_idle_right', 1));
  }
}
