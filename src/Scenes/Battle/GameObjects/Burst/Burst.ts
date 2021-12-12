import { GameObject } from '@eva/eva.js';
import { IBurst } from '../../../../Levels';
import BurstManager from './Scripts/BurstManager';
import { TILE_HEIGHT, TILE_WIDTH } from '../Tile/Tile';

const Burst = (burst: IBurst) => {
  const go = new GameObject('door', {
    size: { width: TILE_WIDTH, height: TILE_HEIGHT },
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

  go.addComponent(new BurstManager(burst));

  return go;
};

export default Burst;
