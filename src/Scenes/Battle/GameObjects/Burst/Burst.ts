import { GameObject } from '@eva/eva.js';
import { IBurst } from '../../../../Levels';
import BurstManager from './Scripts/BurstManager';
import { TILE_HEIGHT, TILE_WIDTH } from '../Tile/Tile';
import { getInitPosition } from '../../../../Utils';

const Burst = (burst: IBurst) => {
  const go = new GameObject('burst', {
    size: { width: TILE_WIDTH, height: TILE_HEIGHT },
    ...getInitPosition(),
  });

  go.addComponent(new BurstManager(burst));

  return go;
};

export default Burst;
