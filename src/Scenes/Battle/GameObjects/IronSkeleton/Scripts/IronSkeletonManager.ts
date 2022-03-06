import { IEntity } from '../../../../../Levels';
import EnemyManager from '../../../../../Base/EnemyManager';
import IronSkeletonStateMachine from './IronSkeletonStateMachine';

export default class IronSkeletonManager extends EnemyManager {
  static componentName = 'IronSkeletonManager'; // 设置组件的名字
  init(enemy: IEntity) {
    this.fsm = this.gameObject.addComponent(new IronSkeletonStateMachine());
    super.init(enemy);
  }
}
