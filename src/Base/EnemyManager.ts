import EntityManager from './EntityManager';
import { IEntity } from '../Levels';
import EventManager from '../Runtime/EventManager';
import { EVENT_ENUM } from '../Enum';
import { DIRECTION_ENUM, ENTITY_STATE_ENUM } from '../Enum';
import DataManager from '../Runtime/DataManager';

/***
 * 敌人基类，实现面朝人物和死亡
 */
export default abstract class EnemyManager extends EntityManager {
  init(params: IEntity) {
    super.init(params);
    EventManager.Instance.on(EVENT_ENUM.ATTACK_ENEMY, this.onDead, this);
    EventManager.Instance.on(EVENT_ENUM.PLAYER_MOVE_END, this.onChangeDirection, this);
  }

  onDestroy() {
    EventManager.Instance.off(EVENT_ENUM.ATTACK_ENEMY, this.onDead);
    EventManager.Instance.off(EVENT_ENUM.PLAYER_MOVE_END, this.onChangeDirection);
  }

  start() {
    this.onChangeDirection(true);
  }

  /***
   * 根据玩家在敌人的象限改变敌人的朝向
   */
  onChangeDirection(init = false) {
    if (this.state === ENTITY_STATE_ENUM.DEATH || !DataManager.Instance.player) {
      return;
    }
    const { x: playerX, y: playerY } = DataManager.Instance.player;
    const disX = Math.abs(playerX - this.x);
    const disY = Math.abs(playerY - this.y);

    //确保敌人在初始化的时候调整一次direction
    if (disX === disY && !init) {
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

  /***
   * 所有敌人都会接收到死亡事件，不过只有跟id跟自己相同的才会死亡
   * @param id
   */
  onDead(id: string) {
    if (this.state === ENTITY_STATE_ENUM.DEATH) {
      return;
    }
    if (this.id === id) {
      this.state = ENTITY_STATE_ENUM.DEATH;
    }
  }
}
