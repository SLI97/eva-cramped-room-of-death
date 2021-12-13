import { GameObject } from '@eva/eva.js';
import { Sprite } from '@eva/plugin-renderer-sprite';
import { START_BUTTON_HEIGHT, START_BUTTON_WIDTH } from './Menu';
import { EVENT_ENUM } from '../../../../Enum';
import EventManager from '../../../../Runtime/EventManager';
import { Event } from '@eva/plugin-renderer-event';
// import { Transition } from '@eva/plugin-transition';

const UndoButton = () => {
  const go = new GameObject('restartButton', {
    size: { width: START_BUTTON_WIDTH, height: START_BUTTON_HEIGHT },
    position: {
      x: -90,
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
      spriteName: `ctrl (9).png`,
    }),
  );

  //
  const eventManager = go.addComponent(new Event());

  eventManager.on('touchstart', () => {});

  const touchHandler = () => {
    EventManager.Instance.emit(EVENT_ENUM.REVOKE_STEP);
  };

  eventManager.on('touchend', touchHandler);

  eventManager.on('touchendoutside', touchHandler);

  return go;
};

export default UndoButton;
