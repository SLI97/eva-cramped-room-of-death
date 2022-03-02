import { game, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../index';
import { Scene, resource, LOAD_EVENT, GameObject } from '@eva/eva.js';
import { Graphics } from '@eva/plugin-renderer-graphics';
import MenuScene from '../Menu';

/***
 * 资源加载场景
 * @constructor
 */
const StartScene = () => {
  const StartX = 60;
  const StartY = SCREEN_HEIGHT / 2 - 50;
  const WIDTH = SCREEN_WIDTH - 120;
  const HEIGHT = 50;

  const scene = new Scene('StartScene', {
    size: {
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
    },
  });

  const outer = new GameObject('outer');
  const inner = new GameObject('inner');
  const outterGraphics = outer.addComponent(new Graphics());
  const innerGraphics = inner.addComponent(new Graphics());

  outterGraphics.graphics.beginFill(0xffffff, 1);
  outterGraphics.graphics.drawRect(StartX, StartY, WIDTH, HEIGHT);
  outterGraphics.graphics.endFill();

  scene.addChild(outer);
  scene.addChild(inner);

  // 加载进度更新
  resource.on(LOAD_EVENT.PROGRESS, e => {
    const percent = e.resourceLoadedCount / e.resourceTotal;
    innerGraphics.graphics.beginFill(0xfeca2f, 1);
    innerGraphics.graphics.drawRect(StartX, StartY, WIDTH * percent, HEIGHT);
    innerGraphics.graphics.endFill();
  });

  // 资源加载完成后，加载菜单场景
  resource.on(LOAD_EVENT.COMPLETE, () => {
    game.scene.destroy();
    game.loadScene({
      scene: MenuScene(),
    });
  });

  //加载资源
  resource.preload();

  return scene;
};

export default StartScene;
