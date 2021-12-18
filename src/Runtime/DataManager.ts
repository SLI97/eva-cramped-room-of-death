import Singleton from '../base/Singleton';
import TileManager from '../Scenes/Battle/GameObjects/Tile/TileManager';
import { IBurst, IDoor, IEnemy, IPlayer, ISpikes, ITile } from '../Levels';
import PlayerManager from '../Scenes/Battle/GameObjects/Player/Scripts/PlayerManager';
import EnemyManager from '../Base/EnemyManager';
import DoorManager from '../Scenes/Battle/GameObjects/Door/Scripts/DoorManager';
import FaderManager from '../Scenes/Battle/GameObjects/Fader/FaderManager';
import SpikesManager from '../Scenes/Battle/GameObjects/Spikes/Scripts/SpikesManager';
import BurstManager from '../Scenes/Battle/GameObjects/Burst/Scripts/BurstManager';
import SmokeManager from '../Scenes/Battle/GameObjects/Smoke/Scripts/SmokeManager';

export interface IRecord {
  player: IPlayer;
  door: IDoor;
  enemies: IEnemy[];
  spikes: ISpikes[];
  bursts: IBurst[];
}

/**
 * 全局数据管理类
 */
export default class DataManager extends Singleton {
  static get Instance() {
    return super.GetInstance(DataManager);
  }

  player: PlayerManager;
  enemies: EnemyManager[];
  spikes: SpikesManager[];
  bursts: BurstManager[];
  door: DoorManager;
  smokes: SmokeManager[];
  records: IRecord[];
  mapRowCount: number;
  mapColumnCount: number;
  levelIndex: number;
  frame: number = 0;
  mapInfo: Array<Array<ITile>> = []; //关卡的描述数据
  tileInfo: Array<Array<TileManager>> = []; //实例化出来的组件实例

  fm: FaderManager;

  constructor() {
    super();
    this.levelIndex = 2;
    this.reset();
  }

  reset() {
    //地图信息
    this.mapInfo = [];
    this.tileInfo = [];
    this.mapRowCount = 0;
    this.mapColumnCount = 0;

    //活动元素信息
    this.player = null;
    this.enemies = [];
    this.spikes = [];
    this.bursts = [];

    this.door = null;
    this.smokes = [];

    this.records = [];
  }
}
