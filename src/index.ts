import resources from './resources';
import { Game, resource, LOAD_SCENE_MODE } from '@eva/eva.js';
import { RendererSystem } from '@eva/plugin-renderer';
import { ImgSystem } from '@eva/plugin-renderer-img';
import { EventSystem } from '@eva/plugin-renderer-event';
import { SpriteAnimationSystem } from '@eva/plugin-renderer-sprite-animation';
import { RenderSystem } from '@eva/plugin-renderer-render';
import { TransitionSystem } from '@eva/plugin-transition';
import { GraphicsSystem } from '@eva/plugin-renderer-graphics';
import { TextSystem } from '@eva/plugin-renderer-text';
// import MenuScene from './Scenes/Menu/index';
import { SpriteSystem } from '@eva/plugin-renderer-sprite';
import Battle from './Scenes/Battle';

// export const SCREEN_WIDTH = window.innerWidth;
// export const SCREEN_HEIGHT = window.innerHeight;
export const SCREEN_WIDTH = 375;
export const SCREEN_HEIGHT = 667;

resource.addResource(resources);

export const game = new Game({
  systems: [
    new RendererSystem({
      canvas: document.querySelector('#canvas'),
      resolution: window.devicePixelRatio / 2,
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
      antialias: true,
    }),
    new ImgSystem(),
    new TransitionSystem(),
    new SpriteAnimationSystem(),
    new RenderSystem(),
    new SpriteSystem(),
    new EventSystem(),
    new GraphicsSystem(),
    new TextSystem(),
  ],
});

game.loadScene({
  // scene: MenuScene(),
  scene: Battle(),
  type: LOAD_SCENE_MODE.SINGLE,
} as any);

// game.start();

// window.playAnim = playAnim;
window.game = game;
