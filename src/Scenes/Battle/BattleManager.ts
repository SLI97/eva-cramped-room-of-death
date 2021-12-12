import { Component, GameObject } from '@eva/eva.js';
import DataManager from '../../Runtime/DataManager';
import Levels, { ILevel, ISmoke } from '../../Levels/index';
import Background from './GameObjects/Background/Background';
import Player from './GameObjects/Player/Player';
import { game, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../index';
import { TILE_HEIGHT, TILE_WIDTH } from './GameObjects/Tile/Tile';
import Door from './GameObjects/Door/Door';
import EntityManager from '../../Base/EntityManager';
import { DIRECTION_ENUM, ENEMY_TYPE_ENUM, EVENT_ENUM, PLAYER_STATE } from '../../Enum';
import WoodenSkeleton from './GameObjects/WoodenSkeleton/WoodenSkeleton';
import EventManager from '../../Runtime/EventManager';
import IronSkeleton from './GameObjects/IronSkeleton/IronSkeleton';
import SmokeManager from './GameObjects/Smoke/Scripts/SmokeManager';
import Smoke from './GameObjects/Smoke/Smoke';
import MenuScene from '../Menu';

export default class BattleManager extends Component {
  static componentName = 'BattleManager'; // 设置组件的名字
  childrens: Array<GameObject> = [];

  level: ILevel;

  init() {
    EventManager.Instance.on(EVENT_ENUM.PLAYER_MOVE_END, this.checkFinishCurLevel, this);
    EventManager.Instance.on(EVENT_ENUM.NEXT_LEVEL, this.nextLevel, this);
    EventManager.Instance.on(EVENT_ENUM.RESTART_LEVEL, this.initLevel, this);
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
        //防止把抖动效果带到下一关，导致下一关错位
        // this.isShaking = false;
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

        // this.generateBursts();
        // this.generateSpikes();
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
}
