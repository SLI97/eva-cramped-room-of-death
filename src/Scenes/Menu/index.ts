import { Scene } from '@eva/eva.js';
import Title from './GameObjects/Title';
import Logo from './GameObjects/Logo';
import Creator from './GameObjects/Creator';
import Tips from './GameObjects/Tips';
import { SCREEN_WIDTH, SCREEN_HEIGHT, game } from '../../index';
import { Render } from '@eva/plugin-renderer-render';
import FaderManager from '../../Runtime/FaderManager';
import DataManager from '../../Runtime/DataManager';
import { Event } from '@eva/plugin-renderer-event';
import Battle from '../Battle';

/***
 * 菜单场景，展示Logo
 * @constructor
 */
const MenuScene = () => {
  const scene = new Scene('MenuScene', {
    size: {
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
    },
  });

  scene.addComponent(
    new Render({
      sortableChildren: true,
    }),
  );

  scene.addChild(Logo());
  scene.addChild(Logo());
  scene.addChild(Title());
  scene.addChild(Tips());
  scene.addChild(Creator());
  scene.addChild(FaderManager.Instance.createFader());
  //屏幕渐入
  FaderManager.Instance.fadeOut(1000);

  DataManager.Instance.levelIndex = 1;

  //点击屏幕加载游戏场景
  scene.addComponent(new Event()).on('touchstart', () => {
    FaderManager.Instance.fadeIn(300).then(() => {
      game.scene.destroy();
      game.loadScene({
        scene: Battle(),
      });
    });
  });

  return scene;
};

export default MenuScene;
