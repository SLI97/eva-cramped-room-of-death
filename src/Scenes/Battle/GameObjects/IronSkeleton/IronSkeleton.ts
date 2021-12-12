import { GameObject } from '@eva/eva.js';
import { IEnemy } from '../../../../Levels';
import IronSkeletonManager from './Scripts/IronSkeletonManager';

const PLAYER_WIDTH = 128;
const PLAYER_HEIGHT = 128;

const IronSkeleton = (enemy: IEnemy) => {
  const go = new GameObject('ironSkeleton', {
    size: { width: PLAYER_WIDTH, height: PLAYER_HEIGHT },
    position: {
      x: 0,
      y: 0,
    },
    origin: {
      x: 0,
      y: 0,
    },
    anchor: {
      x: 0,
      y: 0,
    },
  });

  go.addComponent(new IronSkeletonManager(enemy));

  return go;
};

export default IronSkeleton;
