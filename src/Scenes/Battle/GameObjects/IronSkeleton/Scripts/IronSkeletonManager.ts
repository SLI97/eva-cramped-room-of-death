import { IEntity } from '../../../../../Levels';
import EnemyManager from '../../../../../Base/EnemyManager';
import IronSkeletonStateMachine from './IronSkeletonStateMachine';

export default class IronSkeletonManager extends EnemyManager {
  init(enemy: IEntity) {
    this.fsm = this.gameObject.addComponent(new IronSkeletonStateMachine());
    super.init(enemy);
  }
}
