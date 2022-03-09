import { IEntity } from '../../../../../Levels';
import EventManager from '../../../../../Runtime/EventManager';
import { EVENT_ENUM, ENTITY_STATE_ENUM } from '../../../../../Enum';
import EnemyManager from '../../../../../Base/EnemyManager';
import DataManager from '../../../../../Runtime/DataManager';
import WoodenSkeletonStateMachine from './WoodenSkeletonStateMachine';

/***
 * 木骷髅管理器
 */
export default class WoodenSkeletonManager extends EnemyManager {
  static componentName = 'WoodenSkeletonManager'; // 设置组件的名字

  init(enemy: IEntity) {
    this.fsm = this.gameObject.addComponent(new WoodenSkeletonStateMachine());
    super.init(enemy);
    EventManager.Instance.on(EVENT_ENUM.PLAYER_MOVE_END, this.onAttack, this);
  }

  onDestroy() {
    super.onDestroy();
    EventManager.Instance.off(EVENT_ENUM.PLAYER_MOVE_END, this.onAttack);
  }

  onAttack() {
    if (this.state === ENTITY_STATE_ENUM.DEATH) {
      return;
    }

    const { targetX: playerX, targetY: playerY, state: playerState } = DataManager.Instance.player;
    if (
      ((playerX === this.x && Math.abs(playerY - this.y) <= 1) ||
        (playerY === this.y && Math.abs(playerX - this.x) <= 1)) &&
      playerState !== ENTITY_STATE_ENUM.DEATH &&
      playerState !== ENTITY_STATE_ENUM.AIRDEATH
    ) {
      this.state = ENTITY_STATE_ENUM.ATTACK;
      EventManager.Instance.emit(EVENT_ENUM.ATTACK_PLAYER, ENTITY_STATE_ENUM.DEATH);
    }
  }
}
