import { GameObject } from '@eva/eva.js';
import { Img } from '@eva/plugin-renderer-img'
export default function createBall(position: any) {
  const ball = new GameObject('ball', {
    size: { width: 79, height: 79 },
    origin: { x: 0.5, y: 0.5 },
    position,
    anchor: {
      x: 0,
      y: 0,
    },
  });

  ball.addComponent(
    new Img({
      resource: 'basketball',
    })
  );
  return ball;
}
