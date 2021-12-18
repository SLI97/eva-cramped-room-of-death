import EntityManager from './EntityManager';
import { IEnemy } from '../Levels';
import EventManager from '../Runtime/EventManager';
import { ENEMY_TYPE_ENUM, EVENT_ENUM } from '../Enum';
import { DIRECTION_ENUM, PLAYER_STATE } from '../Enum';
import DataManager from '../Runtime/DataManager';

/***
 * 敌人基类，实现面朝人物和死亡
 */
export default class EnemyManager extends EntityManager {
  type: ENEMY_TYPE_ENUM;

  init(dto: IEnemy) {
    super.init(dto);
    EventManager.Instance.on(EVENT_ENUM.ATTACK_ENEMY, this.onDead, this);
    EventManager.Instance.on(EVENT_ENUM.PLAYER_MOVE_END, this.onChangeDirection, this);
  }

  start() {
    this.onChangeDirection(false);
  }

  onDestroy() {
    EventManager.Instance.off(EVENT_ENUM.ATTACK_ENEMY, this.onDead);
    EventManager.Instance.off(EVENT_ENUM.PLAYER_MOVE_END, this.onChangeDirection);
  }

  /***
   * 根据玩家在敌人的方位方便敌人的朝向
   */
  onChangeDirection(check = true) {
    if (this.state === PLAYER_STATE.DEATH || !DataManager.Instance.player) {
      return;
    }
    const { x: playerX, y: playerY } = DataManager.Instance.player;
    const disX = Math.abs(playerX - this.x);
    const disY = Math.abs(playerY - this.y);
    if (disX === disY && check) {
      return;
    }

    //第一象限
    if (playerX >= this.x && playerY <= this.y) {
      this.direction = disX >= disY ? DIRECTION_ENUM.RIGHT : DIRECTION_ENUM.TOP;

      //第二象限
    } else if (playerX <= this.x && playerY <= this.y) {
      this.direction = disX >= disY ? DIRECTION_ENUM.LEFT : DIRECTION_ENUM.TOP;

      //第三象限
    } else if (playerX <= this.x && playerY >= this.y) {
      this.direction = disX >= disY ? DIRECTION_ENUM.LEFT : DIRECTION_ENUM.BOTTOM;

      //第四象限
    } else if (playerX >= this.x && playerY >= this.y) {
      this.direction = disX >= disY ? DIRECTION_ENUM.RIGHT : DIRECTION_ENUM.BOTTOM;
    }
  }

  onDead(id: string) {
    if (this.state === PLAYER_STATE.DEATH) {
      return;
    }
    if (this.id === id) {
      this.state = PLAYER_STATE.DEATH;
    }
  }
}
