import { IEntity } from '../../../../../Levels';
import SmokeStateMachine from './SmokeStateMachine';
import EntityManager from '../../../../../Base/EntityManager';

export default class SmokeManager extends EntityManager {
  static componentName = 'SmokeManager'; // 设置组件的名字
  init(smoke: IEntity) {
    this.fsm = this.gameObject.addComponent(new SmokeStateMachine());
    super.init(smoke);
  }
}
