import { Scene, GameObject } from '@eva/eva.js';
import BackgroundColor from './GameObjects/BackgroundColor/BackgroundColor';
import BattleManager from './BattleManager';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../index';
import Controller from './GameObjects/Controller/Controller';
import Footer from './GameObjects/Footer/index';
import { Render } from '@eva/plugin-renderer-render';
import Fader from './GameObjects/Fader/Fader';
import Menu from './GameObjects/Menu/Menu';
import Mask from './GameObjects/Mask/Mask';

const Battle = () => {
  const scene = new Scene('battle');
  scene.transform.size.width = SCREEN_WIDTH;
  scene.transform.size.height = SCREEN_HEIGHT;
  scene.addComponent(
    new Render({
      sortableChildren: true,
    }),
  );

  scene.addChild(Fader());
  scene.addChild(BackgroundColor());

  const container = new GameObject('container', {
    position: {
      x: 0,
      y: 0,
    },
    origin: {
      x: 0,
      y: 0,
    },
    anchor: {
      x: 0,
      y: 0,
    },
  });

  container.addComponent(new BattleManager());
  container.addComponent(
    new Render({
      sortableChildren: true,
    }),
  );

  scene.addChild(container);

  scene.addChild(Controller());
  scene.addChild(Menu());
  scene.addChild(Footer());

  //当Battle加载完成，才去掉mask
  scene.addChild(Mask(scene));

  return scene;
};

export default Battle;
