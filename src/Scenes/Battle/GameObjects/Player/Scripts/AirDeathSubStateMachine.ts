import DirectionStateMachine from '../../../../../Base/DirectionStateMachine';
import { DIRECTION_ENUM } from '../../../../../Enum';
import { GameObject } from '@eva/eva.js';
import State from '../../../../../Base/State';

export default class AirDeathSubStateMachine extends DirectionStateMachine {
  constructor(go: GameObject) {
    super(go);

    this.init();
  }

  init() {
    this.states.set(DIRECTION_ENUM.TOP, new State(this.go, 'player_air_death_top', 1));
    this.states.set(DIRECTION_ENUM.BOTTOM, new State(this.go, 'player_air_death_bottom', 1));
    this.states.set(DIRECTION_ENUM.LEFT, new State(this.go, 'player_air_death_left', 1));
    this.states.set(DIRECTION_ENUM.RIGHT, new State(this.go, 'player_air_death_right', 1));
  }
}
