import { GameObject } from '@eva/eva.js';
import { Sprite } from '@eva/plugin-renderer-sprite';

const Logo = () => {
  const go = new GameObject('logo', {
    size: { width: 200, height: 200 },
    origin: { x: 0.5, y: 0.5 },
    position: {
      x: 0,
      y: -100,
    },
    anchor: {
      x: 0.5,
      y: 0.5,
    },
  });

  go.addComponent(
    new Sprite({
      resource: 'ctrl',
      spriteName: 'ctrl (7).png',
    }),
  );

  return go;
};
export default Logo;
