import { IEntity } from '../../../../../Levels';
import EntityManager from '../../../../../Base/EntityManager';
import DataManager from '../../../../../Runtime/DataManager';
import { EVENT_ENUM, ENTITY_STATE, SHAKE_ENUM } from '../../../../../Enum';
import EventManager from '../../../../../Runtime/EventManager';
import BurstStateMachine from './BurstStateMachine';
import { TILE_HEIGHT, TILE_WIDTH } from '../../Tile/Tile';

/***
 * 地裂类
 */
export default class BurstManager extends EntityManager {
  init(burst: IEntity) {
    this.fsm = this.gameObject.addComponent(new BurstStateMachine());
    super.init(burst);
    EventManager.Instance.on(EVENT_ENUM.PLAYER_MOVE_END, this.onBurst, this);
  }

  onDestroy() {
    EventManager.Instance.off(EVENT_ENUM.PLAYER_MOVE_END, this.onBurst);
  }

  update() {
    this.gameObject.transform.position.x = this.x * TILE_WIDTH;
    this.gameObject.transform.position.y = this.y * TILE_HEIGHT;
  }

  onBurst() {
    //我都死了，别烦我了
    if (this.state === ENTITY_STATE.DEATH) {
      return;
    }
    const { targetX: playerX, targetY: playerY } = DataManager.Instance.player;
    if (this.x === playerX && this.y === playerY && this.state === ENTITY_STATE.IDLE) {
      this.state = ENTITY_STATE.ATTACK;
    } else if (this.state === ENTITY_STATE.ATTACK) {
      this.state = ENTITY_STATE.DEATH;
      EventManager.Instance.emit(EVENT_ENUM.SCREEN_SHAKE, SHAKE_ENUM.BOTTOM);
      //如果我裂开的时候你人在我上面，你直接狗带吧
      if (this.x === playerX && this.y === playerY) {
        EventManager.Instance.emit(EVENT_ENUM.ATTACK_PLAYER, ENTITY_STATE.AIRDEATH);
      }
    }
  }
}
