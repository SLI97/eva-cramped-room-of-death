import { GameObject } from '@eva/eva.js';
import { Sprite } from '@eva/plugin-renderer-sprite';
import { TILE_TYPE_ENUM } from '../../../../Enum';
import TileManager from './TileManager';
import { Render } from '@eva/plugin-renderer-render';

export const TILE_WIDTH = 32;
export const TILE_HEIGHT = 32;

const Tile = (type: TILE_TYPE_ENUM, imgSrc: string, i: number, j: number) => {
  const go = new GameObject('tile', {
    size: { width: TILE_WIDTH, height: TILE_HEIGHT },
    position: {
      x: i * TILE_WIDTH,
      y: j * TILE_HEIGHT,
    },
  });

  go.addComponent(
    new Render({
      zIndex: 0,
    }),
  );
  go.addComponent(
    new Sprite({
      resource: 'tile',
      spriteName: imgSrc,
    }),
  );

  go.addComponent(new TileManager(type));

  return go;
};

export default Tile;
