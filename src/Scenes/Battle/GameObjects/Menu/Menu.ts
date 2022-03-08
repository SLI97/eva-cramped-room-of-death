import { GameObject } from '@eva/eva.js';
import { Render } from '@eva/plugin-renderer-render';
import RestartButton from './RestartButton';
import UndoButton from './UndoButton';
import OutButton from './OutButton';

export const START_BUTTON_WIDTH = 50 * 1.1;
export const START_BUTTON_HEIGHT = 64 * 1.1;

const Menu = () => {
  const go = new GameObject('menu', {
    position: {
      x: 0,
      y: 34,
    },
    origin: {
      x: 0.5,
      y: 0.5,
    },
    anchor: {
      x: 0.5,
      y: 0,
    },
  });

  go.addChild(UndoButton());
  go.addChild(RestartButton());
  go.addChild(OutButton());

  go.addComponent(
    new Render({
      zIndex: 0,
    }),
  );

  return go;
};

export default Menu;
