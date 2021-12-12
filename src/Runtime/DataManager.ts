import Singleton from '../base/Singleton';
import TileManager from '../Scenes/Battle/GameObjects/Tile/TileManager';
import { ILevel, ITile } from '../Levels';

/**
 * 全局数据管理类
 */
export default class DataManager extends Singleton {
  static get Instance() {
    return super.GetInstance(DataManager);
  }

  player: any;
  enemies: any;
  spikes: any;
  bursts: any;
  door: any;
  smokes: any;
  records: any;
  mapRowCount: number;
  mapColumnCount: number;
  tileInfo: Array<Array<TileManager>>;
  mapInfo: Array<Array<ITile>>;
  levelIndex: number;

  constructor() {
    super();
    this.levelIndex = 1;
    this.tileInfo = [];
    this.reset();
  }

  reset() {
    //地图信息
    this.mapInfo = [];
    this.mapRowCount = 0;
    this.mapColumnCount = 0;

    //活动元素信息
    if (this.player) {
      this.player.unbind();
    }
    this.player = null;

    if (this.enemies instanceof Array && this.enemies.length) {
      this.enemies.forEach(i => {
        i.unbind();
      });
    }
    this.enemies = [];

    if (this.spikes instanceof Array && this.spikes.length) {
      this.spikes.forEach(i => {
        i.unbind();
      });
    }
    this.spikes = [];

    if (this.bursts instanceof Array && this.bursts.length) {
      this.bursts.forEach(i => {
        i.unbind();
      });
    }
    this.bursts = [];
    //
    if (this.door) {
      this.door.unbind();
    }
    this.door = null;
    this.smokes = [];

    this.records = [];
  }
}
