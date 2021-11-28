import { Component } from '@eva/eva.js';
import DataManager from '../../Runtime/DataManager';
import Levels, { ILevel } from '../../Levels/index';
import Background from './GameObjects/Background/Background';
import Player from './GameObjects/Player/Player';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../index';
import { TILE_HEIGHT, TILE_WIDTH } from './GameObjects/Tile/Tile';
import Door from './GameObjects/Door/Door';

export default class BattleManager extends Component {
  static componentName = 'BattleManager'; // 设置组件的名字

  level: ILevel;

  init() {
    this.initLevel();
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
      // DataManager.Instance.reset();
      this.level = level;
      // //地图信息
      DataManager.Instance.mapInfo = this.level.mapInfo.concat();
      DataManager.Instance.mapRowCount = this.level.mapInfo.length || 0;
      DataManager.Instance.mapColumnCount = this.level.mapInfo[0].length || 0;
      // this.adaptScreen();

      // this.gameObject.addChild(Background());
      this.gameObject.addChild(Player(this.level.player));
      // this.generateEnemy();
      // this.generateBursts();
      // this.generateSpikes();
      // this.generateDoor();
      // this.gameObject.addChild(Door(this.level.door));
      // this.isLoaded = true;
      // UIManager.Instance.fadeOut(200);
      // });
      this.fixPos();
    } else {
      // this.sceneManager.setScene(new MainMenuScene(SceneManager.Instance));
    }
  }

  fixPos() {
    const { mapRowCount, mapColumnCount } = DataManager.Instance;
    const disX = (SCREEN_WIDTH - TILE_WIDTH * mapRowCount) / 2;
    const disY = (SCREEN_HEIGHT - TILE_HEIGHT * mapColumnCount) / 2 - 50;
    this.gameObject.transform.position.x = disX;
    this.gameObject.transform.position.y = disY;
  }
}
