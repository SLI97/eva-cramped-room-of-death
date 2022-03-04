import { Component } from '@eva/eva.js';
import DataManager from '../../../../Runtime/DataManager';
import { randomByRange } from '../../../../Utils';
import Tile from '../Tile/Tile';
import TileManager from '../Tile/TileManager';

export default class TileMapManager extends Component {
  static componentName = 'TileMapManager'; // 设置组件的名字

  init() {
    this.initTile();
  }

  initTile() {
    const { mapInfo } = DataManager.Instance;

    DataManager.Instance.tileInfo = [];
    for (let i = 0; i < mapInfo.length; i++) {
      const column = mapInfo[i];
      DataManager.Instance.tileInfo[i] = [];
      for (let j = 0; j < column.length; j++) {
        const item = column[j];
        if (item.src === null || item.type === null) {
          continue;
        }

        //number为1、5、9的tile有多种图片，随机挑一张图来渲染
        //i%2和j%2仅仅是为了让随机的个数少一点，这样就保留更多的纯色砖块，地面看出来不会太突兀
        let number = item.src;
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
        this.gameObject.addChild(tile);
        DataManager.Instance.tileInfo[i][j] = tile.getComponent(TileManager);
      }
    }
  }
}
