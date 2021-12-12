import Singleton from '../base/Singleton';
import TileManager from '../Scenes/Battle/GameObjects/Tile/TileManager';
import { ITile } from '../Levels';
import PlayerManager from '../Scenes/Battle/GameObjects/Player/Scripts/PlayerManager';
import EnemyManager from '../Base/EnemyManager';
import DoorManager from '../Scenes/Battle/GameObjects/Door/Scripts/DoorManager';
import FaderManager from '../Scenes/Battle/GameObjects/Fader/FaderManager';

/**
 * 全局数据管理类
 */
export default class DataManager extends Singleton {
  static get Instance() {
    return super.GetInstance(DataManager);
  }

  player: PlayerManager;
  enemies: EnemyManager[];
  spikes: any;
  bursts: any;
  door: DoorManager;
  smokes: any;
  records: any;
  mapRowCount: number;
  mapColumnCount: number;
  levelIndex: number;
  frame: number = 0;
  mapInfo: Array<Array<ITile>> = []; //关卡的描述数据
  tileInfo: Array<Array<TileManager>> = []; //实例化出来的组件实例

  fm: FaderManager;

  constructor() {
    super();
    this.levelIndex = 16;
    this.reset();
  }

  reset() {
    //地图信息
    this.mapInfo = [];
    this.tileInfo = [];
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

    if (this.door) {
      this.door.unbind();
    }
    this.door = null;
    this.smokes = [];

    this.records = [];
  }
}
