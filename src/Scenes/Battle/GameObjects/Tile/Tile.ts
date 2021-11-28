import { GameObject } from '@eva/eva.js';
import { Sprite } from '@eva/plugin-renderer-sprite';
import { TILE_TYPE_ENUM } from '../../../../Enum';
import TileManager from './TileManager';

export const TILE_WIDTH = 32;
export const TILE_HEIGHT = 32;

const Tile = (type: TILE_TYPE_ENUM, imgSrc: string, i: number, j: number) => {
  const go = new GameObject('tile', {
    size: { width: TILE_WIDTH, height: TILE_HEIGHT },
    position: {
      x: i * TILE_WIDTH,
      y: j * TILE_HEIGHT,
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

  go.addComponent(
    new Sprite({
      resource: 'tile',
      spriteName: imgSrc,
    }),
  );

  go.addComponent(new TileManager());

  return go;
};

export default Tile;
