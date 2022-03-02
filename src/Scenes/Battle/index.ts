import { Scene, GameObject } from '@eva/eva.js';
import BackgroundColor from './GameObjects/BackgroundColor/BackgroundColor';
import BattleManager from './BattleManager';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../index';
import Controller from './GameObjects/Controller/Controller';
import Footer from './GameObjects/Footer/index';
import { Render } from '@eva/plugin-renderer-render';
import Menu from './GameObjects/Menu/Menu';
import FaderManager from '../../Runtime/FaderManager';

/***
 * 游戏主场景
 * @constructor
 */
const BattleScene = () => {
  const scene = new Scene('BattleScene', {
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

  scene.addChild(BackgroundColor());

  const stage = new GameObject('stage');
  stage.addComponent(
    new Render({
      sortableChildren: true,
    }),
  );
  stage.addComponent(new BattleManager());

  scene.addChild(stage);
  scene.addChild(Controller());
  scene.addChild(Menu());
  scene.addChild(Footer());
  scene.addChild(FaderManager.Instance.createFader());

  //当Battle加载完成，才去掉mask，防止场景的物体和fader闪烁的问题
  // scene.addChild(Mask(scene));

  return scene;
};

export default BattleScene;
