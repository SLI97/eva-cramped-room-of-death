import { Scene, GameObject } from '@eva/eva.js';
import BackgroundColor from './GameObjects/BackgroundColor/index';
import BattleManager from './BattleManager';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../index';
import Controller from './GameObjects/Controller/Controller';
import Footer from './GameObjects/Footer/index';

const Battle = () => {
  const scene = new Scene('battle');

  scene.transform.size.width = SCREEN_WIDTH;
  scene.transform.size.height = SCREEN_HEIGHT;

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

  scene.addChild(container);

  scene.addChild(Controller());
  scene.addChild(Footer());

  return scene;
};

export default Battle;
