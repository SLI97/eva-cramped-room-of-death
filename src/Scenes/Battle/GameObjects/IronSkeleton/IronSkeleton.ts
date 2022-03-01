import { GameObject } from '@eva/eva.js';
import { IEnemy } from '../../../../Levels';
import IronSkeletonManager from './Scripts/IronSkeletonManager';
import { PLAYER_HEIGHT, PLAYER_WIDTH } from '../Player/Player';

/***
 * 铁骷髅
 * @param enemy
 * @constructor
 */
const IronSkeleton = (enemy: IEnemy) => {
  const go = new GameObject('ironSkeleton', {
    size: { width: PLAYER_WIDTH, height: PLAYER_HEIGHT },
  });

  go.addComponent(new IronSkeletonManager(enemy));

  return go;
};

export default IronSkeleton;
