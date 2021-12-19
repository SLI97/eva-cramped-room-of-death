import { IDoor } from '../../../../../Levels';
import EntityManager from '../../../../../Base/EntityManager';
import DoorStateMachine from './DoorStateMachine';
import DataManager from '../../../../../Runtime/DataManager';
import { MusicEnum, PLAYER_STATE } from '../../../../../Enum';
import { Sound } from '@eva/plugin-sound';

/***
 * 关卡门类
 */
export default class DoorManager extends EntityManager {
  init(door: IDoor) {
    this.gameObject.addComponent(new DoorStateMachine());
    this.sm = this.gameObject.addComponent(
      new Sound({ resource: MusicEnum.DOOR, loop: false, autoplay: false, volume: DataManager.Instance.volum }),
    );
    super.init(door);
  }

  onDestroy() {
    // EventManager.Instance.off(EVENT_ENUM.OPENDOOR, this.onOpenHandler)
  }

  //用事件中心来处理门时候打开的话，在撤回的情况下容易出bug，所以直接在update里判断是否打开门比较安全
  // onOpen() {
  // 	const enemies = DataManager.Instance.enemies.filter(enemy => enemy.state !== PLAYER_STATE.DEATH)
  // 	if (enemies.length === 0) {
  // 		this.state = PLAYER_STATE.DEATH
  // 	}
  // }

  //放在lateUpdate中，防止被resetTrigger
  lateUpdate() {
    if (
      DataManager.Instance.enemies &&
      DataManager.Instance.enemies.every((enemy: EntityManager) => enemy.state === PLAYER_STATE.DEATH) &&
      this.state !== PLAYER_STATE.DEATH
    ) {
      this.state = PLAYER_STATE.DEATH;
      this.sm.config.resource = MusicEnum.DOOR;
      Promise.resolve().then(() => {
        this.sm.play();
      });
    }
  }
}
