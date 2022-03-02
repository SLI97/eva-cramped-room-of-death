import { IEntity } from '../../../../../Levels';
import EventManager from '../../../../../Runtime/EventManager';
import { EVENT_ENUM, PLAYER_STATE } from '../../../../../Enum';
import EnemyManager from '../../../../../Base/EnemyManager';
import DataManager from '../../../../../Runtime/DataManager';
import WoodenSkeletonStateMachine from './WoodenSkeletonStateMachine';

/***
 * 木骷髅管理器
 */
export default class WoodenSkeletonManager extends EnemyManager {
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
    if (this.state === PLAYER_STATE.DEATH) {
      return;
    }

    const { targetX: playerX, targetY: playerY, state: playerState } = DataManager.Instance.player;
    if (
      ((playerX === this.x && Math.abs(playerY - this.y) <= 1) ||
        (playerY === this.y && Math.abs(playerX - this.x) <= 1)) &&
      playerState === PLAYER_STATE.IDLE
    ) {
      this.state = PLAYER_STATE.ATTACK;
      EventManager.Instance.emit(EVENT_ENUM.ATTACK_PLAYER, PLAYER_STATE.DEATH);
    }
  }
}
