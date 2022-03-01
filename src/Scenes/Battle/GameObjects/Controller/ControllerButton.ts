import { GameObject } from '@eva/eva.js';
import { Sprite } from '@eva/plugin-renderer-sprite';
import { CONTROLLER_ENUM, EVENT_ENUM } from '../../../../Enum';
import EventManager from '../../../../Runtime/EventManager';
import { Event } from '@eva/plugin-renderer-event';
import { Transition } from '@eva/plugin-transition';

const CTRL_WIDTH = 70;
const CTRL_HEIGHT = 60;
const GAP_HEIGHT = 3;

const getPosition = (index: number) => {
  const xAxis = Math.floor((index - 1) / 2);
  const yAxis = (index - 1) % 2;
  return {
    x: (xAxis - 1) * CTRL_WIDTH,
    y: yAxis * (CTRL_HEIGHT + GAP_HEIGHT),
  };
};

const ControllerButton = (type: CONTROLLER_ENUM, index: number) => {
  const go = new GameObject('button', {
    size: { width: CTRL_WIDTH, height: CTRL_HEIGHT },
    position: getPosition(index),
    origin: {
      x: 0.5,
      y: 0.5,
    },
    anchor: {
      x: 0.5,
      y: 1,
    },
  });

  go.addComponent(
    new Sprite({
      resource: 'ctrl',
      spriteName: `ctrl (${index}).png`,
    }),
  );

  const animation = go.addComponent(new Transition());
  animation.group = {
    big: [
      {
        name: 'scale.x',
        component: go.transform,
        values: [
          {
            time: 0,
            value: 0.9,
            tween: 'ease-out',
          },
          {
            time: 100,
            value: 1,
            tween: 'ease-in',
          },
        ],
      },
      {
        name: 'scale.y',
        component: go.transform,
        values: [
          {
            time: 0,
            value: 0.9,
            tween: 'ease-out',
          },
          {
            time: 100,
            value: 1,
            tween: 'ease-in',
          },
        ],
      },
    ],
    small: [
      {
        name: 'scale.x',
        component: go.transform,
        values: [
          {
            time: 0,
            value: 1,
            tween: 'ease-out',
          },
          {
            time: 100,
            value: 0.9,
            tween: 'ease-in',
          },
        ],
      },
      {
        name: 'scale.y',
        component: go.transform,
        values: [
          {
            time: 0,
            value: 1,
            tween: 'ease-out',
          },
          {
            time: 100,
            value: 0.9,
            tween: 'ease-in',
          },
        ],
      },
    ],
  };

  const eventManager = go.addComponent(new Event());

  eventManager.on('touchstart', () => {
    animation.play('small', 1);
  });

  const touchHandler = () => {
    animation.play('big', 1);
    EventManager.Instance.emit(EVENT_ENUM.PLAYER_CTRL, type);
  };

  eventManager.on('touchend', touchHandler);

  eventManager.on('touchendoutside', touchHandler);

  return go;
};

export default ControllerButton;
