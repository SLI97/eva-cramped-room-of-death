import { Render } from '@eva/plugin-renderer-render';
import DataManager from './DataManager';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../index';
import Singleton from '../Base/Singleton';
import { GameObject } from '@eva/eva.js';
import { Graphics } from '@eva/plugin-renderer-graphics';

enum FadeStatus {
  IDLE,
  FADE_IN,
  FADE_OUT,
}

export const DEFAULT_FADE_DURATION = 200;

export default class FaderManager extends Singleton {
  static get Instance() {
    return super.GetInstance<FaderManager>();
  }

  oldFrame: number = 0;
  duration: number = DEFAULT_FADE_DURATION;
  fadeStatus: FadeStatus = FadeStatus.IDLE;
  fadeResolve: (value: PromiseLike<null>) => void;
  render: Render;

  createFader() {
    const go = new GameObject('fader');
    const graphics = go.addComponent(new Graphics());
    graphics.graphics.beginFill(0x000000, 1);
    graphics.graphics.drawRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    graphics.graphics.endFill();

    this.render = go.addComponent(
      new Render({
        zIndex: 5,
        alpha: 1,
      }),
    );

    return go;
  }

  update() {
    const curSecond = (DataManager.Instance.frame - this.oldFrame) / 60;
    const totalSecond = this.duration / 1000;
    const fadePercent = curSecond / totalSecond;
    switch (this.fadeStatus) {
      case FadeStatus.FADE_IN:
        if (fadePercent < 1) {
          this.render.alpha = fadePercent;
        } else {
          this.fadeStatus = FadeStatus.IDLE;
          this.render.alpha = 1;
          this.fadeResolve(null);
        }
        break;
      case FadeStatus.FADE_OUT:
        if (fadePercent < 1) {
          this.render.alpha = 1 - fadePercent;
        } else {
          this.fadeStatus = FadeStatus.IDLE;
          this.render.alpha = 0;
          this.fadeResolve(null);
        }
        break;
      default:
        break;
    }
  }

  fadeIn(duration: number = DEFAULT_FADE_DURATION) {
    this.render.alpha = 0;
    this.duration = duration;
    this.fadeStatus = FadeStatus.FADE_IN;
    this.oldFrame = DataManager.Instance.frame;
    return new Promise(resolve => {
      this.fadeResolve = resolve;
    });
  }

  fadeOut(duration: number = DEFAULT_FADE_DURATION) {
    this.render.alpha = 1;
    this.duration = duration;
    this.fadeStatus = FadeStatus.FADE_OUT;
    this.oldFrame = DataManager.Instance.frame;
    return new Promise(resolve => {
      this.fadeResolve = resolve;
    });
  }

  mask() {
    this.render.alpha = 1;
    return new Promise(resolve => {
      setTimeout(resolve, DEFAULT_FADE_DURATION);
    });
  }
}
