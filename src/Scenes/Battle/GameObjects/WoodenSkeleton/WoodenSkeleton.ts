import { GameObject } from '@eva/eva.js';
import { IEnemy } from '../../../../Levels';
import WoodenSkeletonManager from './Scripts/WoodenSkeletonManager';
import { PLAYER_HEIGHT, PLAYER_WIDTH } from '../Player/Player';

/***
 * 木骷髅
 * @param enemy
 * @constructor
 */
const WoodenSkeleton = (enemy: IEnemy) => {
  const go = new GameObject('woodenSkeleton', {
    size: { width: PLAYER_WIDTH, height: PLAYER_HEIGHT },
  });

  go.addComponent(new WoodenSkeletonManager(enemy));

  return go;
};

export default WoodenSkeleton;
