import { GameObject, Scene } from '@eva/eva.js';
import { Graphics } from '@eva/plugin-renderer-graphics';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../../../index';
import { Render } from '@eva/plugin-renderer-render';
import EventManager from '../../../../Runtime/EventManager';
import { EVENT_ENUM } from '../../../../Enum';

const Mask = (scene: Scene) => {
  const mask = new GameObject('backgroundColor');

  const outterGraphics = mask.addComponent(new Graphics());
  mask.addComponent(
    new Render({
      zIndex: 8,
    }),
  );

  outterGraphics.graphics.beginFill(0x000000, 1);
  outterGraphics.graphics.drawRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
  outterGraphics.graphics.endFill();
  scene.addChild(mask);
  const handleLoad = () => {
    EventManager.Instance.off(EVENT_ENUM.BATTLE_LOADED, handleLoad);
    scene.removeChild(mask);
  };
  EventManager.Instance.on(EVENT_ENUM.BATTLE_LOADED, handleLoad, this);

  return mask;
};

export default Mask;
