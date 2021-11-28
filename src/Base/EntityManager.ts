import { Component } from '@eva/eva.js';
import { DIRECTION_ENUM, DIRECTION_ORDER, PLAYER_STATE } from '../Enum';
import StateMachine from './StateMachine';
import { PARAMS_NAME } from '../Scenes/Battle/GameObjects/Player/Scripts/PlayerStateMachine';

/***
 * 实体类，实体必须具备方向和状态
 */
export default class EntityManager extends Component {
  x: number;
  y: number;
  fsm: StateMachine;
  _state: PLAYER_STATE;
  _direction: DIRECTION_ENUM;

  start() {
    this.fsm = this.gameObject.getComponent(StateMachine);
  }

  get direction() {
    return this._direction;
  }

  set direction(value) {
    this._direction = value;
    if (this.fsm) {
      this.fsm.setParams(
        PARAMS_NAME.DIRECTION,
        DIRECTION_ORDER.findIndex(i => i === this._direction),
      );
    }
  }

  get state() {
    return this._state;
  }

  set state(value) {
    this._state = value;
    if (this.fsm && this.fsm.params.has(value)) {
      //同样类型的block不要覆盖
      if (this.fsm.currentState === this.fsm.states.get(value)) {
        return;
      }
      this.fsm.setParams(value, true);
    }
  }
}
