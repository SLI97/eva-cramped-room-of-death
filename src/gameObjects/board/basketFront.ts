import { GameObject } from '@eva/eva.js';
import { SpriteAnimation } from '@eva/plugin-renderer-sprite-animation'
export default function createBasketFront() {
  const basetFront = new GameObject('board', {
    size: {
      width: 166,
      height: 157,
    },
    position: {
      x: 80,
      y: -760,
    },
    anchor: {
      x: 0,
      y: 1,
    },
  });

  const anim = basetFront.addComponent(
    new SpriteAnimation({
      resource: 'boardIdle',
      speed: 100,
    })
  );

  const playAnim = () => {
    anim.resource = 'boardGoal';
    setTimeout(() => {
      anim.resource = 'boardIdle';
    }, 900);
  };

  return { basetFront, playAnim };
}
