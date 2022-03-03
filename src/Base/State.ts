import { SpriteAnimation } from '@eva/plugin-renderer-sprite-animation';
// import { game } from '../index';

export const ANIMATION_SPEED = 1000 / 8;

/***
 * 状态（每组动画的承载容器，持有SpriteAnimation组件执行播放）
 */
export default class State {
  constructor(public spriteAnimation: SpriteAnimation, public animationName: string, public times?: number) {}

  run() {
    // 防止同动画重复执行（正在播放的动画不会有任何效果），
    // 例如骷髅的死亡动画已经结束，撤回的时候如果骷髅还是死亡状态，就会重复播放死亡动画
    if (this.spriteAnimation.resource === this.animationName) {
      return;
    }

    this.spriteAnimation.resource = this.animationName;
    /***
     * 由于eva采用依赖收集的方式改变属性，修改完组件的resource属性后，并不会立刻产生作用。
     * 此时调用play的会，会触发源码的goToAndStop(0)，导致动画闪动
     * 处理方法:延迟执行
     * 1.通过requestAnimationFrame延迟到下一个渲染帧执行
     * 2.game.ticker.frameRate获取帧数配合setTimeout
     */
    // setTimeout(() => {
    //   this.spriteAnimation.play(this.times);
    // }, (1000 / game.ticker.frameRate) ); //

    requestAnimationFrame(() => {
      this.spriteAnimation.play(this.times);
    });
  }
}
