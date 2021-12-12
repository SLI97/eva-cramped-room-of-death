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
    // this.spriteAnimation.resource= null
    this.spriteAnimation.resource = this.animationName;
    this.spriteAnimation.play(this.times);
  }
}
