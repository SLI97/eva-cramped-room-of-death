import { Component } from '@eva/eva.js';
import { DIRECTION_ENUM, DIRECTION_ORDER_ENUM, ENTITY_STATE, PARAMS_NAME, ENTITY_TYPE_ENUM } from '../Enum';
import StateMachine from './StateMachine';
import { randomByLength } from '../Utils';
import { TILE_HEIGHT, TILE_WIDTH } from '../Scenes/Battle/GameObjects/Tile/Tile';
import { IEntity } from '../Levels';

/***
 * 实体类，实体必须具备方向和状态
 */
export default class EntityManager extends Component {
  static componentName = 'EntityManager'; // 设置组件的名字

  id: string = randomByLength(12);
  x: number; //坐标
  y: number;
  type: ENTITY_TYPE_ENUM;
  _state: ENTITY_STATE;
  _direction: DIRECTION_ENUM;
  fsm: StateMachine;

  init(params: IEntity) {
    this.x = params.x;
    this.y = params.y;
    this.state = params.state;
    this.direction = params.direction;
  }

  /***
   * 更新人物位置，把虚拟坐标（1,1）转为屏幕实际位置
   */
  update() {
    this.gameObject.transform.position.x = this.x * TILE_WIDTH - TILE_WIDTH * 1.5;
    this.gameObject.transform.position.y = this.y * TILE_HEIGHT - TILE_WIDTH * 1.5;
  }

  get direction() {
    return this._direction;
  }

  set direction(newDirection) {
    this._direction = newDirection;
    this.fsm.setParams(PARAMS_NAME.DIRECTION, DIRECTION_ORDER_ENUM[this._direction]);
  }

  get state() {
    return this._state;
  }

  set state(newState) {
    this._state = newState;
    //想要跳转的状态跟当前状态一致，就不需要重新触发动画了
    // if (this.fsm.currentState === this.fsm.stateMachines.get(newState)) {
    //   return;
    // }
    this.fsm.setParams(newState, true);
  }
}
