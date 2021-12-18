import { ISpikes } from '../../../../../Levels';
import DataManager from '../../../../../Runtime/DataManager';
import { EVENT_ENUM, PARAMS_NAME, PLAYER_STATE, SPIKES_TYPE_TOTAL_POINT } from '../../../../../Enum';
import EventManager from '../../../../../Runtime/EventManager';
import { Component } from '@eva/eva.js';
import StateMachine from '../../../../../Base/StateMachine';
import SpikesStateMachine from './SpikesStateMachine';
import { TILE_HEIGHT, TILE_WIDTH } from '../../Tile/Tile';

export type SPIKES_TYPE_ENUM = 'SPIKES_ONE' | 'SPIKES_TWO' | 'SPIKES_THREE' | 'SPIKES_FOUR';

/***
 * 关卡门类
 */
export default class SpikesManager extends Component {
  static componentName = 'SpikesManager'; // 设置组件的名字
  totalPointCount: number;
  _curPointCount = 0;
  x: number;
  y: number;
  fsm: StateMachine;

  get curPointCount() {
    return this._curPointCount;
  }

  set curPointCount(value) {
    this._curPointCount = value;
    if (this.fsm) {
      this.fsm.setParams(PARAMS_NAME.CUR_POINT_COUNT, value);
    }
  }

  init(spikes: ISpikes) {
    this.fsm = this.gameObject.addComponent(new SpikesStateMachine());
    this.x = spikes.x;
    this.y = spikes.y;
    const type = spikes.type as SPIKES_TYPE_ENUM;
    this.fsm.setParams(PARAMS_NAME.SPIKES_TYPE, SPIKES_TYPE_TOTAL_POINT[type]);
    this.curPointCount = spikes.count;
    this.totalPointCount = SPIKES_TYPE_TOTAL_POINT[type];

    EventManager.Instance.on(EVENT_ENUM.PLAYER_MOVE_END, this.onLoop, this);
  }

  /***
   * 更新位置，把虚拟坐标（1,1）转为屏幕实际位置
   */
  update() {
    this.gameObject.transform.position.x = this.x * TILE_WIDTH - 16 * 3;
    this.gameObject.transform.position.y = this.y * TILE_HEIGHT - 16 * 3;
  }

  onDestroy() {
    EventManager.Instance.off(EVENT_ENUM.PLAYER_MOVE_END, this.onLoop);
  }

  /***
   * 当最大值时还没归零但人又触发移动，就让他变成1就好了
   */
  onLoop() {
    if (this.curPointCount == this.totalPointCount) {
      this.curPointCount = 1;
    } else {
      this.curPointCount++;
    }
    this.onAttack();
  }

  backZero() {
    this.curPointCount = 0;
  }

  onAttack() {
    const { x: playerX, y: playerY } = DataManager.Instance.player;
    if (playerX === this.x && playerY === this.y && this.curPointCount === this.totalPointCount) {
      EventManager.Instance.emit(EVENT_ENUM.ATTACK_PLAYER, PLAYER_STATE.DEATH);
    }
  }
}
