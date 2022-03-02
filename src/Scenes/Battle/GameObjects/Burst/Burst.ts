import { GameObject } from '@eva/eva.js';
import { IEntity } from '../../../../Levels';
import BurstManager from './Scripts/BurstManager';
import { TILE_HEIGHT, TILE_WIDTH } from '../Tile/Tile';
import { Render } from '@eva/plugin-renderer-render';

const Burst = (burst: IEntity) => {
  const go = new GameObject('burst', {
    size: { width: TILE_WIDTH, height: TILE_HEIGHT },
  });

  go.addComponent(new Render());
  go.addComponent(new BurstManager(burst));

  return go;
};

export default Burst;
