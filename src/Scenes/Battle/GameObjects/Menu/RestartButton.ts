import { GameObject } from '@eva/eva.js';
import { Sprite } from '@eva/plugin-renderer-sprite';
import { START_BUTTON_HEIGHT, START_BUTTON_WIDTH } from './Menu';
import EventManager from '../../../../Runtime/EventManager';
import { EVENT_ENUM } from '../../../../Enum';
import { Event } from '@eva/plugin-renderer-event';

const RestartButton = () => {
  const go = new GameObject('restartButton', {
    size: { width: START_BUTTON_WIDTH, height: START_BUTTON_HEIGHT },
    position: {
      x: 0,
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
      spriteName: `ctrl (8).png`,
    }),
  );

  const eventManager = go.addComponent(new Event());

  eventManager.on('touchstart', () => {});

  const touchHandler = () => {
    EventManager.Instance.emit(EVENT_ENUM.RESTART_LEVEL);
  };

  eventManager.on('touchend', touchHandler);

  eventManager.on('touchendoutside', touchHandler);

  return go;
};

export default RestartButton;
