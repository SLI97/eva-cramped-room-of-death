import { GameObject } from '@eva/eva.js';
import { Img } from '@eva/plugin-renderer-img'

export default function createBackboard() {
  const backboard = new GameObject('backboard', {
    size: {
      width: 100,
      height: 238,
    },
  });

  backboard.addComponent(
    new Img({
      resource: 'backboard',
    })
  );
  return backboard;
}
