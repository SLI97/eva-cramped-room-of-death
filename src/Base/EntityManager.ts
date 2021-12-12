import { Component } from '@eva/eva.js';
import { DIRECTION_ENUM, DIRECTION_ORDER, PLAYER_STATE, PARAMS_NAME } from '../Enum';
import StateMachine from './StateMachine';
import { randomByCount } from '../Utils';
import { IDoor, IEnemy, IPlayer } from '../Levels';
import { TILE_HEIGHT, TILE_WIDTH } from '../Scenes/Battle/GameObjects/Tile/Tile';

/***
 * 实体类，实体必须具备方向和状态
 */
export default class EntityManager extends Component {
  static componentName = 'EntityManager'; // 设置组件的名字

  x: number;
  y: number;
  fsm: StateMachine;
  _state: PLAYER_STATE;
  _direction: DIRECTION_ENUM;
  id: string = randomByCount(12);
  dto: IPlayer | IEnemy | IDoor;

  init(dto: IPlayer | IEnemy | IDoor) {
    this.dto = dto;
    this.x = dto.x;
    this.y = dto.y;
    this.state = dto.state;
    this.direction = dto.direction;
  }

  start() {
    // this.x = this.dto.x;
    // this.y = this.dto.y;
    // this.state = this.dto.state;
    // // this.direction = this.dto.direction;
    this.fsm = this.gameObject.getComponent(StateMachine);
  }

  /***
   * 更新人物位置，把虚拟坐标（1,1）转为屏幕实际位置
   */
  update() {
    this.gameObject.transform.position.x = this.x * TILE_WIDTH - 16 * 3;
    this.gameObject.transform.position.y = this.y * TILE_HEIGHT - 16 * 3;
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
      // if (this.fsm.currentState === this.fsm.states.get(value)) {
      //   return;
      // }
      this.fsm.setParams(value, true);
    }
  }
}
