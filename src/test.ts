import resources from './resources';
import { Game, resource, GameObject, Scene, Component } from '@eva/eva.js';
import { RendererSystem } from '@eva/plugin-renderer';
import { SpriteAnimationSystem } from '@eva/plugin-renderer-sprite-animation';
import { SpriteSystem } from '@eva/plugin-renderer-sprite';
import { SpriteAnimation } from '@eva/plugin-renderer-sprite-animation';

// export const SCREEN_WIDTH = window.innerWidth;
// export const SCREEN_HEIGHT = window.innerHeight;
export const SCREEN_WIDTH = 375;
export const SCREEN_HEIGHT = 667;

resource.addResource(resources);

class Com extends Component {
  start() {
    const sa = this.gameObject.getComponent(SpriteAnimation);
    setTimeout(() => {
      sa.gotoAndStop(0);
      console.log(sa.gotoAndStop);
    }, 1000);
  }
}

function StartScene() {
  const scene = new Scene('Test');
  const obj = new GameObject('obj');
  obj.addComponent(
    new SpriteAnimation({
      autoPlay: true,
      forwards: true,
      resource: 'player_idle_top',
      speed: 1000 / 8,
    }),
  );

  obj.addComponent(Com);
  scene.addChild(obj);

  return scene;
}

export const game = new Game({
  systems: [
    new RendererSystem({
      canvas: document.querySelector('#canvas'),
      resolution: window.devicePixelRatio / 2,
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
      antialias: true,
    }),
    new SpriteAnimationSystem(),
    new SpriteSystem(),
  ],
});

resource.preload();
resource.on('complete', () => {
  game.loadScene({
    scene: StartScene(),
  });
});

window.game = game;
