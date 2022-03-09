import { Scene } from '@eva/eva.js';
import Title from './GameObjects/Title';
import Logo from './GameObjects/Logo';
import Creator from './GameObjects/Creator';
import Tips from './GameObjects/Tips';
import { SCREEN_WIDTH, SCREEN_HEIGHT, game } from '../../index';
import { Render } from '@eva/plugin-renderer-render';
import FaderManager from '../../Runtime/FaderManager';
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
  scene.addChild(Title());
  scene.addChild(Tips());
  scene.addChild(Creator());
  scene.addChild(FaderManager.Instance.createFader());
  //屏幕渐入
  FaderManager.Instance.fadeOut(1000);

  //点击屏幕加载游戏场景
  const touchHandle = () => {
    FaderManager.Instance.fadeIn(300).then(() => {
      game.scene.destroy();
      game.loadScene({
        scene: Battle(),
      });
    });
  };
  const evt = scene.addComponent(new Event());
  //防止用户疯狂点击，不断触发touchHandle函数形成不断fading
  evt.once('touchend', touchHandle);
  evt.once('touchendoutside', touchHandle);

  return scene;
};

export default MenuScene;
