import IdleState from './Idle/IdleState';
import DirectionStateMachine from '../../../../../Base/DirectionStateMachine';
import { DIRECTION_ENUM } from '../../../../../Enum';
import { GameObject } from '@eva/eva.js';
import PlayerManager from './PlayerManager';

export default class IdleSubStateMachine extends DirectionStateMachine {
  constructor(go: GameObject) {
    super(go);

    this.init();
  }

  init() {
      this.manager = this.go.getComponent(PlayerManager);
    this.states.set(DIRECTION_ENUM.TOP, new IdleState(this.go, 'player_idle_top'));
    this.states.set(DIRECTION_ENUM.BOTTOM, new IdleState(this.go, 'player_idle_bottom'));
    this.states.set(DIRECTION_ENUM.LEFT, new IdleState(this.go, 'player_idle_left'));
    this.states.set(DIRECTION_ENUM.RIGHT, new IdleState(this.go, 'player_idle_right'));
  }
}
