import { GameObject } from '@eva/eva.js';
import ControllerButton from './ControllerButton';
import { CONTROLLER_ENUM } from '../../../../Enum/index';

const Controller = () => {
  const go = new GameObject('controller', {
    position: {
      x: 0,
      y: 0,
    },
    origin: {
      x: 0.5,
      y: 1,
    },
    anchor: {
      x: 0.5,
      y: 1,
    },
  });

  go.addChild(ControllerButton(CONTROLLER_ENUM.TURNLEFT, 1));
  go.addChild(ControllerButton(CONTROLLER_ENUM.LEFT, 2));
  go.addChild(ControllerButton(CONTROLLER_ENUM.TOP, 3));
  go.addChild(ControllerButton(CONTROLLER_ENUM.BOTTOM, 4));
  go.addChild(ControllerButton(CONTROLLER_ENUM.TURNRIGHT, 5));
  go.addChild(ControllerButton(CONTROLLER_ENUM.RIGHT, 6));

  return go;
};

export default Controller;
