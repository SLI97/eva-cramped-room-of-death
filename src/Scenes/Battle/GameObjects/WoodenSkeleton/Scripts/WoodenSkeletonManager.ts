import { IEnemy } from '../../../../../Levels';
import EventManager from '../../../../../Runtime/EventManager';
import { ENEMY_TYPE_ENUM, EVENT_ENUM, PLAYER_STATE } from '../../../../../Enum';
import EnemyManager from '../../../../../Base/EnemyManager';
import DataManager from '../../../../../Runtime/DataManager';
import WoodenSkeletonStateMachine from './WoodenSkeletonStateMachine';
import { Render } from '@eva/plugin-renderer-render';

export default class WoodenSkeletonManager extends EnemyManager {
  init(enemy: IEnemy) {
    this.gameObject.addComponent(new WoodenSkeletonStateMachine());
    this.gameObject.addComponent(
      new Render(
        new Render({
          zIndex: 1,
        }),
      ),
    );
    super.init(enemy);
    this.type = ENEMY_TYPE_ENUM.SKELETON_WOODEN;
    EventManager.Instance.on(EVENT_ENUM.PLAYER_MOVE_END, this.onAttack, this);
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

  onDestroy() {
    super.onDestroy();
    EventManager.Instance.off(EVENT_ENUM.PLAYER_MOVE_END, this.onAttack);
  }
}
