import { GameObject } from '@eva/eva.js';
import TileMapManager from './TileMapManager';
import { Render } from '@eva/plugin-renderer-render';

const TileMap = () => {
  const go = new GameObject('TileMap');

  go.addComponent(
    new Render({
      zIndex: 0,
      sortableChildren: true,
    }),
  );
  go.addComponent(new TileMapManager());

  return go;
};

export default TileMap;
