import { IDoor } from '../../../../../Levels';
import EntityManager from '../../../../../Base/EntityManager';
import DoorStateMachine from './DoorStateMachine';
import DataManager from '../../../../../Runtime/DataManager';
import { PLAYER_STATE } from '../../../../../Enum';

/***
 * 关卡门类
 */
export default class DoorManager extends EntityManager {
  init(door: IDoor) {
    this.gameObject.addComponent(new DoorStateMachine());
    super.init(door);
  }

  // off() {
  //   EventManager.Instance.off(EVENT_ENUM.OPENDOOR, this.onOpenHandler)
  // }
  unbind() {}

  // onOpen() {
  // 	const enemies = DataManager.Instance.enemies.filter(enemy => enemy.state !== PLAYER_STATE.DEATH)
  // 	if (enemies.length === 0) {
  // 		this.state = PLAYER_STATE.DEATH
  // 	}
  // }

  //放在lateUpdate中，防止被resetTrigger
  lateUpdate() {
    //   update() {
    if (
      DataManager.Instance.enemies &&
      DataManager.Instance.enemies.every((enemy: EntityManager) => enemy.state === PLAYER_STATE.DEATH) &&
      this.state !== PLAYER_STATE.DEATH
    ) {
      this.state = PLAYER_STATE.DEATH;
    }
    // super.update();
  }
}
