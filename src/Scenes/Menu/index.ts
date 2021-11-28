import { Scene, LOAD_SCENE_MODE } from '@eva/eva.js';
import { Event } from '@eva/plugin-renderer-event';
import Title from './GameObjects/Title';
import Logo from './GameObjects/Logo';
import Creator from './GameObjects/Creator';
import Tips from './GameObjects/Tips';
import { SCREEN_WIDTH, SCREEN_HEIGHT, game } from '../../index';
import Battle from '../Battle/index'

const MenuScene = () => {
  const scene = new Scene('menu');

  scene.transform.size.width = SCREEN_WIDTH;
  scene.transform.size.height = SCREEN_HEIGHT;

  scene.addChild(Logo());
  scene.addChild(Title());
  scene.addChild(Tips());
  scene.addChild(Creator());

  const evt = scene.addComponent(new Event());

  evt.on('touchstart', e => {
    game.loadScene({
      scene: Battle(),
      type: LOAD_SCENE_MODE.SINGLE,
    } as any);
  });

  return scene;
};

export default MenuScene;
