import EntityManager from './EntityManager';
import { IEntity } from '../Levels';
import EventManager from '../Runtime/EventManager';
import { EVENT_ENUM } from '../Enum';
import { DIRECTION_ENUM, PLAYER_STATE } from '../Enum';
import DataManager from '../Runtime/DataManager';

/***
 * 敌人基类，实现面朝人物和死亡
 */
export default class EnemyManager extends EntityManager {
  init(dto: IEntity) {
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

    //确保敌人在初始化的时候调整一次direction
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

  /***
   * 所有敌人都会接收到死亡事件，不过只有跟id跟自己相同的才会死亡
   * @param id
   */
  onDead(id: string) {
    if (this.state === PLAYER_STATE.DEATH) {
      return;
    }
    if (this.id === id) {
      this.state = PLAYER_STATE.DEATH;
    }
  }
}
