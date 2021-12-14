import { Component, GameObject } from '@eva/eva.js';
import DataManager from '../../Runtime/DataManager';
import Levels, { IBurst, IDoor, IEnemy, ILevel, IPlayer, ISmoke, ISpikes } from '../../Levels/index';
import Background from './GameObjects/Background/Background';
import Player from './GameObjects/Player/Player';
import { game, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../index';
import { TILE_HEIGHT, TILE_WIDTH } from './GameObjects/Tile/Tile';
import Door from './GameObjects/Door/Door';
import EntityManager from '../../Base/EntityManager';
import { DIRECTION_ENUM, ENEMY_TYPE_ENUM, EVENT_ENUM, PLAYER_STATE, SHAKE_ENUM } from '../../Enum';
import WoodenSkeleton from './GameObjects/WoodenSkeleton/WoodenSkeleton';
import EventManager from '../../Runtime/EventManager';
import IronSkeleton from './GameObjects/IronSkeleton/IronSkeleton';
import SmokeManager from './GameObjects/Smoke/Scripts/SmokeManager';
import Smoke from './GameObjects/Smoke/Smoke';
import MenuScene from '../Menu';
import Burst from './GameObjects/Burst/Burst';
import Spikes from './GameObjects/Spikes/Spikes';
import SpikesManager from './GameObjects/Spikes/Scripts/SpikesManager';
import EnemyManager from '../../Base/EnemyManager';
import BurstManager from './GameObjects/Burst/Scripts/BurstManager';
import PlayerManager from './GameObjects/Player/Scripts/PlayerManager';

export default class BattleManager extends Component {
  static componentName = 'BattleManager'; // 设置组件的名字
  childrens: Array<GameObject> = [];
  isShaking: boolean;
  shakeType: SHAKE_ENUM;
  oldFrame: number;
  oldOffset: { x: number; y: number };

  level: ILevel;

  init() {
    EventManager.Instance.on(EVENT_ENUM.PLAYER_MOVE_END, this.checkFinishCurLevel, this);
    EventManager.Instance.on(EVENT_ENUM.NEXT_LEVEL, this.nextLevel, this);
    EventManager.Instance.on(EVENT_ENUM.RESTART_LEVEL, this.initLevel, this);
    EventManager.Instance.on(EVENT_ENUM.SCREEN_SHAKE, this.onShake, this);
    EventManager.Instance.on(EVENT_ENUM.REVOKE_STEP, this.revoke, this);
    EventManager.Instance.on(EVENT_ENUM.RECORD_STEP, this.record, this);
    this.initLevel();
  }

  clearLevel() {
    this.childrens.forEach(go => {
      this.gameObject.removeChild(go);
    });
  }

  initLevel() {
    const level = Levels['level' + DataManager.Instance.levelIndex];
    if (level) {
      DataManager.Instance.fm.fadeIn(200).then(() => {
        this.clearLevel();
        console.log('level' + DataManager.Instance.levelIndex);
        // 防止把抖动效果带到下一关，导致下一关错位
        this.isShaking = false;
        DataManager.Instance.reset();
        this.level = level;
        // //地图信息
        DataManager.Instance.mapInfo = this.level.mapInfo.concat();
        DataManager.Instance.mapRowCount = this.level.mapInfo.length || 0;
        DataManager.Instance.mapColumnCount = this.level.mapInfo[0].length || 0;

        this.generateBackground();
        this.generateDoor();
        this.generateEnemy();
        this.generatePlayer();

        this.generateBursts();
        this.generateSpikes();
        EventManager.Instance.emit(EVENT_ENUM.BATTLE_LOADED);

        this.fixPos();
        DataManager.Instance.fm.fadeOut(200);
      });
    } else {
      game.loadScene({
        scene: MenuScene(),
      });
    }
  }

  generateBackground() {
    const background = Background();
    this.gameObject.addChild(background);
    this.childrens.push(background);
  }

  generatePlayer() {
    if (!this.level.player) {
      DataManager.Instance.player = null;
      return;
    }
    const player = Player(this.level.player);
    this.gameObject.addChild(player);
    this.childrens.push(player);
    DataManager.Instance.player = player.getComponent(EntityManager);
  }

  generateEnemy() {
    if (!this.level.enemies) {
      DataManager.Instance.enemies = [];
      return;
    }
    const list = this.level.enemies.map(item => {
      let enemy = null;
      if (item.type === ENEMY_TYPE_ENUM.SKELETON_WOODEN) {
        enemy = WoodenSkeleton(item);
      } else if (item.type === ENEMY_TYPE_ENUM.SKELETON_IRON) {
        enemy = IronSkeleton(item);
      }
      this.gameObject.addChild(enemy);
      this.childrens.push(enemy);
      return enemy.getComponent(EntityManager);
    });
    DataManager.Instance.enemies = list;
  }

  generateBursts() {
    if (!this.level.bursts) {
      DataManager.Instance.bursts = [];
      return;
    }
    const list = this.level.bursts.map(item => {
      let enemy = null;
      if (item.type === ENEMY_TYPE_ENUM.BURST_FLOOR) {
        enemy = Burst(item);
      }
      this.gameObject.addChild(enemy);
      this.childrens.push(enemy);
      return enemy.getComponent(EntityManager);
    });
    DataManager.Instance.bursts = list;
  }

  generateSpikes() {
    if (!this.level.spikes) {
      DataManager.Instance.spikes = [];
      return;
    }
    const list = this.level.spikes.map(item => {
      const enemy = Spikes(item);
      this.gameObject.addChild(enemy);
      this.childrens.push(enemy);
      return enemy.getComponent(SpikesManager);
    });
    DataManager.Instance.spikes = list;
  }

  generateDoor() {
    if (!this.level.door) {
      DataManager.Instance.door = null;
      return;
    }
    const door = Door(this.level.door);
    this.gameObject.addChild(door);
    this.childrens.push(door);
    DataManager.Instance.door = door.getComponent(EntityManager);
  }

  generateSmoke(x: number, y: number, type: DIRECTION_ENUM) {
    const item = DataManager.Instance.smokes.find((smoke: SmokeManager) => smoke.state === PLAYER_STATE.DEATH);
    if (item) {
      item.x = x;
      item.y = y;
      item.state = PLAYER_STATE.IDLE;
      item.direction = type;
    } else {
      const smoke = Smoke({
        x: x,
        y: y,
        direction: type,
        state: PLAYER_STATE.IDLE,
      } as ISmoke);
      this.gameObject.addChild(smoke);
      this.childrens.push(smoke);
      DataManager.Instance.smokes.push(smoke.getComponent(SmokeManager));
    }
  }

  checkFinishCurLevel() {
    const { x: doorX, y: doorY, state: doorState } = DataManager.Instance.door;
    const { x: playerX, y: playerY } = DataManager.Instance.player;
    if (doorX === playerX && doorY === playerY && doorState === PLAYER_STATE.DEATH) {
      EventManager.Instance.emit(EVENT_ENUM.NEXT_LEVEL);
    }
  }

  nextLevel() {
    DataManager.Instance.levelIndex += 1;
    this.initLevel();
  }

  fixPos() {
    const { mapRowCount, mapColumnCount } = DataManager.Instance;
    const disX = (SCREEN_WIDTH - TILE_WIDTH * mapRowCount) / 2;
    const disY = (SCREEN_HEIGHT - TILE_HEIGHT * mapColumnCount) / 2 - 50;
    this.gameObject.transform.position.x = disX;
    this.gameObject.transform.position.y = disY;
  }

  onShake(type: SHAKE_ENUM) {
    if (this.isShaking) {
      return;
    }
    this.isShaking = true;
    this.shakeType = type;
    this.oldFrame = DataManager.Instance.frame;
    this.oldOffset = this.gameObject.transform.position;
  }

  /***
   *
   * @param shakeAmount 振幅
   * @param duration 持续时间
   * @param frequency 频率
   */
  onShakeUpdate(shakeAmount = 0.8, duration = 300, frequency = 6) {
    if (this.isShaking) {
      const frameOffset = ((DataManager.Instance.frame - this.oldFrame) / 60) * 1000;
      const Phase = ((DataManager.Instance.frame - this.oldFrame) / 60) * 2 * Math.PI * frequency;
      const offset = shakeAmount * Math.sin(Phase);
      if (this.shakeType === SHAKE_ENUM.TOP) {
        this.gameObject.transform.position.y = this.oldOffset.y - offset;
      } else if (this.shakeType === SHAKE_ENUM.BOTTOM) {
        this.gameObject.transform.position.y = this.oldOffset.y + offset;
      } else if (this.shakeType === SHAKE_ENUM.LEFT) {
        this.gameObject.transform.position.x = this.oldOffset.x - offset;
      } else if (this.shakeType === SHAKE_ENUM.RIGHT) {
        this.gameObject.transform.position.x = this.oldOffset.x + offset;
      }
      if (frameOffset > duration) {
        this.gameObject.transform.position.x = this.oldOffset.x;
        this.gameObject.transform.position.y = this.oldOffset.y;
        this.isShaking = false;
      }
    }
  }

  update() {
    this.onShakeUpdate();
  }

  revoke() {
    const data = DataManager.Instance.records.pop();
    if (data) {
      DataManager.Instance.player.x = DataManager.Instance.player.targetX = data.player.x;
      DataManager.Instance.player.y = DataManager.Instance.player.targetY = data.player.y;
      DataManager.Instance.player.state = data.player.state;
      DataManager.Instance.player.direction = data.player.direction;

      for (let i = 0; i < data.enemies.length; i++) {
        const item = data.enemies[i];
        DataManager.Instance.enemies[i].x = item.x;
        DataManager.Instance.enemies[i].y = item.y;
        DataManager.Instance.enemies[i].state = item.state;
        DataManager.Instance.enemies[i].direction = item.direction;
      }

      for (let i = 0; i < data.spikes.length; i++) {
        const item = data.spikes[i];
        DataManager.Instance.spikes[i].x = item.x;
        DataManager.Instance.spikes[i].y = item.y;
        DataManager.Instance.spikes[i].curPointCount = item.curPointCount;
        DataManager.Instance.spikes[i].direction = item.direction;
      }

      for (let i = 0; i < data.bursts.length; i++) {
        const item = data.bursts[i];
        DataManager.Instance.bursts[i].x = item.x;
        DataManager.Instance.bursts[i].y = item.y;
        DataManager.Instance.bursts[i].state = item.state;
      }

      DataManager.Instance.door.x = data.door.x;
      DataManager.Instance.door.y = data.door.y;
      DataManager.Instance.door.state = data.door.state;
      DataManager.Instance.door.direction = data.door.direction;
    } else {
      //TODO 播放游戏音频
    }
  }

  record() {
    const item: {
      player: IPlayer;
      door: IDoor;
      enemies: IEnemy[];
      spikes: ISpikes[];
      bursts: IBurst[];
    } = {
      player: {
        x: DataManager.Instance.player.targetX,
        y: DataManager.Instance.player.targetY,
        state:
          DataManager.Instance.player.state === PLAYER_STATE.ATTACK
            ? PLAYER_STATE.IDLE
            : DataManager.Instance.player.state,
        direction: DataManager.Instance.player.direction,
      },
      door: {
        x: DataManager.Instance.door.x,
        y: DataManager.Instance.door.y,
        state: DataManager.Instance.door.state,
        direction: DataManager.Instance.door.direction,
      },
      enemies: DataManager.Instance.enemies.map((i: EnemyManager) => {
        return {
          x: i.x,
          y: i.y,
          state: i.state,
          direction: i.direction,
        };
      }),
      spikes: DataManager.Instance.spikes.map((i: SpikesManager) => {
        return {
          x: i.x,
          y: i.y,
          curPointCount: i.curPointCount,
        };
      }),
      bursts: DataManager.Instance.bursts.map((i: BurstManager) => {
        return {
          x: i.x,
          y: i.y,
          state: i.state,
        };
      }),
    };

    DataManager.Instance.records.push(item);
  }
}
