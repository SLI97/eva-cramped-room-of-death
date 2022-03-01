import { IEnemy } from '../../../../../Levels';
import { ENEMY_TYPE_ENUM } from '../../../../../Enum';
import EnemyManager from '../../../../../Base/EnemyManager';
import IronSkeletonStateMachine from './IronSkeletonStateMachine';
import { Render } from '@eva/plugin-renderer-render';

export default class IronSkeletonManager extends EnemyManager {
  init(enemy: IEnemy) {
    this.fsm = this.gameObject.addComponent(new IronSkeletonStateMachine());
    this.gameObject.addComponent(
      new Render({
        zIndex: 1,
      }),
    );
    super.init(enemy);
    this.type = ENEMY_TYPE_ENUM.SKELETON_IRON;
  }
}
