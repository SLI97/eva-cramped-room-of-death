import { GameObject } from '@eva/eva.js';
import { IEntity } from '../../../../Levels';
import IronSkeletonManager from './Scripts/IronSkeletonManager';
import { ENTITY_HEIGHT, ENTITY_WIDTH } from '../Player/Player';
import { Render } from '@eva/plugin-renderer-render';

/***
 * 铁骷髅
 * @param enemy
 * @constructor
 */
const IronSkeleton = (enemy: IEntity) => {
  const go = new GameObject('ironSkeleton', {
    size: { width: ENTITY_WIDTH, height: ENTITY_HEIGHT },
  });

  go.addComponent(
    new Render({
      zIndex: 1,
    }),
  );
  go.addComponent(new IronSkeletonManager(enemy));

  return go;
};

export default IronSkeleton;
