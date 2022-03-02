import { GameObject } from '@eva/eva.js';
import { IEntity } from '../../../../Levels';
import WoodenSkeletonManager from './Scripts/WoodenSkeletonManager';
import { PLAYER_HEIGHT, PLAYER_WIDTH } from '../Player/Player';
import { Render } from '@eva/plugin-renderer-render';

/***
 * 木骷髅
 * @param enemy
 * @constructor
 */
const WoodenSkeleton = (enemy: IEntity) => {
  const go = new GameObject('woodenSkeleton', {
    size: { width: PLAYER_WIDTH, height: PLAYER_HEIGHT },
  });

  go.addComponent(
    new Render({
      zIndex: 1,
    }),
  );
  go.addComponent(new WoodenSkeletonManager(enemy));

  return go;
};

export default WoodenSkeleton;
