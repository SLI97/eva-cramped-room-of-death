import { GameObject } from '@eva/eva.js';
import { Img } from '@eva/plugin-renderer-img'
export default function createBasketBack() {
  const basketBack = new GameObject('basketBack', {
    size: {
      width: 166,
      height: 158,
    },
    position: {
      x: 65,
      y: 160,
    },
  });

  basketBack.addComponent(
    new Img({
      resource: 'basketBack',
    })
  );
  return basketBack;
}
