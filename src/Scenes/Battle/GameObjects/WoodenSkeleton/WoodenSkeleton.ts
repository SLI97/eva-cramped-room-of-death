import { GameObject } from '@eva/eva.js';
import { IEnemy } from '../../../../Levels';
import WoodenSkeletonManager from './Scripts/WoodenSkeletonManager';
import { getInitPosition } from '../../../../Utils';

const PLAYER_WIDTH = 128;
const PLAYER_HEIGHT = 128;

/***
 * 木骷髅
 * @param enemy
 * @constructor
 */
const WoodenSkeleton = (enemy: IEnemy) => {
  const go = new GameObject('woodenSkeleton', {
    size: { width: PLAYER_WIDTH, height: PLAYER_HEIGHT },
    ...getInitPosition(),
  });

  go.addComponent(new WoodenSkeletonManager(enemy));

  return go;
};

export default WoodenSkeleton;
