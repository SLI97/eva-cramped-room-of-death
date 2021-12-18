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
import { SpriteSystem } from '@eva/plugin-renderer-sprite';
import StartScene from './Scenes/Start';
import DataManager from './Runtime/DataManager';
// import { StatsSystem } from '@eva/plugin-stats';

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

game.ticker.add(() => {
  DataManager.Instance.frame++;
});

game.loadScene({
  scene: StartScene(),
});

// game.addSystem(new StatsSystem({
//   show: true ,// 这里设置是否显示，设为 false 不会运行。
//   style: { // 这里到数值全部都是宽度到百分比 vw 单位
//     x: 50,
//     y: 50,
//     width: 200,
//     height: 120
//   }
// }))

window.game = game;

// import  './test.ts'
