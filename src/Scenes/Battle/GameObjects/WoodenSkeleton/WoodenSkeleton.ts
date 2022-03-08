import { GameObject } from '@eva/eva.js';
import { IEntity } from '../../../../Levels';
import WoodenSkeletonManager from './Scripts/WoodenSkeletonManager';
import { Render } from '@eva/plugin-renderer-render';
import { ENTITY_HEIGHT, ENTITY_WIDTH } from '../../../../Base/EntityManager';

/***
 * 木骷髅
 * @param enemy
 * @constructor
 */
const WoodenSkeleton = (enemy: IEntity) => {
  const go = new GameObject('woodenSkeleton', {
    size: { width: ENTITY_WIDTH, height: ENTITY_HEIGHT },
  });

  go.addComponent(
    new Render({
      zIndex: 2,
    }),
  );
  go.addComponent(new WoodenSkeletonManager(enemy));

  return go;
};

export default WoodenSkeleton;
