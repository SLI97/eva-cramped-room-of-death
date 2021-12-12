import { GameObject } from '@eva/eva.js';
import { Graphics } from '@eva/plugin-renderer-graphics';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../../../index';
import { Render } from '@eva/plugin-renderer-render';
import FaderManager from './FaderManager';
import DataManager from '../../../../Runtime/DataManager';

const Fader = () => {
  const go = new GameObject('fader', {
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

  const outterGraphics = go.addComponent(new Graphics());
  go.addComponent(
    new Render({
      zIndex: 5,
      alpha: 0,
    }),
  );

  outterGraphics.graphics.beginFill(0x000000, 1);
  outterGraphics.graphics.drawRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
  outterGraphics.graphics.endFill();

  const fm = new FaderManager();
  go.addComponent(fm);
  DataManager.Instance.fm = fm;

  return go;
};

export default Fader;
