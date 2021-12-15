import { GameObject } from '@eva/eva.js';
import { IEnemy } from '../../../../Levels';
import IronSkeletonManager from './Scripts/IronSkeletonManager';
import { getInitPosition } from '../../../../Utils';

const PLAYER_WIDTH = 128;
const PLAYER_HEIGHT = 128;

/***
 * 铁骷髅
 * @param enemy
 * @constructor
 */
const IronSkeleton = (enemy: IEnemy) => {
  const go = new GameObject('ironSkeleton', {
    size: { width: PLAYER_WIDTH, height: PLAYER_HEIGHT },
   ...getInitPosition(),
  });

  go.addComponent(new IronSkeletonManager(enemy));

  return go;
};

export default IronSkeleton;
