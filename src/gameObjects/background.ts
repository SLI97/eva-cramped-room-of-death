import { GameObject } from '@eva/eva.js';
import { Img } from '@eva/plugin-renderer-img'
export default function createBackground() {
  const bg = new GameObject('bg', {
    size: { width: 750, height: 1624 },
    origin: { x: 0.5, y: 1 },
    position: {
      x: 0,
      y: 120,
    },
    anchor: {
      x: 0.5,
      y: 1,
    },
  });

  bg.addComponent(
    new Img({
      resource: 'bg',
    })
  );
  return bg;
}
