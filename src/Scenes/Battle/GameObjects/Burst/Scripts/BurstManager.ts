import { IDoor } from '../../../../../Levels';
import EntityManager from '../../../../../Base/EntityManager';
import DataManager from '../../../../../Runtime/DataManager';
import { EVENT_ENUM, PLAYER_STATE } from '../../../../../Enum';
import EventManager from '../../../../../Runtime/EventManager';
import BurstStateMachine from './BurstStateMachine';
import { TILE_HEIGHT, TILE_WIDTH } from '../../Tile/Tile';

/***
 * 关卡门类
 */
export default class BurstManager extends EntityManager {
  init(door: IDoor) {
    this.gameObject.addComponent(new BurstStateMachine());
    super.init(door);
    EventManager.Instance.on(EVENT_ENUM.PLAYER_MOVE_END, this.onBurst, this);
  }

  unbind() {
    EventManager.Instance.off(EVENT_ENUM.PLAYER_MOVE_END, this.onBurst);
  }

  update() {
    this.gameObject.transform.position.x = this.x * TILE_WIDTH;
    this.gameObject.transform.position.y = this.y * TILE_HEIGHT;
  }

  onBurst() {
    //我都死了，别烦我了
    if (this.state === PLAYER_STATE.DEATH) {
      return;
    }
    const { targetX: curPlayerX, targetY: curPlayerY } = DataManager.Instance.player;
    if (this.x === curPlayerX && this.y === curPlayerY && this.state === PLAYER_STATE.IDLE) {
      this.state = PLAYER_STATE.ATTACK;
    } else if (this.state === PLAYER_STATE.ATTACK) {
      this.state = PLAYER_STATE.DEATH;
      //如果我裂开的时候你人在我上面，你直接狗带吧
      if (this.x === curPlayerX && this.y === curPlayerY) {
        EventManager.Instance.emit(EVENT_ENUM.ATTACK_PLAYER, PLAYER_STATE.AIRDEATH);
      }
    }
  }
}
