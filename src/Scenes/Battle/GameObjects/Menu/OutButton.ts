import { GameObject } from '@eva/eva.js';
import { Sprite } from '@eva/plugin-renderer-sprite';
import { Event } from '@eva/plugin-renderer-event';
import { START_BUTTON_HEIGHT, START_BUTTON_WIDTH } from './Menu';
import { game } from '../../../../index';
import MenuScene from '../../../Menu';

const OutButton = () => {
  const go = new GameObject('restartButton', {
    size: { width: START_BUTTON_WIDTH, height: START_BUTTON_HEIGHT },
    position: {
      x: 90,
      y: 20,
    },
    origin: {
      x: 0.5,
      y: 0.5,
    },
    anchor: {
      x: 0.5,
      y: 0.5,
    },
  });

  go.addComponent(
    new Sprite({
      resource: 'ctrl',
      spriteName: 'ctrl (10).png',
    }),
  );

  const eventManager = go.addComponent(new Event());
  const touchHandler = () => {
    game.scene.destroy();
    game.loadScene({
      scene: MenuScene(),
    });
  };
  eventManager.on('touchend', touchHandler);
  eventManager.on('touchendoutside', touchHandler);

  return go;
};

export default OutButton;
