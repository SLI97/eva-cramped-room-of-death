import { IEntity } from '../../../../../Levels';
import EntityManager from '../../../../../Base/EntityManager';
import DoorStateMachine from './DoorStateMachine';
import DataManager from '../../../../../Runtime/DataManager';
import { ENTITY_STATE } from '../../../../../Enum';

/***
 * 关卡门类
 */
export default class DoorManager extends EntityManager {
  init(door: IEntity) {
    this.fsm = this.gameObject.addComponent(new DoorStateMachine());
    super.init(door);
  }

  //放在lateUpdate中，防止被resetTrigger
  lateUpdate() {
    if (
      DataManager.Instance.enemies &&
      DataManager.Instance.enemies.every((enemy: EntityManager) => enemy.state === ENTITY_STATE.DEATH) &&
      this.state !== ENTITY_STATE.DEATH
    ) {
      this.state = ENTITY_STATE.DEATH;
    }
  }
}
