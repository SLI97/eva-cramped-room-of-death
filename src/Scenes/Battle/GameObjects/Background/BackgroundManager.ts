import { Component, GameObject } from '@eva/eva.js';
import DataManager from '../../../../Runtime/DataManager';
import { randomByRange } from '../../../../Utils/index';
import Tile from '../Tile/Tile';
import TileManager from '../Tile/TileManager';

export default class BackgroundManager extends Component {
  static componentName = 'BackgroundManager'; // 设置组件的名字

  tileMap: Array<Array<GameObject>>;

  init() {
    this.initTile();
  }

  player() {}

  initTile() {
    this.tileMap = [];
    const { mapInfo, tileInfo } = DataManager.Instance;

    for (let i = 0; i < mapInfo.length; i++) {
      const colum = mapInfo[i];
      this.tileMap[i] = [];
      tileInfo[i] = [];
      for (let j = 0; j < colum.length; j++) {
        this.tileMap[i][j] = null;

        const item = colum[j];
        if (item.src === null) {
          continue;
        }
        let number = parseInt(item.src);
        if (number === 1 && i % 2 === 0 && j % 2 === 1) {
          number += randomByRange(0, 4);
        } else if (number === 5 && i % 2 === 0 && j % 2 === 1) {
          number += randomByRange(0, 4);
        } else if (number === 9 && i % 2 === 0 && j % 2 === 1) {
          number += randomByRange(0, 4);
        }

        const imgSrc = `bg (${number}).png`;
        const type = item.type;

        const tile = Tile(type, imgSrc, i, j);
        this.tileMap[i][j] = tile;
        tileInfo[i][j] = tile.getComponent(TileManager);
        this.gameObject.addChild(tile);
      }
    }
  }
}
