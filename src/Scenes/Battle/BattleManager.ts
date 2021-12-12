import { Component, GameObject } from '@eva/eva.js';
import DataManager from '../../Runtime/DataManager';
import Levels, { ILevel } from '../../Levels/index';
import Background from './GameObjects/Background/Background';
import Player from './GameObjects/Player/Player';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../index';
import { TILE_HEIGHT, TILE_WIDTH } from './GameObjects/Tile/Tile';
import Door from './GameObjects/Door/Door';
import EntityManager from '../../Base/EntityManager';
import { ENEMY_TYPE_ENUM, EVENT_ENUM, PLAYER_STATE } from '../../Enum';
import WoodenSkeleton from './GameObjects/WoodenSkeleton/WoodenSkeleton';
import EventManager from '../../Runtime/EventManager';

export default class BattleManager extends Component {
  static componentName = 'BattleManager'; // 设置组件的名字
  childrens: Array<GameObject> = [];

  level: ILevel;

  init() {
    EventManager.Instance.on(EVENT_ENUM.PLAYER_MOVE_END, this.checkFinishCurLevel, this);
    EventManager.Instance.on(EVENT_ENUM.NEXT_LEVEL, this.nextLevel, this);
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
      console.log('level' + DataManager.Instance.levelIndex);
      // UIManager.Instance.fadeIn(200).then(() => {
      //防止把抖动效果带到下一关，导致下一关错位
      // this.isShaking = false;

      // CanvasManager.Ctx.fillStyle = `#000`;
      // CanvasManager.Ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
      // this.isLoaded = false;
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
      // this.gameObject.addChild(Door(this.level.door));
      // this.isLoaded = true;
      // UIManager.Instance.fadeOut(200);
      // });
      this.fixPos();
    } else {
      // this.sceneManager.setScene(new MainMenuScene(SceneManager.Instance));
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
        // enemy = new IronSkeleton(item);
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

  checkFinishCurLevel() {
    const { x: doorX, y: doorY, state: doorState } = DataManager.Instance.door;
    const { x: playerX, y: playerY } = DataManager.Instance.player;
    if (doorX === playerX && doorY === playerY && doorState === PLAYER_STATE.DEATH) {
      EventManager.Instance.emit(EVENT_ENUM.NEXT_LEVEL);
    }
  }

  nextLevel() {
    DataManager.Instance.levelIndex += 1;
      this.clearLevel();
    setTimeout(() => {
      this.initLevel();
    }, 1000);
  }

  fixPos() {
    const { mapRowCount, mapColumnCount } = DataManager.Instance;
    const disX = (SCREEN_WIDTH - TILE_WIDTH * mapRowCount) / 2;
    const disY = (SCREEN_HEIGHT - TILE_HEIGHT * mapColumnCount) / 2 - 50;
    this.gameObject.transform.position.x = disX;
    this.gameObject.transform.position.y = disY;
  }
}
