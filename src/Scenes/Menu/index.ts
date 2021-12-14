import { Scene } from '@eva/eva.js';
import { Event } from '@eva/plugin-renderer-event';
import Title from './GameObjects/Title';
import Logo from './GameObjects/Logo';
import Creator from './GameObjects/Creator';
import Tips from './GameObjects/Tips';
import { SCREEN_WIDTH, SCREEN_HEIGHT, game } from '../../index';
import Battle from '../Battle/index';
import Fader from '../Battle/GameObjects/Fader/Fader';
import { Render } from '@eva/plugin-renderer-render';
import DataManager from '../../Runtime/DataManager';

const MenuScene = () => {
  const scene = new Scene('menu');

  scene.transform.size.width = SCREEN_WIDTH;
  scene.transform.size.height = SCREEN_HEIGHT;
  scene.addComponent(
    new Render({
      sortableChildren: true,
    }),
  );

  scene.addChild(Fader());
  DataManager.Instance.levelIndex = 1;
  DataManager.Instance.fm.fadeOut(1000);

  scene.addChild(Logo());
  scene.addChild(Title());
  scene.addChild(Tips());
  scene.addChild(Creator());

  const evt = scene.addComponent(new Event());

  evt.on('touchstart', () => {
    DataManager.Instance.fm.fadeIn(300).then(() => {
      game.loadScene({
        scene: Battle(),
      });
    });
  });

  return scene;
};

export default MenuScene;
