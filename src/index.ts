import createBackground from './gameObjects/background';
import createBasketFront from './gameObjects/board/basketFront';
import createBoard from './gameObjects/board/board';
import createBall from './gameObjects/ball';
import createBtn from './gameObjects/btn';
import resources from './resources';

import { Game, resource } from '@eva/eva.js';
import { RendererSystem } from '@eva/plugin-renderer';
import { ImgSystem } from '@eva/plugin-renderer-img';
import { EventSystem } from '@eva/plugin-renderer-event';
import { SpriteAnimationSystem } from '@eva/plugin-renderer-sprite-animation';
import { RenderSystem } from '@eva/plugin-renderer-render';
import { TransitionSystem } from '@eva/plugin-transition';
import { GraphicsSystem } from '@eva/plugin-renderer-graphics';
import { TextSystem } from '@eva/plugin-renderer-text';

resource.addResource(resources);

const game = new Game({
  systems: [
    new RendererSystem({
      canvas: document.querySelector('#canvas'),
      width: 750,
      height: 1484,
      antialias: true,
    }),
    new ImgSystem(),
    new TransitionSystem(),
    new SpriteAnimationSystem(),
    new RenderSystem(),
    new EventSystem(),
    new GraphicsSystem(),
    new TextSystem(),
  ],
});

game.scene.transform.size.width = 750;
game.scene.transform.size.height = 1484;

const pos = {
  x: 500,
  y: 1100,
};

const ball = createBall(pos);
const { basetFront, playAnim } = createBasketFront();
const btn = createBtn({
  text: '投球',
  transform: {
    position: {
      x: 0,
      y: -120,
    },
    origin: {
      x: 0.5,
      y: 0.5,
    },
    anchor: {
      x: 0.5,
      y: 1,
    },
  },
  callback: () => {
    alert('还没做呢～一起来完善吧')
  },
});

game.scene.addChild(createBackground());
game.scene.addChild(createBoard());
game.scene.addChild(ball);
game.scene.addChild(basetFront);
game.scene.addChild(btn);

window.playAnim = playAnim;
window.game = game;
