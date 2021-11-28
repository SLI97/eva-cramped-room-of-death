import { GameObject } from '@eva/eva.js';
import { Graphics } from '@eva/plugin-renderer-graphics';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../../../index';

const BG_COLOR = 0x140b28;

const Index = () => {
  const go = new GameObject('backgroundColor', {
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

  outterGraphics.graphics.beginFill(BG_COLOR, 1);
  outterGraphics.graphics.drawRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
  outterGraphics.graphics.endFill();

  return go;
};

export default Index;
