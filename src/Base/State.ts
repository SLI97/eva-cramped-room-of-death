import { GameObject } from '@eva/eva.js';
import { SpriteAnimation } from '@eva/plugin-renderer-sprite-animation';
/***
 * 状态（每组动画的承载容器）
 */
export default class State {
  spriteAnimation: SpriteAnimation;

  constructor(public go: GameObject, public animationName: string, public times?: number) {
    this.spriteAnimation = this.go.getComponent(SpriteAnimation);
  }

  play() {
    this.spriteAnimation.resource = this.animationName;
    //更改了动画之后，必须下一帧再播放，不然会出现动画闪动
    Promise.resolve().then(() => {
      this.spriteAnimation.play(this.times);
    });
  }

  stop() {
    this.spriteAnimation.resource = null;
    this.spriteAnimation.stop();
  }
}
