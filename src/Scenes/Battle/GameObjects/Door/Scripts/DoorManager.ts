import { IEntity } from '../../../../../Levels';
import EntityManager from '../../../../../Base/EntityManager';
import DoorStateMachine from './DoorStateMachine';
import DataManager from '../../../../../Runtime/DataManager';
import { ENTITY_STATE_ENUM, EVENT_ENUM } from '../../../../../Enum';
import EventManager from '../../../../../Runtime/EventManager';

/***
 * 关卡门类
 */
export default class DoorManager extends EntityManager {
  static componentName = 'DoorManager'; // 设置组件的名字

  init(door: IEntity) {
    this.fsm = this.gameObject.addComponent(new DoorStateMachine());
    super.init(door);

    EventManager.Instance.on(EVENT_ENUM.DOOR_OPEN, this.onOpen, this);
  }

  onDestroy() {
    EventManager.Instance.off(EVENT_ENUM.DOOR_OPEN, this.onOpen);
  }

  onOpen() {
    if (
      DataManager.Instance.enemies.every((enemy: EntityManager) => enemy.state === ENTITY_STATE_ENUM.DEATH) &&
      this.state !== ENTITY_STATE_ENUM.DEATH
    ) {
      this.state = ENTITY_STATE_ENUM.DEATH;
    }
  }
}
