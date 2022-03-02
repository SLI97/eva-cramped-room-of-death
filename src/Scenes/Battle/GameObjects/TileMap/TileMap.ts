import { GameObject } from '@eva/eva.js';
import TileMapManager from './TileMapManager';

const TileMap = () => {
  const go = new GameObject('TileMap');

  go.addComponent(new TileMapManager());

  return go;
};

export default TileMap;
