import { Component } from '@eva/eva.js';
import DataManager, { IRecord } from '../../Runtime/DataManager';
import Levels, { ILevel } from '../../Levels/index';
import Player from './GameObjects/Player/Player';
import { game, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../index';
import { TILE_HEIGHT, TILE_WIDTH } from './GameObjects/Tile/Tile';
import Door from './GameObjects/Door/Door';
import EntityManager from '../../Base/EntityManager';
import { DIRECTION_ENUM, ENTITY_TYPE_ENUM, EVENT_ENUM, ENTITY_STATE, SHAKE_ENUM } from '../../Enum';
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
import FaderManager, { DEFAULT_FADE_DURATION } from '../../Runtime/FaderManager';
import TileMap from './GameObjects/TileMap/TileMap';
import PlayerManager from './GameObjects/Player/Scripts/PlayerManager';
import DoorManager from './GameObjects/Door/Scripts/DoorManager';

export default class BattleManager extends Component {
  static componentName = 'BattleManager'; // 设置组件的名字
  isShaking: boolean;
  shakeType: SHAKE_ENUM;
  oldFrame: number;
  oldOffset: { x: number; y: number } = { x: 0, y: 0 };
  level: ILevel;
  hasInit = false;

  init() {
    DataManager.Instance.levelIndex = 10;

    EventManager.Instance.on(EVENT_ENUM.PLAYER_MOVE_END, this.checkArrived, this);
    EventManager.Instance.on(EVENT_ENUM.NEXT_LEVEL, this.nextLevel, this);
    EventManager.Instance.on(EVENT_ENUM.RESTART_LEVEL, this.initLevel, this);
    EventManager.Instance.on(EVENT_ENUM.SCREEN_SHAKE, this.onShake, this);
    EventManager.Instance.on(EVENT_ENUM.REVOKE_STEP, this.revoke, this);
    EventManager.Instance.on(EVENT_ENUM.RECORD_STEP, this.record, this);
    this.initLevel();
  }

  onDestroy() {
    EventManager.Instance.off(EVENT_ENUM.PLAYER_MOVE_END, this.checkArrived);
    EventManager.Instance.off(EVENT_ENUM.NEXT_LEVEL, this.nextLevel);
    EventManager.Instance.off(EVENT_ENUM.RESTART_LEVEL, this.initLevel);
    EventManager.Instance.off(EVENT_ENUM.SCREEN_SHAKE, this.onShake);
    EventManager.Instance.off(EVENT_ENUM.REVOKE_STEP, this.revoke);
    EventManager.Instance.off(EVENT_ENUM.RECORD_STEP, this.record);
  }

  async initLevel() {
    const level = Levels['level' + DataManager.Instance.levelIndex];
    if (level) {
      if (this.hasInit) {
        await FaderManager.Instance.fadeIn(DEFAULT_FADE_DURATION);
      } else {
        await FaderManager.Instance.mask();
      }
      this.hasInit = true;
      //触发舞台上一关元素的onDestory方法执行
      this.clearLevel();
      console.log('当前level:' + DataManager.Instance.levelIndex);
      // 防止把抖动效果带到下一关，导致下一关错位
      this.isShaking = false;
      DataManager.Instance.reset();
      this.level = level;
      // //地图信息
      DataManager.Instance.mapInfo = this.level.mapInfo;
      DataManager.Instance.mapRowCount = this.level.mapInfo.length || 0;
      DataManager.Instance.mapColumnCount = this.level.mapInfo[0]?.length || 0;

      this.generateTileMap();
      this.generateDoor();
      this.generateBursts();
      this.generateSpikes();
      this.generateEnemies();
      this.generatePlayer();
      await FaderManager.Instance.fadeOut(DEFAULT_FADE_DURATION);
    } else {
      await FaderManager.Instance.fadeIn(DEFAULT_FADE_DURATION);
      game.scene.destroy();
      game.loadScene({
        scene: MenuScene(),
      });
    }
  }

  clearLevel() {
    Array.from(this.gameObject.transform.children).forEach(({ gameObject }) => {
      gameObject.destroy();
    });
  }

  generateTileMap() {
    const map = TileMap();
    this.gameObject.addChild(map);
    //根据地图的大小，适配到屏幕中间
    this.adaptMapPos();
  }

  generatePlayer() {
    if (!this.level.player) {
      DataManager.Instance.player = null;
      return;
    }
    const player = Player(this.level.player);
    this.gameObject.addChild(player);
    DataManager.Instance.player = player.getComponent(EntityManager) as PlayerManager;
  }

  generateEnemies() {
    if (!this.level.enemies) {
      DataManager.Instance.enemies = [];
      return;
    }
    DataManager.Instance.enemies = this.level.enemies.map(item => {
      let enemy = null;
      if (item.type === ENTITY_TYPE_ENUM.SKELETON_WOODEN) {
        enemy = WoodenSkeleton(item);
      } else if (item.type === ENTITY_TYPE_ENUM.SKELETON_IRON) {
        enemy = IronSkeleton(item);
      }
      this.gameObject.addChild(enemy);
      return enemy.getComponent(EntityManager) as EnemyManager;
    });
  }

  generateBursts() {
    if (!this.level.bursts) {
      DataManager.Instance.bursts = [];
      return;
    }
    DataManager.Instance.bursts = this.level.bursts.map(item => {
      const enemy = Burst(item);
      this.gameObject.addChild(enemy);
      return enemy.getComponent(EntityManager) as BurstManager;
    });
  }

  generateSpikes() {
    if (!this.level.spikes) {
      DataManager.Instance.spikes = [];
      return;
    }
    DataManager.Instance.spikes = this.level.spikes.map(item => {
      const enemy = Spikes(item);
      this.gameObject.addChild(enemy);
      return enemy.getComponent(SpikesManager);
    });
  }

  generateDoor() {
    if (!this.level.door) {
      DataManager.Instance.door = null;
      return;
    }
    const door = Door(this.level.door);
    this.gameObject.addChild(door);
    DataManager.Instance.door = door.getComponent(EntityManager) as DoorManager;
  }

  generateSmoke(x: number, y: number, direction: DIRECTION_ENUM) {
    //把死了的烟雾拿出来循环利用
    const item = DataManager.Instance.smokes.find((smoke: SmokeManager) => smoke.state === ENTITY_STATE.DEATH);
    if (item) {
      item.x = x;
      item.y = y;
      item.state = ENTITY_STATE.IDLE;
      item.direction = direction;
    } else {
      const smoke = Smoke({
        x,
        y,
        direction,
        state: ENTITY_STATE.IDLE,
        type: ENTITY_TYPE_ENUM.SMOKE,
      });
      this.gameObject.addChild(smoke);
      DataManager.Instance.smokes.push(smoke.getComponent(SmokeManager));
    }
  }

  checkArrived() {
    const { x: doorX, y: doorY, state: doorState } = DataManager.Instance.door;
    const { x: playerX, y: playerY } = DataManager.Instance.player;
    if (doorX === playerX && doorY === playerY && doorState === ENTITY_STATE.DEATH) {
      EventManager.Instance.emit(EVENT_ENUM.NEXT_LEVEL);
    }
  }

  nextLevel() {
    DataManager.Instance.levelIndex += 1;
    this.initLevel();
  }

  adaptMapPos() {
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
    this.oldOffset.x = this.gameObject.transform.position.x;
    this.oldOffset.y = this.gameObject.transform.position.y;
  }

  /***
   *
   * @param shakeAmount 振幅
   * @param duration 持续时间
   * @param frequency 频率
   */
  onShakeUpdate(shakeAmount = 0.8, duration = 200, frequency = 6) {
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
        DataManager.Instance.spikes[i].count = item.count;
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
    const item: IRecord = {
      player: {
        x: DataManager.Instance.player.targetX,
        y: DataManager.Instance.player.targetY,
        state:
          DataManager.Instance.player.state === ENTITY_STATE.IDLE ||
          DataManager.Instance.player.state === ENTITY_STATE.DEATH ||
          DataManager.Instance.player.state === ENTITY_STATE.AIRDEATH
            ? DataManager.Instance.player.state
            : ENTITY_STATE.IDLE,
        direction: DataManager.Instance.player.direction,
        type: DataManager.Instance.player.type,
      },
      door: {
        x: DataManager.Instance.door.x,
        y: DataManager.Instance.door.y,
        state: DataManager.Instance.door.state,
        direction: DataManager.Instance.door.direction,
        type: DataManager.Instance.door.type,
      },
      enemies: DataManager.Instance.enemies.map(({ x, y, state, direction, type }) => {
        return {
          x,
          y,
          state,
          direction,
          type,
        };
      }),
      spikes: DataManager.Instance.spikes.map(({ x, y, count, type }) => {
        return {
          x,
          y,
          count,
          type,
        };
      }),
      bursts: DataManager.Instance.bursts.map(({ x, y, state, direction, type }) => {
        return {
          x,
          y,
          state,
          direction,
          type,
        };
      }),
    };

    DataManager.Instance.records.push(item);
  }
}
