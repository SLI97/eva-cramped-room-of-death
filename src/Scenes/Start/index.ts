import { game, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../index';
import { Scene, resource, LOAD_EVENT, GameObject } from '@eva/eva.js';
import { Graphics } from '@eva/plugin-renderer-graphics';
import MenuScene from '../Menu';

/***
 * 资源加载场景
 * @constructor
 */
const StartScene = () => {
  const scene = new Scene('menu');
  scene.transform.size.width = SCREEN_WIDTH;
  scene.transform.size.height = SCREEN_HEIGHT;

  const outer = new GameObject('outer');
  const inner = new GameObject('inner');
  const outterGraphics = outer.addComponent(new Graphics());
  const innerGraphics = inner.addComponent(new Graphics());

  outterGraphics.graphics.beginFill(0xffffff, 1);
  outterGraphics.graphics.drawRect(60, SCREEN_HEIGHT / 2 - 50, SCREEN_WIDTH - 120, 50);
  outterGraphics.graphics.endFill();

  scene.addChild(outer);
  scene.addChild(inner);

  // 加载进度更新
  resource.on(LOAD_EVENT.PROGRESS, e => {
    const percent = e.resourceLoadedCount / e.resourceTotal;
    innerGraphics.graphics.beginFill(0xfeca2f, 1);
    innerGraphics.graphics.drawRect(60, SCREEN_HEIGHT / 2 - 50, (SCREEN_WIDTH - 120) * percent, 50);
    innerGraphics.graphics.endFill();
  });

  // 加载完成后，加载菜单场景
  resource.on(LOAD_EVENT.COMPLETE, () => {
    game.loadScene({
      scene: MenuScene(),
    });
  });

  resource.preload();

  return scene;
};

export default StartScene;
