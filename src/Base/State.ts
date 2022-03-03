import { SpriteAnimation } from '@eva/plugin-renderer-sprite-animation';

export const ANIMATION_SPEED = 1000 / 8;

/***
 * 状态（每组动画的承载容器）
 */
export default class State {
  constructor(public spriteAnimation: SpriteAnimation, public animationName: string, public times?: number) {}

  run() {
    if (this.animationName === this.spriteAnimation.resource) {
      return;
    }
    this.spriteAnimation.resource = this.animationName;
    //更改了动画之后，必须下一帧再播放，不然会出现动画闪动
    // Promise.resolve().then(() => {
    //   this.spriteAnimation.play(this.times);
    // });

    setTimeout(() => {
      this.spriteAnimation.play(this.times);
    }, 50);
  }
}
